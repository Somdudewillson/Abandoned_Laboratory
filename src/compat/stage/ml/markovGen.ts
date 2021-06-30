import {
  initCustomRoom,
  isGridPassable,
  makeLuaDoor,
  makeLuaEntity,
} from "../../../types/StageAPI_helpers";
import { flattenVector, FlatVector } from "../../../utils/aStar";
import {
  getMirroredPos,
  getRoomShapeSize,
  getSlotGridPos,
  getValidSlots,
  isValidGridPos,
  SymmetryType,
} from "../../../utils/utils";
import { AccessValidator } from "../accessValidator";
import { getFromModel, ModelWrapper } from "./modelInterface";
import { decayTokens, detokenize, EntityToken, hashContext } from "./tokenizer";

// const SymmetryTable = [SymmetryType.NONE];
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

function getValidSpots(
  shape: RoomShape,
  doors: DoorSlot[],
  symmetry: SymmetryType,
): Vector[] {
  const options: Vector[] = [];

  let xMax = -1;
  let yMax = -1;

  for (let x = 0; x <= 25; x++) {
    for (let y = 0; y <= 13; y++) {
      const option = Vector(x, y);
      if (isValidGridPos(option, shape)) {
        let valid = true;
        for (const door of doors) {
          if (option.DistanceSquared(getSlotGridPos(door, shape)) <= 1.1) {
            valid = false;
            break;
          }
        }

        if (valid) {
          xMax = Math.max(xMax, option.X);
          yMax = Math.max(yMax, option.Y);
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
    sum += option.weight;
  }

  let cumulative = 0;
  const random = rand.RandomFloat() * sum;
  for (const option of options) {
    if (random <= cumulative + option.weight) {
      return option.token;
    }

    cumulative += option.weight;
  }

  return EntityToken.AIR;
}

function fetchToken(
  pos: Vector,
  shape: RoomShape,
  doors: DoorSlot[],
  entities: Map<FlatVector, EntityToken>,
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
    return entities.get(flatPos)!;
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
): CustomRoomConfig {
  const roomValidator = new AccessValidator(shape);
  const roomSize = getRoomShapeSize(shape);
  const newRoom = initCustomRoom(
    RoomType.ROOM_DEFAULT,
    0,
    0,
    `Generated Room-${rand.Next()}`,
    1,
    1,
    roomSize.X,
    roomSize.Y,
    shape,
  );

  let index = 1;
  // Add Doors
  let i = 0;
  const presentDoors: DoorSlot[] = [];
  for (const doorSlot of getValidSlots(shape)) {
    const present = i < doors.length && doors[i] === doorSlot;
    if (present) {
      presentDoors.push(doorSlot);
      i++;
    }

    newRoom.set(
      index++,
      makeLuaDoor(getSlotGridPos(doorSlot, shape), doorSlot, present),
    );
  }

  // Generate grid entities
  const existingEntities = new Map<FlatVector, EntityToken>();
  for (const spot of getValidSpots(shape, doors, symmetry)) {
    const context: EntityToken[] = [];
    for (const contextPos of model.Context) {
      context.push(
        fetchToken(
          Vector(spot.X + contextPos.x, spot.Y + contextPos.y),
          shape,
          doors,
          existingEntities,
        ),
      );
    }

    const newToken = pickWeighted(rand, fetchFromModel(model, ...context));
    const newGrid = detokenize(newToken);
    const mirroredNewPos = getMirroredPos(shape, symmetry, spot, true);
    if (
      newGrid != null &&
      (isGridPassable(newGrid.Type) ||
        roomValidator.isAccessible(newRoom, mirroredNewPos))
    ) {
      for (const mirrorSpot of mirroredNewPos) {
        newRoom.set(
          index++,
          makeLuaEntity(
            mirrorSpot,
            newGrid.Type,
            newGrid.Variant,
            newGrid.Subtype,
          ),
        );
        existingEntities.set(flattenVector(mirrorSpot), newToken);
      }
    }
  }

  return newRoom;
}
