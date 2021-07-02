import { findAStarPath, manhattanDist } from "../../utils/aStar";
import {
  FlatGridVector,
  flattenVector,
  shiftFlat,
} from "../../utils/flatGridVector";
import { getSlotGridPos } from "../../utils/utils";
import { GeneratedRoom } from "./generatedRoom";

type FlatDoorPair = string;
function flattenDoorPair(doorPair: {
  start: DoorSlot;
  end: DoorSlot;
}): FlatDoorPair {
  return `${doorPair.start}->${doorPair.end}`;
}

export class AccessValidator {
  private readonly room: GeneratedRoom;
  currentPaths = new Map<FlatDoorPair, FlatGridVector[]>();
  newPaths: Map<FlatDoorPair, FlatGridVector[]> | undefined;
  constructor(room: GeneratedRoom) {
    this.room = room;
  }

  private static getPermutations(
    doors: DoorSlot[],
  ): Array<{ start: DoorSlot; end: DoorSlot }> {
    const out: Array<{ start: DoorSlot; end: DoorSlot }> = [];

    let origin = 0;
    while (origin + 1 < doors.length) {
      for (let goal = origin + 1; goal < doors.length; goal++) {
        out.push({ start: doors[origin], end: doors[goal] });
      }
      origin++;
    }

    return out;
  }

  isAccessible(): boolean {
    this.newPaths = new Map<FlatDoorPair, FlatGridVector[]>();
    for (const pathEntry of this.currentPaths.entries()) {
      this.newPaths.set(pathEntry[0], pathEntry[1]);
    }

    // Test each path
    for (const doorPair of AccessValidator.getPermutations(
      this.room.doorSlots,
    )) {
      const flatDoorPair = flattenDoorPair(doorPair);

      if (this.newPaths.has(flatDoorPair)) {
        // Isaac.DebugString(`Preexisting path found for [${flatDoorPair}].`);
        let clear = true;
        for (const pathPos of this.newPaths.get(flatDoorPair)!) {
          if (!this.room.isPosPassable(pathPos, false, true)) {
            // Isaac.DebugString("Path invalid.");
            this.newPaths.delete(flatDoorPair);
            clear = false;
            break;
          }
        }
        if (clear) {
          // Isaac.DebugString("Path valid.");
          continue;
        }
      }

      const pathingResult = findAStarPath(
        getSlotGridPos(doorPair.start, this.room.shape),
        getSlotGridPos(doorPair.end, this.room.shape),
        manhattanDist,
        this.getNeighbors.bind(this),
        1,
      );
      if (pathingResult === false) {
        return false;
      }
      const flatResult: FlatGridVector[] = [];
      for (let r = 0; r < pathingResult.length; r++) {
        flatResult.push(flattenVector(pathingResult[r]));
      }
      this.newPaths.set(flatDoorPair, flatResult);
    }

    return true;
  }

  finalize(): void {
    if (this.newPaths) {
      this.currentPaths = this.newPaths;
      this.newPaths = undefined;
    }
  }

  getNeighbors(
    current: FlatGridVector,
    goal: FlatGridVector,
    _path: Vector[],
  ): FlatGridVector[] {
    const possibleNeighbors = [
      shiftFlat(current, 1, 0),
      shiftFlat(current, 0, 1),
      shiftFlat(current, -1, 0),
      shiftFlat(current, 0, -1),
    ];

    const neighbors: FlatGridVector[] = [];
    for (const possibleNeighbor of possibleNeighbors) {
      if (
        possibleNeighbor === goal ||
        this.room.isPosPassable(possibleNeighbor, false, true)
      ) {
        neighbors.push(possibleNeighbor);
      }
    }

    // Debug Logging
    /*
    const pathSet = new Set<FlatGridVector>();
    for (const pathPos of path) {
      pathSet.add(flattenVector(pathPos));
    }
    const neighborSet = new Set<FlatGridVector>();
    for (const neighbor of neighbors) {
      neighborSet.add(neighbor);
    }
    for (let y = -1; y < 15; y++) {
      let line = "";
      let nonEmpty = false;

      for (let x = -1; x < 27; x++) {
        const drawPos = flattenVector(Vector(x, y));
        if (drawPos === current) {
          line += "X";
          nonEmpty = true;
        } else if (drawPos === goal) {
          line += "G";
          nonEmpty = true;
        } else if (neighborSet.has(drawPos) && !pathSet.has(drawPos)) {
          line += "N";
          nonEmpty = true;
        } else if (
          this.room.doorEntities.has(drawPos) &&
          this.room.doorEntities.get(drawPos)!.EXISTS
        ) {
          line += "H";
          nonEmpty = true;
        } else if (!isValidGridPos(Vector(x, y), this.room.shape)) {
          line += "+";
          nonEmpty = true;
        } else if (!this.room.isPosPassable(drawPos)) {
          line += "#";
          nonEmpty = true;
        } else if (pathSet.has(drawPos)) {
          line += "@";
          nonEmpty = true;
        } else {
          line += " ";
        }
      }
      if (nonEmpty) {
        Isaac.DebugString(line.trimEnd());
      } else {
        break;
      }
    }
    */

    return neighbors;
  }
}
