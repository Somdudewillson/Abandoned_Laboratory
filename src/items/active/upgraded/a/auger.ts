import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { getGlobalData, saveGlobalData, SaveType } from "../../../../saveData";

const SAVE_KEY_AUGER = "auger_spawned_crawlspace";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_AUGER as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const room = Game().GetRoom();
  const spawnPos = room.GetGridPosition(room.GetGridIndex(player.Position));
  for (let i = 0; i < DoorSlot.NUM_DOOR_SLOTS; i++) {
    const door = room.GetDoor(i);
    if (door == null) {
      continue;
    }

    if (room.GetDoorSlotPosition(i).DistanceSquared(spawnPos) < 50 * 50) {
      return true;
    }
  }

  const hasSpawnedCrawlspace = getGlobalData(
    SaveType.PER_FLOOR,
    SAVE_KEY_AUGER,
  ) as boolean | null;

  if (!hasSpawnedCrawlspace) {
    Isaac.GridSpawn(GridEntityType.GRID_STAIRS, 0, player.Position, true);
    saveGlobalData(SaveType.PER_FLOOR, SAVE_KEY_AUGER, true);
    player.SetActiveCharge(2, ActiveSlot);

    return { Discharge: false, Remove: false, ShowAnim: true };
  }

  Isaac.GridSpawn(GridEntityType.GRID_TRAPDOOR, 0, player.Position, true);

  return true;
}
