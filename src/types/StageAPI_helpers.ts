import { getMirroredPos, SymmetryType } from "../utils/utils";

export function makeLuaDoor(
  gridPos: Vector,
  slot: DoorSlot,
  exists: boolean,
): LuaRoomDoor {
  return {
    ISDOOR: true,
    GRIDX: gridPos.X,
    GRIDY: gridPos.Y,
    SLOT: slot,
    EXISTS: exists,
  } as LuaRoomDoor;
}

export function makeLuaEntity(
  gridPos: Vector,
  type: int,
  variant: int,
  subtype: int,
  weight: float = 1,
): LuaRoomEntity {
  return {
    ISDOOR: false,
    GRIDX: gridPos.X,
    GRIDY: gridPos.Y,
    1: {
      TYPE: type,
      VARIANT: variant,
      SUBTYPE: subtype,
      WEIGHT: weight,
    },
  } as LuaRoomEntity;
}

export function newCustomRoom(): CustomRoomConfig {
  return new LuaTable<
    number | string,
    LuaRoomGenericEntity | number | string
  >() as CustomRoomConfig;
}

export function initCustomRoom(
  type: int,
  variant: int,
  subtype: int,
  name: string,
  difficulty: int,
  weight: float,
  width: int,
  height: int,
  shape: RoomShape,
): CustomRoomConfig {
  const newRoom = new LuaTable<
    number | string,
    LuaRoomGenericEntity | number | string
  >() as CustomRoomConfig;

  newRoom.set("TYPE", type);
  newRoom.set("VARIANT", variant);
  newRoom.set("SUBTYPE", subtype);
  newRoom.set("NAME", name);
  newRoom.set("DIFFICULTY", difficulty);
  newRoom.set("WEIGHT", weight);
  newRoom.set("WIDTH", width);
  newRoom.set("HEIGHT", height);
  newRoom.set("SHAPE", shape);

  return newRoom;
}

export function mirrorLuaEntity(
  luaRoom: CustomRoomConfig,
  index: int,
  shape: RoomShape,
  symmetry: SymmetryType,
  entity: LuaRoomEntity,
): int {
  const originPos = Vector(entity.GRIDX, entity.GRIDY);
  const mirrorPos = getMirroredPos(shape, symmetry, originPos);

  luaRoom.set(index++, entity);
  for (const mirroredPos of mirrorPos) {
    if (originPos.DistanceSquared(mirroredPos) > 0.9) {
      luaRoom.set(
        index++,
        makeLuaEntity(
          mirroredPos,
          entity[1].TYPE,
          entity[1].VARIANT,
          entity[1].SUBTYPE,
          entity[1].WEIGHT,
        ),
      );
    }
  }
  return index;
}

export function makeOverrideStage(
  stageToOverride: LevelStage,
  stageTypeToOverride: StageType,
  customStage: CustomStage,
): StageOverrideStage {
  return {
    OverrideStage: stageToOverride,
    OverrideStageType: stageTypeToOverride,
    ReplaceWith: customStage,
  } as StageOverrideStage;
}

// Layout Grid Metadata
export function isGridPassable(type: LayoutGridType, flying = false): boolean {
  switch (type) {
    default:
    case LayoutGridType.POOP:
    case LayoutGridType.POOP_BLACK:
    case LayoutGridType.POOP_CHARMING:
    case LayoutGridType.POOP_CORNY:
    case LayoutGridType.POOP_GOLD:
    case LayoutGridType.POOP_HOLY:
    case LayoutGridType.POOP_RAINBOW:
    case LayoutGridType.POOP_RED:
    case LayoutGridType.PROP_A:
    case LayoutGridType.PROP_B:
    case LayoutGridType.PROP_C:
    case LayoutGridType.TNT:
    case LayoutGridType.TNT_PUSHABLE:
    case LayoutGridType.SPIKES_ON_OFF:
    case LayoutGridType.COBWEB:
    case LayoutGridType.BUTTON:
    case LayoutGridType.GRAVITY:
      return true;
    case LayoutGridType.ROCK:
    case LayoutGridType.ROCK_ALT:
    case LayoutGridType.ROCK_BOMB:
    case LayoutGridType.ROCK_SPIKE:
    case LayoutGridType.ROCK_GOLD:
    case LayoutGridType.MARKED_SKULL:
    case LayoutGridType.PIT:
    case LayoutGridType.SPIKES:
    case LayoutGridType.PITFALL:
    case LayoutGridType.BLOCK_METAL:
      return flying;
    case LayoutGridType.BLOCK_KEY:
    case LayoutGridType.BLOCK_METAL_TALL:
    case LayoutGridType.BLOCK_INVISIBLE:
      return false;
  }
}
