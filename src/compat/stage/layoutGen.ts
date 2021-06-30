// import { genRandObstacles } from "./randLayoutGen";

import { genMarkovObstacles } from "./ml/markovGen";
import { CardinalMarkovModel } from "./ml/models/cardinalMarkovModel";

export function generateRoom(
  rand: RNG,
  shape: RoomShape,
  doors: DoorSlot[],
): CustomRoomConfig {
  switch (shape) {
    default:
      return genMarkovObstacles(rand, shape, doors, CardinalMarkovModel);
    // return genRandObstacles(rand, shape, doors);
  }
}
