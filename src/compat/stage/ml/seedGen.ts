import { isGridPassable } from "../../../types/StageAPI_helpers";
import { flattenVector } from "../../../utils/flatGridVector";
import {
  getDoorEntryPos,
  isValidGridPos,
  SymmetryType,
} from "../../../utils/utils";
import { AccessValidator } from "../accessValidator";
import { GeneratedRoom } from "../generatedRoom";
import { getFromModel, SeedWrapper } from "./seedInterface";
import { detokenize, EntityToken } from "./tokenizer";

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

const NON_AIR_BIAS = 0.8;

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
  options: Array<{ token: EntityToken; weight: float }> | undefined,
): EntityToken {
  if (options === undefined || options.length === 0) {
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

/** Generates grid entities in a room according to a Seed-type Markov chain model
 * @param doors all *present* doors. **MUST** be valid `DoorSlot`s and **MUST** be in order.
 */
export function seedObstacles(
  rand: RNG,
  shape: RoomShape,
  doors: DoorSlot[],
  model: SeedWrapper,
  symmetry: SymmetryType = SymmetryTable[rand.RandomInt(SymmetryTable.length)],
  newRoom = new GeneratedRoom(shape, doors),
): GeneratedRoom {
  const roomValidator = new AccessValidator(newRoom);
  let fetchTime = 0;
  let validateTime = 0;

  // Fetching open spots
  let startTime = Isaac.GetTime();
  Isaac.DebugString("\t\tFetching valid spots to fill.");
  const openSpots = getValidSpots(shape, doors, symmetry, newRoom);
  Isaac.DebugString(
    `\t\t${openSpots.length} spots fetched in ${math.floor(
      Isaac.GetTime() - startTime,
    )} ms`,
  );

  // Generate grid entities
  for (const spot of openSpots) {
    startTime = Isaac.GetTime();
    const newGridData = detokenize(
      pickWeighted(
        rand,
        getFromModel(model, newRoom.shape, flattenVector(spot)),
      ),
    );
    fetchTime += Isaac.GetTime() - startTime;

    startTime = Isaac.GetTime();
    if (newGridData !== undefined) {
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
    validateTime += Isaac.GetTime() - startTime;
  }
  Isaac.DebugString(
    `\t\tModel eval took ${math.floor(
      fetchTime,
    )} ms; Validation took ${math.floor(validateTime)} ms.`,
  );

  return newRoom;
}
