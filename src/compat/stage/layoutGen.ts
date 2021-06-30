// import { genRandObstacles } from "./randLayoutGen";

import { SymmetryType } from "../../utils/utils";
import { genMarkovObstacles } from "./ml/markovGen";
import { ChebyschevMarkovModel } from "./ml/models/chebyschevMarkovModel";

const StaticChebyschevMarkovModel = ChebyschevMarkovModel;

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
        StaticChebyschevMarkovModel,
        SymmetryType.NONE,
      );
    // return genRandObstacles(rand, shape, doors);
  }
}
