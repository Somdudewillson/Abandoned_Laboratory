import {
  initCustomRoom,
  makeLuaDoor,
  makeLuaEntity,
  mirrorLuaEntity,
} from "../../types/StageAPI_helpers";
import { randomInt, shuffleArray } from "../../utils/extMath";
import {
  getMirroredPos,
  getRoomShapeSize,
  getSlotGridPos,
  getValidSlots,
  isValidGridPos,
  SymmetryType,
} from "../../utils/utils";
import { AccessValidator } from "./accessValidator";

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

/** Generates a bunch of obstacles in a room
 * @param doors all *present* doors. **MUST** be valid `DoorSlot`s and **MUST** be in order.
 */
export function genRandObstacles(
  rand: RNG,
  shape: RoomShape,
  doors: DoorSlot[],
): CustomRoomConfig {
  const roomValidator = new AccessValidator(shape);
  const roomSize = getRoomShapeSize(shape);
  const symmetry = SymmetryTable[rand.RandomInt(SymmetryTable.length)];
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

  // Add some random rocks
  const spots = getValidSpots(shape, presentDoors, symmetry);
  const rocksAmt = randomInt(
    rand,
    Math.ceil(spots.length * 0.05),
    Math.round(spots.length * 0.75),
  );
  // Isaac.DebugString(`Attempting to place ${rocksAmt} rocks.`);
  shuffleArray(spots, rand);
  for (let count = 0; count < rocksAmt; count++) {
    if (spots.length === 0) {
      // Isaac.DebugString("Out of places to put rocks!");
      break;
    }
    const newRockPos = spots.pop()!;
    // Isaac.DebugString(`Attempting to place rock at [${newRockPos}].`);
    if (
      !roomValidator.isAccessible(
        newRoom,
        getMirroredPos(shape, symmetry, newRockPos, true),
      )
    ) {
      // Isaac.DebugString("Attempt failed - would block path.");
      count--;
      continue;
    }

    index = mirrorLuaEntity(
      newRoom,
      index,
      shape,
      symmetry,
      makeLuaEntity(
        newRockPos,
        LayoutGridType.ROCK,
        0,
        LayoutRockSubtype.NORMAL,
      ),
    );
  }

  return newRoom;
}
