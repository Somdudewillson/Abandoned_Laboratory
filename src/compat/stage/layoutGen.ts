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
    default: {
      const newRoom = genMarkovObstacles(
        rand,
        shape,
        doors,
        StaticChebyschevMarkovModel,
        SymmetryType.NONE,
      );

      for (let loops = 0; loops < 3; loops++) {
        if (newRoom.getFillPercentage() >= 0.45) {
          break;
        }

        genMarkovObstacles(
          rand,
          shape,
          doors,
          StaticChebyschevMarkovModel,
          SymmetryType.NONE,
          newRoom,
        );
      }

      return newRoom.convertToRoomLayout();
    }
    // return genRandObstacles(rand, shape, doors);
  }
}
