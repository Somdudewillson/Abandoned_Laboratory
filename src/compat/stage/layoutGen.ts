import { randomInt } from "../../extMath";
import {
  initCustomRoom,
  makeLuaDoor,
  makeLuaEntity,
  mirrorLuaEntity,
} from "../../types/StageAPI_helpers";
import { getSlotGridPos, getValidSlots, SymmetryType } from "../../utils/utils";

export function generateRoom(
  rand: RNG,
  shape: RoomShape,
  doors: DoorSlot[],
): CustomRoomConfig {
  switch (shape) {
    default:
    case RoomShape.ROOMSHAPE_1x1:
      return genSmallRoom(rand, doors);
  }
}

/** Generates a 1x1 room
 * @param doors all *present* doors. **MUST** be valid `DoorSlot`s for a 1x1 room, and **MUST** be in order.
 */
function genSmallRoom(rand: RNG, doors: DoorSlot[]): CustomRoomConfig {
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
  for (const doorSlot of getValidSlots(RoomShape.ROOMSHAPE_1x1)) {
    const present = i < doors.length && doors[i] === doorSlot;
    if (present) {
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
  const rocksAmt = randomInt(rand, 1, 6);
  Isaac.DebugString(`Placing ${rocksAmt} rocks.`);
  for (let c = 0; c < rocksAmt; c++) {
    let newRockPos = Vector(randomInt(rand, 0, 6), randomInt(rand, 0, 3));
    if (
      (newRockPos.X === 0 && newRockPos.Y === 3) ||
      (newRockPos.X === 6 && newRockPos.Y === 0)
    ) {
      newRockPos = Vector(randomInt(rand, 1, 6), randomInt(rand, 1, 3));
    }
    Isaac.DebugString(`Placing quad mirrored rock at [${newRockPos}]`);

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
