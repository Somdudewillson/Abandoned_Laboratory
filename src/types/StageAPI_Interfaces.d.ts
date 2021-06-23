declare interface VanillaStage {
  NormalStage: true;
  Stage: LevelStage;
  StageType: StageType;
}
declare interface StageOverrideStage {
  OverrideStage: LevelStage;
  OverrideStageType: StageType;
  ReplaceWith: CustomStage | VanillaStage;
}
declare interface DoorInfo {
  RequireCurrent?: RoomType[];
  RequireTarget?: RoomType[];
  RequireEither?: RoomType[];
  NotCurrent?: RoomType[];
  NotTarget?: RoomType[];
  NotEither?: RoomType[];
  IsBossAmbush?: boolean;
}
declare interface Backdrop {
  NFloors: string[];
  LFloors: string[];
  Corners: string[];
  Walls: string[];
}
declare interface RoomGfx {
  Backdrop: Sprite;
  GridGfx: Sprite;
  shadingName: string;
  shadingPrefix: string;
}
declare interface RoomsList {
  AddRooms(roomfiles: string[] | CustomRoomConfig[]): void;
}

declare interface CustomStage {
  /** Automatically aliases the new stage to the old one, if noSetAlias is not set.
   *
   * This means that IsStage calls on either will return true if either is active.
   *
   * STILL NEEDS A UNIQUE NAME. */
  InheritInit(name: string, noSetAlias?: boolean): void;
  /** Sets the internal id
   *
   * MUST BE UNIQUE
   */
  SetName(name: string): void;
  /** Sets the name displayed to the player */
  SetDisplayName(name: string): void;
  /** Sets if this is the second half of a stage */
  SetIsSecondStage(isSecondStage: boolean): void;
  /** Sets the stage's number */
  SetStageNumber(num: int): void;
  /** Sets the stage overridden */
  SetReplace(StageOverrideStage: StageOverrideStage): void;
  /** Sets the stage after this one */
  SetNextStage(nextStage: CustomStage): void;
  /** Sets the `RoomGFX` used by the stage
   * @param RoomTypes the room types these gfx apply to.
   *
   * Can be a string identifier, a `RoomType`, or an array of either.
   */
  SetRoomGfx(
    RoomGfx: RoomGfx,
    RoomTypes: string | int | string[] | int[],
  ): void;
  /** Sets the room layouts used by the stage */
  SetRooms(RoomsList: RoomsList): void;
  /** Sets the music used by the stage */
  SetMusic(musicID: int, roomType: RoomType): void;
  /** Sets the boss music used by the stage */
  SetBossMusic(musicID: int, clearedMusicID: int): void;
  // TODO: I don't know what this does yet
  SetSpots(bossSpot: int, playerSpot: int): void;
  /** Sets the available bosses for the stage */
  SetBosses(bosses: int[]): void;
  /** Gets the id of the currently playing music */
  GetPlayingMusic(): int;
  // TODO: I don't know what this does yet
  OverrideRockAltEffects(): void;
  /** Sets the stage transition icon */
  // TODO: May not actually take a `Sprite`
  SetTransitionIcon(icon: Sprite): void;
  /** If this `CustomStage` is, in fact, a stage. */
  IsStage(noAlias: boolean): boolean;
}

declare interface GridGfx {
  /** Sets the path to the gfx spritesheet for the specified `GridEntity` */
  SetGrid(filename: string, GridEntityType: GridEntityType, variant: int): void;
  /** Sets the path to the rock gfx spritesheet */
  SetRocks(filename: string): void;
  /** Sets the path to the pit gfx spritesheet
   *
   * Alt Pits are used where water pits would be.
   * @param hasExtraFrames controls for situations where the base game would not normally tile pits specially
   */
  SetPits(
    filename: string,
    altpitsfilename?: string,
    hasExtraFrames?: boolean,
  ): void;
  /** Sets the paths to the pit gfx spritesheets
   *
   * Takes lists of { File, HasExtraFrames }
   *
   * (see utero override)
   */
  SetPits(
    filenames: Array<{ File: string; HasExtraFrames?: boolean }>,
    altpitsfilenames: Array<{ File: string; HasExtraFrames?: boolean }>,
  ): void;
  /** Sets the path to the bridge gfx spritesheet */
  SetBridges(filename: string): void;
  /** Sets the path to the decoration gfx spritesheet */
  SetDecorations(filename: string): void;
  /** Sets the path to the gfx spritesheet of the specified subset of doors */
  AddDoors(filename: string, DoorInfo: DoorInfo): void;
  /** Sets the path to the pay-to-play door gfx spritesheet */
  SetPayToPlayDoor(filename: string): void;
}
