import {
  initCustomRoom,
  isGridPassable,
  makeLuaDoor,
  makeLuaEntity,
} from "../../types/StageAPI_helpers";
import {
  expandVector,
  FlatGridVector,
  flattenVector,
  shiftFlat,
} from "../../utils/flatGridVector";
import {
  getDoorEntryPos,
  getMirroredPos,
  getRoomShapeSize,
  getRoomShapeVolume,
  getSlotGridPos,
  getValidSlots,
  isValidFlatGridPos,
  SymmetryType,
} from "../../utils/utils";

export const enum Accessibility {
  NONE = 0,
  FLIGHT = 1,
  GROUND = 2,
}

export class GeneratedRoom {
  static nextID = 0;

  readonly shape: RoomShape;
  readonly doorSlots: DoorSlot[];
  readonly id: string;
  doorEntities = new Map<FlatGridVector, LuaRoomDoor>();
  gridEntities = new Map<FlatGridVector, LuaRoomEntity>();
  groundObstacles = new Set<FlatGridVector>();
  flyingObstacles = new Set<FlatGridVector>();

  gridEntityBuffer = new Map<FlatGridVector, LuaRoomEntity>();
  groundObstacleBuffer = new Set<FlatGridVector>();
  flyingObstacleBuffer = new Set<FlatGridVector>();

  private groundAccessible = new Set<FlatGridVector>();
  private flightAccessible = new Set<FlatGridVector>();
  private isAccessibilityDirty = true;
  private isFlightAccessibilityDirty = false;
  private flightAccessibilityInitialized = false;

  constructor(shape: RoomShape, doorSlots: DoorSlot[]) {
    this.shape = shape;
    this.doorSlots = doorSlots;
    this.id = math.floor(GeneratedRoom.nextID++).toString(16);

    // Isaac.DebugString(`Created room #${this.id}`);

    // Add Doors
    let i = 0;
    const presentDoors: DoorSlot[] = [];
    for (const doorSlot of getValidSlots(shape)) {
      const present = i < doorSlots.length && doorSlots[i] === doorSlot;
      if (present) {
        presentDoors.push(doorSlot);
        i++;
      }

      const doorPos = getSlotGridPos(doorSlot, shape);
      this.doorEntities.set(
        flattenVector(doorPos),
        makeLuaDoor(doorPos, doorSlot, present),
      );
    }
  }

  getGridEntity(
    pos: FlatGridVector,
    includeBuffer = false,
  ): LuaRoomGenericEntity | null {
    if (includeBuffer && this.gridEntityBuffer.has(pos)) {
      return this.gridEntityBuffer.get(pos)!;
    }
    if (this.gridEntities.has(pos)) {
      return this.gridEntities.get(pos)!;
    }
    if (this.doorEntities.has(pos)) {
      return this.doorEntities.get(pos)!;
    }

    if (isValidFlatGridPos(pos, this.shape)) {
      return null;
    }
    return makeLuaEntity(expandVector(pos), GridEntityType.GRID_WALL, 0, 0);
  }

  addGridEntity(
    pos: FlatGridVector,
    newEntity: LuaRoomEntity,
    finalize = false,
    override = true,
  ): void {
    if (override || !this.gridEntities.has(pos)) {
      const newGridType = newEntity[1].TYPE;
      const flightObstacle = !isGridPassable(newGridType, true);
      const groundObstacle = !isGridPassable(newGridType);

      if (finalize) {
        this.gridEntities.set(pos, newEntity);

        if (flightObstacle) {
          this.flyingObstacles.add(pos);
          this.groundObstacles.add(pos);

          this.isFlightAccessibilityDirty = true;
          this.isAccessibilityDirty = true;
        } else if (groundObstacle) {
          this.groundObstacles.add(pos);

          this.isAccessibilityDirty = true;
        }
      } else {
        this.gridEntityBuffer.set(pos, newEntity);

        if (flightObstacle) {
          this.flyingObstacleBuffer.add(pos);
          this.groundObstacleBuffer.add(pos);
        } else if (groundObstacle) {
          this.groundObstacleBuffer.add(pos);
        }
      }
    }
  }

  createGridEntity(
    pos: Vector,
    type: int,
    variant: int,
    subtype: int,
    weight: float = 1,
    finalize = false,
    override = true,
  ): void {
    this.addGridEntity(
      flattenVector(pos),
      makeLuaEntity(pos, type, variant, subtype, weight),
      finalize,
      override,
    );
  }

