import { isGridPassable } from "../../../types/StageAPI_helpers";
import { FlatGridVector, flattenVector } from "../../../utils/flatGridVector";
import {
  getDoorEntryPos,
  getSlotGridPos,
  isValidGridPos,
  SymmetryType,
} from "../../../utils/utils";
import { AccessValidator } from "../accessValidator";
import { GeneratedRoom } from "../generatedRoom";
import { getFromModel, ModelWrapper } from "./modelInterface";
import {
  decayTokens,
  detokenize,
  EntityToken,
  hashContext,
  tokenize,
} from "./tokenizer";

const SymmetryTable = [
  SymmetryType.HORIZONTAL,
  SymmetryType.HORIZONTAL,
  SymmetryType.HORIZONTAL,
  SymmetryType.VERTICAL,
  SymmetryType.VERTICAL,
  SymmetryType.VERTICAL,
  SymmetryType.QUAD,
  SymmetryType.QUAD,
  SymmetryType.QUAD,
  SymmetryType.QUAD,
];

const NON_AIR_BIAS = 3; // Was using 7.5

function getValidSpots(
  shape: RoomShape,
  doors: DoorSlot[],
  symmetry: SymmetryType,
  room: GeneratedRoom,
): Vector[] {
  const options: Vector[] = [];

  let xMax = -1;
  let yMax = -1;

  for (let x = 0; x <= 25; x++) {
    for (let y = 0; y <= 13; y++) {
      const option = Vector(x, y);

      if (isValidGridPos(option, shape)) {
        xMax = Math.max(xMax, option.X);
        yMax = Math.max(yMax, option.Y);

        const flatOption = flattenVector(option);
        if (!room.isPosEmpty(flattenVector(option))) {
          continue;
        }

        let valid = true;
        for (const door of doors) {
          if (flatOption === flattenVector(getDoorEntryPos(door, shape))) {
            valid = false;
            break;
          }
        }

        if (valid) {
          options.push(option);
        }
      }
    }
  }

  let optionsMirrored: Vector[] = options;
  if (symmetry !== SymmetryType.NONE) {
    optionsMirrored = [];

    for (const posOption of options) {
      switch (symmetry) {
        default:
        case SymmetryType.HORIZONTAL:
          switch (shape) {
            default:
              if (posOption.Y <= yMax / 2) {
                optionsMirrored.push(posOption);
              }
              break;
            case RoomShape.ROOMSHAPE_LTL:
            case RoomShape.ROOMSHAPE_LTR:
              if (posOption.Y >= yMax / 2) {
                optionsMirrored.push(posOption);
              }
              break;
          }
          break;
        case SymmetryType.VERTICAL:
          switch (shape) {
            default:
              if (posOption.X <= xMax / 2) {
                optionsMirrored.push(posOption);
              }
              break;
            case RoomShape.ROOMSHAPE_LTL:
            case RoomShape.ROOMSHAPE_LBL:
              if (posOption.X >= xMax / 2) {
                optionsMirrored.push(posOption);
              }
              break;
          }
          break;
        case SymmetryType.QUAD:
          switch (shape) {
            default:
              if (posOption.Y <= yMax / 2 && posOption.X <= xMax / 2) {
                optionsMirrored.push(posOption);
              }
              break;
            case RoomShape.ROOMSHAPE_LTL:
              if (posOption.Y >= yMax / 2 && posOption.X >= xMax / 2) {
                optionsMirrored.push(posOption);
              }
              break;
          }
          break;
      }
    }
  }

  return optionsMirrored;
}

function pickWeighted(
  rand: RNG,
  options: Array<{ token: EntityToken; weight: float }> | null,
): EntityToken {
  if (options == null || options.length === 0) {
    return EntityToken.AIR;
  }

  let sum = 0;
  for (const option of options) {
    let weightMult = 1;
    if (option.token !== EntityToken.AIR) {
      weightMult *= NON_AIR_BIAS;
    }

    sum += option.weight * weightMult;
  }

  let cumulative = 0;
  const random = rand.RandomFloat() * sum;
  for (const option of options) {
    let weightMult = 1;
    if (option.token !== EntityToken.AIR) {
      weightMult *= NON_AIR_BIAS;
    }

    const adjustedWeight = option.weight * weightMult;
    if (random <= cumulative + adjustedWeight) {
      return option.token;
    }

    cumulative += adjustedWeight;
  }

  return EntityToken.AIR;
}

function fetchToken(
  pos: Vector,
  shape: RoomShape,
  doors: DoorSlot[],
  entities: Map<FlatGridVector, LuaRoomEntity>,
): EntityToken {
  for (const doorSlot of doors) {
    if (pos.DistanceSquared(getSlotGridPos(doorSlot, shape)) < 1) {
      return EntityToken.DOOR;
    }
  }

  if (!isValidGridPos(pos, shape)) {
    return EntityToken.WALL;
  }

  const flatPos = flattenVector(pos);
  if (entities.has(flatPos)) {
    const entity = entities.get(flatPos)!;
    return tokenize({
      Type: entity[1].TYPE,
      Variant: entity[1].VARIANT,
      Subtype: entity[1].SUBTYPE,
    });
  }

  return EntityToken.AIR;
}

function fetchFromModel(
  model: ModelWrapper,
  ...tokens: EntityToken[]
): Array<{ token: EntityToken; weight: float }> | null {
  let result = getFromModel(model, hashContext(...tokens));

  // If there is no entry in the given model
  if (result == null) {
    let nextSets: EntityToken[][] = [];
    let currentSets: EntityToken[][] = [];

    const initialDecay = decayTokens(tokens);
    if (initialDecay != null) {
      currentSets = initialDecay;
    }
    while (currentSets.length > 0 && result == null) {
      for (const decaySet of currentSets) {
        result = getFromModel(model, hashContext(...decaySet));

        const newDecay = decayTokens(decaySet);
        if (newDecay != null) {
          for (const nextDecay of newDecay) {
            nextSets.push(nextDecay);
          }
        }
      }

      currentSets = nextSets;
      nextSets = [];
    }
  }

  return result;
}

/** Generates grid entities in a room according to a Markov chain model
 * @param doors all *present* doors. **MUST** be valid `DoorSlot`s and **MUST** be in order.
 */
export function genMarkovObstacles(
  rand: RNG,
  shape: RoomShape,
  doors: DoorSlot[],
  model: ModelWrapper,
  symmetry: SymmetryType = SymmetryTable[rand.RandomInt(SymmetryTable.length)],
  newRoom = new GeneratedRoom(shape, doors),
): GeneratedRoom {
  const roomValidator = new AccessValidator(newRoom);

  // Generate grid entities
  for (const spot of getValidSpots(shape, doors, symmetry, newRoom)) {
    const context: EntityToken[] = [];
    for (const contextPos of model.Context) {
      context.push(
        fetchToken(
          Vector(spot.X + contextPos.x, spot.Y + contextPos.y),
          shape,
          doors,
          newRoom.gridEntities,
        ),
      );
    }

    const newGridData = detokenize(
      pickWeighted(rand, fetchFromModel(model, ...context)),
    );
    if (newGridData != null) {
      const isPassable = isGridPassable(newGridData.Type);

      newRoom.createMirroredEntity(
        spot,
        symmetry,
        newGridData.Type,
        newGridData.Variant,
        newGridData.Subtype,
        1,
        isPassable,
        true,
      );

      if (!isPassable) {
        if (roomValidator.isAccessible()) {
          newRoom.finalizeBuffer();
          roomValidator.finalize();
        } else {
          newRoom.wipeBuffer();
        }
      }
    }
  }

  return newRoom;
}
