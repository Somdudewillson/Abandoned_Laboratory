import { genSmallRoom } from "./randLayoutGen";

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
