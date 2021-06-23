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
