const DefaultShadingName = "_default";
const DefaultShadingPrefix = "stageapi/shading/shading";

const LabBackdrop = StageAPI.BackdropHelper(
  {
    Walls: ["a", "b", "c"],
    NFloors: ["nfloor"],
    LFloors: ["lfloor"],
    Corners: ["corner"],
  },
  "gfx/backdrop/lab/restored/generic/main_",
  "0001.png",
);

export function createStages(): void {
  const testStage = StageAPI.CustomStage("Lab I");
  testStage.SetDisplayName("Lab I");
  testStage.SetIsSecondStage(false);
  testStage.SetStageNumber(2);
  /* testStage.SetReplace({
    OverrideStage: LevelStage.STAGE2_1,
    OverrideStageType: StageType.STAGETYPE_WOTL,
    ReplaceWith: testStage,
  } as StageOverrideStage); */
  testStage.SetReplace(
    StageAPI.StageOverride.CatacombsOne as unknown as StageOverrideStage,
  );

  testStage.SetRoomGfx(
    StageAPI.RoomGfx(
      LabBackdrop,
      null,
      DefaultShadingName,
      DefaultShadingPrefix,
    ),
    RoomType.ROOM_DEFAULT,
  );

  StageAPI.GotoCustomStage(testStage, false, false);
}
