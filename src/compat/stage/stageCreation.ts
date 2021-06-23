import { generateRoom } from "./layoutGen";

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
  const lab1Rooms = StageAPI.RoomsList("lab1Rooms");
  const rand = RNG();
  for (let i = 0; i < 5; i++) {
    lab1Rooms.AddRooms([
      generateRoom(rand, RoomShape.ROOMSHAPE_1x1, [
        DoorSlot.LEFT0,
        DoorSlot.UP0,
        DoorSlot.RIGHT0,
        DoorSlot.DOWN0,
      ]),
    ]);
  }
  lab1Stage.SetRooms(lab1Rooms);

  StageAPI.GotoCustomStage(lab1Stage, false, false);
}
