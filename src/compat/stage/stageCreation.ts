import {
  MicrodroneEntityVariant,
  MICRODRONE_ENTITYTYPE,
} from "../../callbacks/handler_MicrodroneEvents";
import { MOD_ID } from "../../constants";

const DefaultShadingName = "_default";
const DefaultShadingPrefix = "stageapi/shading/shading";

export function createStages(mod: Mod): void {
  if (StageAPI === undefined) {
    return;
  }

  registerCallbacks(mod);

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

  const lab1Stage = StageAPI.CustomStage("Lab I");
  lab1Stage.SetDisplayName("Lab I");
  lab1Stage.SetIsSecondStage(false);
  lab1Stage.SetStageNumber(2);
  lab1Stage.SetReplace(
    StageAPI.StageOverride.CatacombsOne as unknown as StageOverrideStage,
  );
  lab1Stage.OverrideRockAltEffects();
  StageAPI.AddCallback(
    MOD_ID,
    StageCallback.POST_OVERRIDDEN_GRID_BREAK,
    1,
    postAltGridBreak,
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

const altGridItemPool = [
  CollectibleType.COLLECTIBLE_DIVORCE_PAPERS,
  CollectibleType.COLLECTIBLE_DIVORCE_PAPERS,
  CollectibleType.COLLECTIBLE_DIVORCE_PAPERS,
  CollectibleType.COLLECTIBLE_DIVORCE_PAPERS,
  CollectibleType.COLLECTIBLE_DIVORCE_PAPERS,
  CollectibleType.COLLECTIBLE_BLANK_CARD,
  CollectibleType.COLLECTIBLE_BLANK_CARD,
  CollectibleType.COLLECTIBLE_BLANK_CARD,
  CollectibleType.COLLECTIBLE_BLANK_CARD,
  CollectibleType.COLLECTIBLE_BLANK_CARD,
  CollectibleType.COLLECTIBLE_MISSING_PAGE_2,
  CollectibleType.COLLECTIBLE_MISSING_PAGE_2,
  CollectibleType.COLLECTIBLE_MISSING_PAGE_2,
  CollectibleType.COLLECTIBLE_MISSING_PAGE_2,
  CollectibleType.COLLECTIBLE_CONTRACT_FROM_BELOW,
  CollectibleType.COLLECTIBLE_CONTRACT_FROM_BELOW,
  CollectibleType.COLLECTIBLE_CONTRACT_FROM_BELOW,
  CollectibleType.COLLECTIBLE_CONTRACT_FROM_BELOW,
  CollectibleType.COLLECTIBLE_COUPON,
  CollectibleType.COLLECTIBLE_COUPON,
  CollectibleType.COLLECTIBLE_COUPON,
  CollectibleType.COLLECTIBLE_COUPON,
  CollectibleType.COLLECTIBLE_COUPON,
  CollectibleType.COLLECTIBLE_BIRTHRIGHT,
  CollectibleType.COLLECTIBLE_BIRTHRIGHT,
  CollectibleType.COLLECTIBLE_DEATH_CERTIFICATE,
];

/** @noSelf */
function postAltGridBreak(
  grindex: number,
  grid: GridEntity,
  _justBrokenGridSpawns: LuaTable<int, RemovedEntityData> | undefined,
): false | void {
  if (grid.GetType() !== GridEntityType.GRID_ROCK_ALT) {
    return;
  }

  const game = Game();

  const rand = RNG();
  rand.SetSeed(grindex + 3478, 0);
  const spawnSelection = rand.RandomFloat();
  const spawnPos = grid.Position;

  if (spawnSelection <= 0.01) {
    // Choose an item to spawn
    const itemToSpawn = altGridItemPool[rand.RandomInt(altGridItemPool.length)];

    // Check that we haven't already spawned this item
    let spawnItem = true;
    for (let i = 0; i < game.GetNumPlayers(); i++) {
      const player = Isaac.GetPlayer(i);
      if (player === undefined) {
        continue;
      }
      if (player.HasCollectible(itemToSpawn)) {
        spawnItem = false;
        break;
      }
    }

    // Spawn the item
    if (spawnItem) {
      Isaac.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_COLLECTIBLE,
        itemToSpawn,
        spawnPos,
        Vector.Zero,
        undefined,
      );
      return false;
    }
  }

  // Spawn a card
  if (spawnSelection < 0.15) {
    const cardSelection = game
      .GetItemPool()
      .GetCard(rand.Next(), false, false, false);

    Isaac.Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_TAROTCARD,
      cardSelection,
      spawnPos,
      Vector.Zero,
      undefined,
    );
  }

  return false;
}

function registerCallbacks(mod: Mod) {
  mod.AddCallback(ModCallbacks.MC_PRE_ROOM_ENTITY_SPAWN, replaceEnemies);
}

function replaceEnemies(
  entityType: number,
  _variant: number,
  _subType: number,
  _gridIndex: number,
  _seed: number,
): void | [number, number, number] {
  switch (entityType) {
    default:
      break;
    case EntityType.ENTITY_FLY:
      return [MICRODRONE_ENTITYTYPE, MicrodroneEntityVariant.ATTACK_DRONE, 0];
  }
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
