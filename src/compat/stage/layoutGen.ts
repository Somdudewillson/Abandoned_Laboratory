// import { genRandObstacles } from "./randLayoutGen";

import * as FlexMarkovModel from "models/FlexMarkovModel";
import * as SeedModel from "models/SeedModel";
import { SymmetryType } from "../../utils/utils";
import { genMarkovObstacles } from "./ml/markovGen";
import { MarkovWrapper } from "./ml/markovInterface";
import { seedObstacles } from "./ml/seedGen";
import { SeedWrapper } from "./ml/seedInterface";
import { genPickups } from "./spawnPickups";

const StaticFlexMarkovModel = FlexMarkovModel as MarkovWrapper;
const StaticSeedModel = SeedModel as SeedWrapper;

export function generateRoom(
  rand: RNG,
  shape: RoomShape,
  doors: DoorSlot[],
): CustomRoomConfig {
  switch (shape) {
    default: {
      let startTime = Isaac.GetTime();

      const newRoom = seedObstacles(
        rand,
        shape,
        doors,
        StaticSeedModel,
        SymmetryType.NONE,
      );
      Isaac.DebugString(
        `\t>>Initial seeding of room ${newRoom.id} (shape ${shape}) in ${
          (Isaac.GetTime() - startTime) / 1000
        } s.`,
      );

      for (let loops = 0; loops < 3; loops++) {
        if (newRoom.getFillPercentage() >= 0.45) {
          break;
        }

        startTime = Isaac.GetTime();
        genMarkovObstacles(
          rand,
          shape,
          doors,
          StaticFlexMarkovModel,
          undefined,
          newRoom,
        );
        Isaac.DebugString(
          `\tFill loop #${loops + 1} of room ${newRoom.id} in ${
            (Isaac.GetTime() - startTime) / 1000
          } s.`,
        );
      }
      Isaac.DebugString(`\tFill loops complete for room ${newRoom.id}.`);

      startTime = Isaac.GetTime();
      genPickups(rand, newRoom);
      Isaac.DebugString(
        `\tPickups spawned for room ${newRoom.id} in ${
          (Isaac.GetTime() - startTime) / 1000
        } s.`,
      );
      /*
      if (shape === RoomShape.ROOMSHAPE_1x1) {
        Isaac.DebugString(`Accessibility of room [${newRoom.id}]`);
        newRoom.printAccessibility();
      }
      */
      return newRoom.convertToRoomLayout();
    }
    // return genRandObstacles(rand, shape, doors);
  }
}
