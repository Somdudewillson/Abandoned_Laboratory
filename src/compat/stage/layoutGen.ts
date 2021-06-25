// import { genRandObstacles } from "./randLayoutGen";

import { BasicMarkovModel } from "./ml/basicMarkovModel";
import { genMarkovObstacles } from "./ml/markovGen";

export function generateRoom(
  rand: RNG,
  shape: RoomShape,
  doors: DoorSlot[],
): CustomRoomConfig {
  switch (shape) {
    default:
      return genMarkovObstacles(rand, shape, doors, BasicMarkovModel);
    // return genRandObstacles(rand, shape, doors);
  }
}