  removeGridEntity(pos: FlatGridVector, fromBuffer = false): void {
    if (fromBuffer) {
      if (!this.gridEntityBuffer.has(pos)) {
        return;
      }

      this.gridEntityBuffer.delete(pos);
      this.flyingObstacleBuffer.delete(pos);
      this.groundObstacleBuffer.delete(pos);
    } else {
      if (!this.gridEntities.has(pos)) {
        return;
      }

      this.gridEntities.delete(pos);
      if (this.flyingObstacles.has(pos)) {
        this.flyingObstacles.delete(pos);
        this.groundObstacles.delete(pos);

        this.isFlightAccessibilityDirty = true;
        this.isAccessibilityDirty = true;
      } else if (this.groundObstacles.has(pos)) {
        this.groundObstacles.delete(pos);

        this.isAccessibilityDirty = true;
      }
    }
  }

  createMirroredEntity(
    pos: Vector,
    symmetry: SymmetryType,
    type: int,
    variant: int,
    subtype: int,
    weight: float = 1,
    finalize = false,
    override = true,
  ): void {
    for (const mirrorPos of getMirroredPos(this.shape, symmetry, pos, true)) {
      this.createGridEntity(
        mirrorPos,
        type,
        variant,
        subtype,
        weight,
        finalize,
        override,
      );
    }
  }

  removeMirroredGrid(
    pos: Vector,
    symmetry: SymmetryType,
    fromBuffer = false,
  ): void {
    for (const mirrorPos of getMirroredPos(this.shape, symmetry, pos, true)) {
      this.removeGridEntity(flattenVector(mirrorPos), fromBuffer);
    }
  }

  finalizeBuffer(): void {
    for (const entry of this.gridEntityBuffer.entries()) {
      this.addGridEntity(entry[0], entry[1], true, true);
    }

    this.wipeBuffer();
  }

  wipeBuffer(): void {
    this.gridEntityBuffer.clear();
    this.groundObstacleBuffer.clear();
    this.flyingObstacleBuffer.clear();
  }

  isPosPassable(
    pos: FlatGridVector,
    flying = false,
    includeBuffer = true,
  ): boolean {
    if (!isValidFlatGridPos(pos, this.shape)) {
      return false;
    }

    if (flying) {
      return !(
        this.flyingObstacles.has(pos) ||
        (includeBuffer && this.flyingObstacleBuffer.has(pos))
      );
    }

    return !(
      this.groundObstacles.has(pos) ||
      (includeBuffer && this.groundObstacleBuffer.has(pos))
    );
  }

  isPosEmpty(pos: FlatGridVector, includeBuffer = false): boolean {
    if (!isValidFlatGridPos(pos, this.shape)) {
      return false;
    }

    return !(
      this.gridEntities.has(pos) ||
      (includeBuffer && this.gridEntityBuffer.has(pos))
    );
  }

  getFillPercentage(includeBuffer = true): float {
    let filled = this.groundObstacles.size;
    if (includeBuffer) {
      filled += this.groundObstacleBuffer.size;
    }

    return filled / getRoomShapeVolume(this.shape);
  }

  printAccessibility(): void {
    if (this.isAccessibilityDirty) {
      this.updateAccessibility();
    }

    let horizDrawn = 0;
    for (let y = -1; y < 15; y++) {
      let line = "";
      let nonEmpty = false;

      for (let x = -1; x < 27; x++) {
        const drawPos = flattenVector(Vector(x, y));

        line += " ";
        if (this.groundAccessible.has(drawPos)) {
          line += "00";
          nonEmpty = true;
        } else if (this.flightAccessible.has(drawPos)) {
          line += "01";
          nonEmpty = true;
        } else if (
          this.doorEntities.has(drawPos) &&
          this.doorEntities.get(drawPos)!.EXISTS
        ) {
          line += "[]";
        } else if (isValidFlatGridPos(drawPos, this.shape)) {
          line += "02";
          nonEmpty = true;
        } else {
          let hasAdjacent = false;

          for (const adjacent of GeneratedRoom.getChessboardNeighbors(
            drawPos,
          )) {
            if (isValidFlatGridPos(adjacent, this.shape)) {
              hasAdjacent = true;
              break;
            }
          }

          if (hasAdjacent) {
            line += "XX";
          } else {
            line += "  ";
          }
        }
      }
      line += " ";

      if (nonEmpty || horizDrawn < 2) {
        Isaac.DebugString(line.trimEnd());

        if (!nonEmpty) {
          horizDrawn++;
        }
      }
    }
  }

  getPosAccessibility(pos: FlatGridVector): Accessibility {
    if (this.isAccessibilityDirty) {
      this.updateAccessibility();
    }

    if (this.groundAccessible.has(pos)) {
      return Accessibility.GROUND;
    }
    if (
      !this.flightAccessibilityInitialized ||
      this.flightAccessible.has(pos)
    ) {
      return Accessibility.FLIGHT;
    }
    return Accessibility.NONE;
  }

