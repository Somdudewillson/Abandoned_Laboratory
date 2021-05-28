import { CollectibleTypeLab } from "../../../constants";
import * as SaveUtil from "../../../saveData";
import { SaveType } from "../../../saveData";
import { chargeEffect } from "../../../utils";

const KEY_VISITED_ROOMS = "artificial_soul_visited";
const KEY_USED = "artificial_soul_used";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_ARTIFICIALSOUL as number;
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
    player.Index,
    SaveType.PER_FLOOR,
    KEY_VISITED_ROOMS,
    [],
  );
  SaveUtil.savePlayerData(player.Index, SaveType.PER_FLOOR, KEY_USED, true);

  return true;
}

export function postRoom(player: EntityPlayer, room: Room, level: Level): void {
  if (room.GetType() === RoomType.ROOM_ERROR) {
    return;
  }

  if (!player.HasCollectible(ownType())) {
    return;
  }
  if (SaveUtil.getPlayerData(player.Index, SaveType.PER_FLOOR, KEY_USED)) {
    return;
  }

  // Isaac.DebugString(`Current room index:${level.GetCurrentRoomIndex()}`);
  let visitedRoomData = SaveUtil.getPlayerData(
    player.Index,
    SaveType.PER_FLOOR,
    KEY_VISITED_ROOMS,
  ) as int[] | null;
  if (visitedRoomData == null) {
    SaveUtil.savePlayerData(
      player.Index,
      SaveType.PER_FLOOR,
      KEY_VISITED_ROOMS,
      [],
    );

    visitedRoomData = SaveUtil.getPlayerData(
      player.Index,
      SaveType.PER_FLOOR,
      KEY_VISITED_ROOMS,
    ) as int[];
  }
  if (visitedRoomData.indexOf(level.GetCurrentRoomIndex()) === -1) {
    visitedRoomData.push(level.GetCurrentRoomIndex());
  }

  const visitedUniqueRooms = visitedRoomData.length;

  // Isaac.DebugString(
  //   `Unique rooms visited:${visitedUniqueRooms}/${level.GetRoomCount()}`,
  // );
  const newCharge = math.min(
    Math.floor((visitedUniqueRooms / (level.GetRoomCount() * 0.9)) * 100),
    100,
  );

  for (let s = 0; s < ActiveSlot.SLOT_POCKET2; s++) {
    if (player.GetActiveItem(s) === ownType()) {
      if (player.GetActiveCharge(s) < newCharge) {
        chargeEffect(player.Position);
      }
      player.SetActiveCharge(newCharge, s);
    }
  }
}
