import { genRandObstacles } from "./randLayoutGen";

export function generateRoom(
  rand: RNG,
  shape: RoomShape,
  doors: DoorSlot[],
): CustomRoomConfig {
  switch (shape) {
    default:
      return genRandObstacles(rand, shape, doors);
  }
}
