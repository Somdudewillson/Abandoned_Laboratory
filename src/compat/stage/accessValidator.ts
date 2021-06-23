import {
  expandVector,
  findAStarPath,
  flattenVector,
  FlatVector,
  manhattanDist,
} from "../../utils/aStar";
import { getSlotGridPos, isValidGridPos } from "../../utils/utils";

export class AccessValidator {
  shape: RoomShape;
  currentPaths = new Map<int, Vector[]>();
  doors: DoorSlot[] = [];
  blockingEntities = new Set<FlatVector>();
  walls: Set<FlatVector>;
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

  private static getPermutations(doors: DoorSlot[]): int[] {
    const out: int[] = [];

    let start = 0;
    while (start + 1 < doors.length) {
      for (let end = start + 1; end < doors.length; end++) {
        out.push(doors[start] * 10 + doors[end]);
      }
      start++;
    }

    return out;
  }

  isAccessible(room: CustomRoomConfig): boolean {
    this.doors = [];
    this.blockingEntities.clear();

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
      const start = Math.floor(doorPair / 10);
      const end = Math.round(doorPair - start);

      // TODO: remember & use pre-existing paths.
      if (
        findAStarPath(
          getSlotGridPos(start, this.shape),
          getSlotGridPos(end, this.shape),
          manhattanDist,
          this.getNeighbors.bind(this),
        ) === false
      ) {
        return false;
      }
    }

    return true;
  }

  getNeighbors(current: FlatVector, goal: FlatVector): Vector[] {
    const currentVec = expandVector(current);
    const possibleNeighbors = [
      Vector(currentVec.X + 1, currentVec.Y),
      Vector(currentVec.X + 1, currentVec.Y + 1),
      Vector(currentVec.X, currentVec.Y + 1),
      Vector(currentVec.X - 1, currentVec.Y + 1),
      Vector(currentVec.X - 1, currentVec.Y),
      Vector(currentVec.X - 1, currentVec.Y - 1),
      Vector(currentVec.X, currentVec.Y - 1),
      Vector(currentVec.X + 1, currentVec.Y - 1),
    ];
    const flatPossibleNeighbors = [
      flattenVector(possibleNeighbors[0]!),
      flattenVector(possibleNeighbors[1]!),
      flattenVector(possibleNeighbors[2]!),
      flattenVector(possibleNeighbors[3]!),
      flattenVector(possibleNeighbors[4]!),
      flattenVector(possibleNeighbors[5]!),
      flattenVector(possibleNeighbors[6]!),
      flattenVector(possibleNeighbors[7]!),
    ];

    const neighbors: Vector[] = [];
    for (let i = 0; i < possibleNeighbors.length; i++) {
      if (
        current === goal ||
        (isValidGridPos(possibleNeighbors[i], this.shape) &&
          !this.blockingEntities.has(flatPossibleNeighbors[i]))
      ) {
        neighbors.push(possibleNeighbors[i]);
      }
    }

    return neighbors;
  }
}
