import { randomInt, shuffleArray } from "../../extMath";
import {
  initCustomRoom,
  makeLuaDoor,
  makeLuaEntity,
  mirrorLuaEntity,
} from "../../types/StageAPI_helpers";
import {
  getMirroredPos,
  getSlotGridPos,
  getValidSlots,
  isValidGridPos,
  SymmetryType,
} from "../../utils/utils";
import { AccessValidator } from "./accessValidator";

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
          if (posOption.Y <= yMax / 2) {
            optionsMirrored.push(posOption);
          }
          break;
        case SymmetryType.VERTICAL:
          if (posOption.X <= xMax / 2) {
            optionsMirrored.push(posOption);
          }
          break;
        case SymmetryType.QUAD:
          if (posOption.Y <= yMax / 2 && posOption.X <= xMax / 2) {
            optionsMirrored.push(posOption);
          }
          break;
      }
    }
  }

  return optionsMirrored;
}

/** Generates a 1x1 room
 * @param doors all *present* doors. **MUST** be valid `DoorSlot`s for a 1x1 room, and **MUST** be in order.
 */
export function genSmallRoom(rand: RNG, doors: DoorSlot[]): CustomRoomConfig {
  const roomValidator = new AccessValidator(RoomShape.ROOMSHAPE_1x1);
  const newRoom = initCustomRoom(
    RoomType.ROOM_DEFAULT,
    0,
    0,
    `Generated Room-${rand.Next()}`,
    1,
    1,
    13,
    7,
    RoomShape.ROOMSHAPE_1x1,
  );

  let index = 1;
  // Add Doors
  let i = 0;
  const presentDoors: DoorSlot[] = [];
  for (const doorSlot of getValidSlots(RoomShape.ROOMSHAPE_1x1)) {
    const present = i < doors.length && doors[i] === doorSlot;
    if (present) {
      presentDoors.push(doorSlot);
      i++;
    }

    newRoom.set(
      index++,
      makeLuaDoor(
        getSlotGridPos(doorSlot, RoomShape.ROOMSHAPE_1x1),
        doorSlot,
        present,
      ),
    );
  }

  // Add some random rocks
  const spots = getValidSpots(
    RoomShape.ROOMSHAPE_1x1,
    presentDoors,
    SymmetryType.QUAD,
  );
  const rocksAmt = randomInt(rand, 1, Math.round(spots.length * 0.75));
  Isaac.DebugString(`Attempting to place ${rocksAmt} rocks.`);
  shuffleArray(spots, rand);
  for (let count = 0; count < rocksAmt; count++) {
    if (spots.length === 0) {
      Isaac.DebugString("Out of places to put rocks!");
      break;
    }
    const newRockPos = spots.pop()!;
    Isaac.DebugString(
      `Attempting to place quad mirrored rock at [${newRockPos}].`,
    );
    if (
      !roomValidator.isAccessible(
        newRoom,
        getMirroredPos(
          RoomShape.ROOMSHAPE_1x1,
          SymmetryType.QUAD,
          newRockPos,
          true,
        ),
      )
    ) {
      Isaac.DebugString("Attempt failed - would block path.");
      count--;
      continue;
    }

    index = mirrorLuaEntity(
      newRoom,
      index,
      RoomShape.ROOMSHAPE_1x1,
      SymmetryType.QUAD,
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
