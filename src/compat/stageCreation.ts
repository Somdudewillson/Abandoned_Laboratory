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
const LabGrid = StageAPI.GridGfx();
LabGrid.SetRocks("gfx/grid/lab/restored/generic/lab_rocks.png");

export function createStages(): void {
  const lab1Stage = StageAPI.CustomStage("Lab I");
  lab1Stage.SetDisplayName("Lab I");
  lab1Stage.SetIsSecondStage(false);
  lab1Stage.SetStageNumber(2);
  lab1Stage.SetReplace(
    StageAPI.StageOverride.CatacombsOne as unknown as StageOverrideStage,
  );

  lab1Stage.SetRoomGfx(
    StageAPI.RoomGfx(
      LabBackdrop,
      LabGrid,
      DefaultShadingName,
      DefaultShadingPrefix,
    ),
    RoomType.ROOM_DEFAULT,
  );

  StageAPI.GotoCustomStage(lab1Stage, false, false);
}