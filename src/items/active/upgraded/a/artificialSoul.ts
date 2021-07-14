import { CollectibleTypeLabUpgrade } from "../../../../constants";
import * as SaveUtil from "../../../../saveData";
import { SaveType } from "../../../../saveData";
import { chargeEffect } from "../../../../utils/utils";

const KEY_VISITED_COUNT = "artificial_soul_visit_count";
const KEY_USED = "artificial_soul_used";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_ARTIFICIALSOUL as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UseActiveItem(CollectibleType.COLLECTIBLE_EDENS_SOUL);

  SaveUtil.savePlayerData(
    EntityRef(player),
    SaveType.PER_FLOOR,
    KEY_VISITED_COUNT,
    1,
  );
  SaveUtil.savePlayerData(
    EntityRef(player),
    SaveType.PER_FLOOR,
    KEY_USED,
    true,
  );

  return true;
}

export function postRoom(player: EntityPlayer, room: Room, level: Level): void {
  if (room.GetType() === RoomType.ROOM_ERROR) {
    return;
  }
  if (room.IsFirstVisit()) {
    return;
  }

  if (!player.HasCollectible(ownType())) {
    return;
  }
  if (
    SaveUtil.getPlayerData(EntityRef(player), SaveType.PER_FLOOR, KEY_USED) ===
    true
  ) {
    return;
  }

  // Isaac.DebugString(`Current room index:${level.GetCurrentRoomIndex()}`);
  let visitedRoomCount = SaveUtil.getPlayerData(
    EntityRef(player),
    SaveType.PER_FLOOR,
    KEY_VISITED_COUNT,
  ) as int | null;
  if (visitedRoomCount === null) {
    visitedRoomCount = 0;
  }
  visitedRoomCount++;

  SaveUtil.savePlayerData(
    EntityRef(player),
    SaveType.PER_FLOOR,
    KEY_VISITED_COUNT,
    visitedRoomCount,
  );

  // Isaac.DebugString(
  //   `Unique rooms visited:${visitedUniqueRooms}/${level.GetRoomCount()}`,
  // );
  const newCharge = math.min(
    Math.floor((visitedRoomCount / (level.GetRoomCount() * 0.9)) * 100),
    100,
  );

  for (let s = 0; s <= ActiveSlot.SLOT_POCKET2; s++) {
    if (player.GetActiveItem(s) === ownType()) {
      if (player.GetActiveCharge(s) < newCharge) {
        chargeEffect(player.Position);
      }
      player.SetActiveCharge(newCharge, s);
    }
  }
}