  updateAccessibility(): void {
    Isaac.DebugString("\t\tRebuilding accessibility data.");

    let startTime = Isaac.GetTime();
    const passThrough = this.updateGroundAccessibility();
    Isaac.DebugString(
      `\t\t\tGround accessibility built with ${
        this.groundAccessible.size
      } nodes (${math.floor(Isaac.GetTime() - startTime)} ms).`,
    );

    if (this.isFlightAccessibilityDirty) {
      startTime = Isaac.GetTime();
      this.updateFlyingAccessibility(passThrough.queue, passThrough.set);
      Isaac.DebugString(
        `\t\t\tFlight accessibility built with ${
          this.flightAccessible.size
        } nodes (${math.floor(Isaac.GetTime() - startTime)} ms).`,
      );
    }

    this.isAccessibilityDirty = false;
    this.isFlightAccessibilityDirty = false;
  }

  /** @returns starting queue & set for updating flight accessibility */
  private updateGroundAccessibility(): {
    queue: FlatGridVector[];
    set: Set<FlatGridVector>;
  } {
    this.groundAccessible.clear();
    const nodeQueue: FlatGridVector[] = [];
    const queueSet = new Set<FlatGridVector>();

    const flightQueue: FlatGridVector[] = [];
    const flightQueueSet = new Set<FlatGridVector>();

    for (const doorSlot of this.doorSlots) {
      const doorPos = flattenVector(getDoorEntryPos(doorSlot, this.shape));

      nodeQueue.push(doorPos);
      queueSet.add(doorPos);
    }

    while (nodeQueue.length > 0) {
      const expandingNode = nodeQueue.pop()!;
      queueSet.delete(expandingNode);
      this.groundAccessible.add(expandingNode);

      for (const neighbor of GeneratedRoom.getCardinalNeighbors(
        expandingNode,
      )) {
        if (this.groundAccessible.has(neighbor)) {
          continue;
        }
        if (queueSet.has(neighbor)) {
          continue;
        }
        if (!isValidFlatGridPos(neighbor, this.shape)) {
          continue;
        }
        if (!this.isPosPassable(neighbor, false, false)) {
          if (
            !flightQueueSet.has(neighbor) &&
            this.isPosPassable(neighbor, true, false)
          ) {
            flightQueue.push(neighbor);
            flightQueueSet.add(neighbor);
          }
          continue;
        }

        nodeQueue.push(neighbor);
        queueSet.add(neighbor);
      }
    }

    return { queue: flightQueue, set: flightQueueSet };
  }

  private updateFlyingAccessibility(
    nodeQueue: FlatGridVector[],
    queueSet: Set<FlatGridVector>,
  ): void {
    this.flightAccessibilityInitialized = true;
    this.flightAccessible.clear();

    while (nodeQueue.length > 0) {
      const expandingNode = nodeQueue.pop()!;
      queueSet.delete(expandingNode);
      this.flightAccessible.add(expandingNode);

      for (const neighbor of GeneratedRoom.getCardinalNeighbors(
        expandingNode,
      )) {
        if (this.flightAccessible.has(neighbor)) {
          continue;
        }
        if (queueSet.has(neighbor)) {
          continue;
        }
        if (!isValidFlatGridPos(neighbor, this.shape)) {
          continue;
        }
        if (!this.isPosPassable(neighbor, true, false)) {
          continue;
        }

        nodeQueue.push(neighbor);
        queueSet.add(neighbor);
      }
    }
  }

  private static getCardinalNeighbors(pos: FlatGridVector): FlatGridVector[] {
    return [
      shiftFlat(pos, -1, 0),
      shiftFlat(pos, 1, 0),
      shiftFlat(pos, 0, -1),
      shiftFlat(pos, 0, 1),
    ];
  }

  private static getChessboardNeighbors(pos: FlatGridVector): FlatGridVector[] {
    return [
      shiftFlat(pos, -1, 0),
      shiftFlat(pos, 1, 0),
      shiftFlat(pos, 0, -1),
      shiftFlat(pos, 0, 1),
      shiftFlat(pos, -1, -1),
      shiftFlat(pos, -1, 1),
      shiftFlat(pos, 1, -1),
      shiftFlat(pos, 1, 1),
    ];
  }

  convertToRoomLayout(): CustomRoomConfig {
    const roomSize = getRoomShapeSize(this.shape);
    const newRoom = initCustomRoom(
      RoomType.ROOM_DEFAULT,
      0,
      0,
      `Generated Room-${this.id}`,
      1,
      1,
      roomSize.X,
      roomSize.Y,
      this.shape,
    );

    let index = 1;
    for (const doorEntity of this.doorEntities) {
      newRoom.set(index++, doorEntity[1]);
    }
    for (const gridEntity of this.gridEntities) {
      newRoom.set(index++, gridEntity[1]);
    }

    return newRoom;
  }
}
