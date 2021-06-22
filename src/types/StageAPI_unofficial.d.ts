declare const enum StageCallback {
  /** Takes 1 return value. If `false`, cancels spawning the grid. If a table, uses it as the grid data.
   *
   * Any return value breaks out of future callbacks. */
  PRE_SPAWN_GRID = "PRE_SPAWN_GRID",
  /** Takes 1 return value. If a table, uses it as the current room layout. Otherwise, chooses from `roomsList` with seeded RNG.
   * Breaks on first return.
   *
   * Called both on initial room load and when continuing game, before INIT. */
  PRE_ROOM_LAYOUT_CHOOSE = "PRE_ROOM_LAYOUT_CHOOSE",
  POST_CHANGE_ROOM_GFX = "POST_CHANGE_ROOM_GFX",
  /** Runs before most but not all StageAPI room functionality. Guaranteed to run before any room loads. */
  PRE_STAGEAPI_NEW_ROOM = "PRE_STAGEAPI_NEW_ROOM",
}

declare type CustomRoomConfig = LuaTable<
  number | string,
  LuaRoomGenericEntity | number | string
>;
declare interface LuaRoomGenericEntity {
  ISDOOR: boolean;
  GRIDX: int;
  GRIDY: int;
}
declare interface LuaRoomDoor extends LuaRoomGenericEntity {
  SLOT: DoorSlot;
  EXISTS: boolean;
}
declare interface LuaRoomEntity extends LuaRoomGenericEntity {
  1: {
    TYPE: int;
    VARIANT: int;
    SUBTYPE: int;
    WEIGHT: float;
    METADATA?: unknown;
  };
}
