// import { genRandObstacles } from "./randLayoutGen";

import { SymmetryType } from "../../utils/utils";
import { genMarkovObstacles } from "./ml/markovGen";
import { TrailingFourMarkovModel } from "./ml/models/trailingFourMarkovModel";

export function generateRoom(
  rand: RNG,
  shape: RoomShape,
  doors: DoorSlot[],
): CustomRoomConfig {
  switch (shape) {
    default:
      return genMarkovObstacles(
        rand,
        shape,
        doors,
        TrailingFourMarkovModel,
        SymmetryType.NONE,
      );
    // return genRandObstacles(rand, shape, doors);
  }
}
