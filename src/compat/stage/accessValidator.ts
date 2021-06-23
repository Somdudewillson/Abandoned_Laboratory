import {
  expandVector,
  findAStarPath,
  flattenVector,
  FlatVector,
  manhattanDist,
} from "../../utils/aStar";
import { getSlotGridPos, isValidGridPos } from "../../utils/utils";

type FlatDoorPair = string;
function flattenDoorPair(doorPair: {
  start: DoorSlot;
  end: DoorSlot;
}): FlatDoorPair {
  return `${doorPair.start}->${doorPair.end}`;
}

export class AccessValidator {
  private shape: RoomShape;
  currentPaths = new Map<FlatDoorPair, FlatVector[]>();
  private doors: DoorSlot[] = [];
  private blockingEntities = new Set<FlatVector>();
  private walls: Set<FlatVector>;
  constructor(shape: RoomShape) {
    this.shape = shape;
    this.walls = new Set<FlatVector>();

    switch (shape) {
      default:
      case RoomShape.ROOMSHAPE_1x1:
        AccessValidator.addWallBox(this.walls, Vector(-1, -1), 15, 9);
        break;
    }
  }

  private static addWallBox(
    wallSet: Set<FlatVector>,
    start: Vector,
    width: int,
    height: int,
  ): void {
    AccessValidator.addWallLine(wallSet, start, true, width);
    AccessValidator.addWallLine(
      wallSet,
      Vector(start.X, start.Y + height - 1),
      true,
      width,
    );

    AccessValidator.addWallLine(
      wallSet,
      Vector(start.X, start.Y + 1),
      false,
      height - 2,
    );
    AccessValidator.addWallLine(
      wallSet,
      Vector(start.X + width - 1, start.Y + 1),
      false,
      height - 2,
    );
  }

  private static addWallLine(
    wallSet: Set<FlatVector>,
    start: Vector,
    horiz: boolean,
    len: int,
  ): void {
    for (let o = 0; o < len; o++) {
      wallSet.add(
        flattenVector(
          Vector(start.X + (horiz ? o : 0), start.Y + (horiz ? 0 : o)),
        ),
      );
    }
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

  isAccessible(room: CustomRoomConfig, newObstructions: Vector[]): boolean {
    this.doors = [];
    this.blockingEntities.clear();
    for (const obstruction of newObstructions) {
      this.blockingEntities.add(flattenVector(obstruction));
    }

    // Get room entity data
    let i = 1;
    let entity = room.get(i) as null | LuaRoomGenericEntity;
    while (entity != null) {
      if (entity.ISDOOR) {
        const doorEntity = entity as LuaRoomDoor;
        if (doorEntity.EXISTS) {
          this.doors.push(doorEntity.SLOT);
        }
      } else {
        const spawnEntity = entity as LuaRoomEntity;
        if (spawnEntity[1].TYPE >= 1000) {
          this.blockingEntities.add(
            flattenVector(Vector(spawnEntity.GRIDX, spawnEntity.GRIDY)),
          );
        }
      }
      entity = room.get(++i) as null | LuaRoomGenericEntity;
    }

    // Test each path
    for (const doorPair of AccessValidator.getPermutations(this.doors)) {
      const flatDoorPair = flattenDoorPair(doorPair);

      if (this.currentPaths.has(flatDoorPair)) {
        Isaac.DebugString(`Preexisting path found for [${flatDoorPair}].`);
        let clear = true;
        for (const pathPos of this.currentPaths.get(flatDoorPair)!) {
          if (this.blockingEntities.has(pathPos)) {
            Isaac.DebugString("Path invalid.");
            this.currentPaths.delete(flatDoorPair);
            clear = false;
            break;
          }
        }
        if (clear) {
          Isaac.DebugString("Path valid.");
          continue;
        }
      }

      const pathingResult = findAStarPath(
        getSlotGridPos(doorPair.start, this.shape),
        getSlotGridPos(doorPair.end, this.shape),
        manhattanDist,
        this.getNeighbors.bind(this),
      );
      if (pathingResult === false) {
        return false;
      }
      const flatResult: FlatVector[] = [];
      for (let r = 0; r < pathingResult.length; r++) {
        flatResult.push(flattenVector(pathingResult[r]));
      }
      this.currentPaths.set(flatDoorPair, flatResult);
    }

    return true;
  }

  getNeighbors(current: FlatVector, goal: FlatVector): Vector[] {
    const currentVec = expandVector(current);
    const possibleNeighbors = [
      Vector(currentVec.X + 1, currentVec.Y),
      Vector(currentVec.X, currentVec.Y + 1),
      Vector(currentVec.X - 1, currentVec.Y),
      Vector(currentVec.X, currentVec.Y - 1),
    ];
    const flatPossibleNeighbors = [
      flattenVector(possibleNeighbors[0]!),
      flattenVector(possibleNeighbors[1]!),
      flattenVector(possibleNeighbors[2]!),
      flattenVector(possibleNeighbors[3]!),
    ];

    const neighbors: Vector[] = [];
    for (let i = 0; i < possibleNeighbors.length; i++) {
      if (
        flatPossibleNeighbors[i] === goal ||
        (isValidGridPos(possibleNeighbors[i], this.shape) &&
          !this.walls.has(flatPossibleNeighbors[i]) &&
          !this.blockingEntities.has(flatPossibleNeighbors[i]))
      ) {
        neighbors.push(possibleNeighbors[i]);
      }
    }

    // Debug Logging
    /*
    const doorPos = new Set<FlatVector>();
    for (const door of this.doors) {
      doorPos.add(flattenVector(getSlotGridPos(door, this.shape)));
    }
    const pathPos = new Set<FlatVector>();
    for (const pathStep of path) {
      pathPos.add(flattenVector(pathStep));
    }
    const flatNeighbors = new Set<FlatVector>();
    for (const neighbor of neighbors) {
      flatNeighbors.add(flattenVector(neighbor));
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
        } else if (flatNeighbors.has(drawPos)) {
          if (pathPos.has(drawPos)) {
            line += "@";
          } else {
            line += "N";
          }
          nonEmpty = true;
        } else if (doorPos.has(drawPos)) {
          if (pathPos.has(drawPos)) {
            line += "O";
          } else {
            line += "H";
          }
          nonEmpty = true;
        } else if (this.walls.has(drawPos)) {
          line += "+";
          nonEmpty = true;
        } else if (this.blockingEntities.has(drawPos)) {
          line += "#";
          nonEmpty = true;
        } else if (pathPos.has(drawPos)) {
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
    } */

    return neighbors;
  }
}