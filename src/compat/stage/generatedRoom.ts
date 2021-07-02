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
} from "../../utils/flatGridVector";
import {
  getMirroredPos,
  getRoomShapeSize,
  getSlotGridPos,
  getValidSlots,
  isValidFlatGridPos,
  SymmetryType,
} from "../../utils/utils";

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
        } else if (groundObstacle) {
          this.groundObstacles.add(pos);
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
    if (isValidFlatGridPos(pos, this.shape)) {
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

    return false;
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
