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

  // lab1Stage.SetRooms(generateRooms("lab1Rooms"));

  StageAPI.GotoCustomStage(lab1Stage, false, false);
}

/*
function generateRooms(listName: string): RoomsList {
  const newRooms = StageAPI.RoomsList(listName);
  // Generate Rooms
  let totalRooms = 0;
  for (let shape = 1; shape < RoomShape.NUM_ROOMSHAPES; shape++) {
    const desiredCount = shape === RoomShape.ROOMSHAPE_1x1 ? 5 : 1;
    totalRooms += getDoorSets(shape).length * desiredCount;
  }
  const rand = RNG();
  let generatedRooms = 0;
  const startTime = Isaac.GetTime();
  for (let shape = 1; shape < RoomShape.NUM_ROOMSHAPES; shape++) {
    const doorSets = getDoorSets(shape);

    for (const doorSet of doorSets) {
      const desiredCount = shape === RoomShape.ROOMSHAPE_1x1 ? 5 : 1;
      for (let count = 0; count < desiredCount; count++) {
        newRooms.AddRooms([generateRoom(rand, shape, doorSet)]);
        generatedRooms++;
      }
    }
    const elapsedTime = Isaac.GetTime() - startTime;
    const remainingTime =
      elapsedTime / (generatedRooms / totalRooms) - elapsedTime;
    Isaac.DebugString(
      `Generated ${generatedRooms}/${totalRooms} rooms in [${
        elapsedTime / 1000
      } s]. ETA [${remainingTime / 1000} s]`,
    );
  }

  return newRooms;
}

function getDoorSets(shape: RoomShape): DoorSlot[][] {
  let min = 2;
  const max = 3;
  switch (shape) {
    default:
      break;
    case RoomShape.ROOMSHAPE_1x1:
    case RoomShape.ROOMSHAPE_IH:
    case RoomShape.ROOMSHAPE_IV:
      min = 1;
      break;
  }

  const validSlots = getValidSlots(shape);
  const doorSets = getSubsets(validSlots, min, max);
  if (validSlots.length > max) {
    doorSets.push(validSlots);
  }

  return doorSets;
}
*/
