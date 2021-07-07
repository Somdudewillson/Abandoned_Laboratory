import { isGridPassable } from "../../types/StageAPI_helpers";
import { randomInt, shuffleArray } from "../../utils/extMath";
import {
  getSlotGridPos,
  isValidGridPos,
  SymmetryType,
} from "../../utils/utils";
import { AccessValidator } from "./accessValidator";
import { GeneratedRoom } from "./generatedRoom";

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

const PIT_RATIO = 0.0;
const DESTRUCTIBLE_RATIO = 0.1;
// const REMOVE_RATIO = 0.25;

const DestructibleTable = [
  LayoutGridType.POOP,
  LayoutGridType.POOP,
  LayoutGridType.POOP,
  LayoutGridType.COBWEB,
  LayoutGridType.COBWEB,
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

/** Generates a bunch of obstacles in a room
 * @param doors all *present* doors. **MUST** be valid `DoorSlot`s and **MUST** be in order.
 */
export function genRandObstacles(
  rand: RNG,
  shape: RoomShape,
  doors: DoorSlot[],
): CustomRoomConfig {
  const newRoom = new GeneratedRoom(shape, doors);
  const roomValidator = new AccessValidator(newRoom);
  const symmetry = SymmetryTable[rand.RandomInt(SymmetryTable.length)];

  // Add some random obstacles
  const spots = getValidSpots(shape, newRoom.doorSlots, symmetry);
  const obstacleAmt = randomInt(
    rand,
    Math.ceil(spots.length * 0.05),
    Math.round(spots.length * 0.5),
  );
  // Isaac.DebugString(`Attempting to place ${rocksAmt} rocks.`);
  shuffleArray(spots, rand);
  for (let count = 0; count < obstacleAmt; count++) {
    const toPlace = {
      type: LayoutGridType.ROCK,
      variant: 0,
      subtype: LayoutRockSubtype.NORMAL,
    };
    if (rand.RandomFloat() < DESTRUCTIBLE_RATIO) {
      toPlace.type =
        DestructibleTable[rand.RandomInt(DestructibleTable.length)];
    } else if (rand.RandomFloat() < PIT_RATIO) {
      toPlace.type = LayoutGridType.PIT;
    }

    if (spots.length === 0) {
      // Isaac.DebugString("Out of places to put rocks!");
      break;
    }
    const newRockPos = spots.pop()!;

    // Isaac.DebugString(`Attempting to place rock at [${newRockPos}].`);
    const isNewGridPassable = isGridPassable(toPlace.type);
    newRoom.createMirroredEntity(
      newRockPos,
      symmetry,
      toPlace.type,
      toPlace.variant,
      toPlace.subtype,
      1,
      isNewGridPassable,
      true,
    );

    if (!isNewGridPassable) {
      if (roomValidator.isAccessible()) {
        newRoom.finalizeBuffer();
        roomValidator.finalize();
      } else {
        newRoom.wipeBuffer();
      }
    }
  }

  return newRoom.convertToRoomLayout();
}
