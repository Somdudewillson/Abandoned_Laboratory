import { CollectibleTypeLabUpgrade } from "../../../../constants";
import * as SaveUtil from "../../../../saveData";
import { SaveType } from "../../../../saveData";
import { numberOfSetBits } from "../../../../utils/extMath";
import { chargeEffect } from "../../../../utils/utils";

const KEY_VISITED_ROOMS = "artificial_soul_visited";
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
    KEY_VISITED_ROOMS,
    [],
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

  if (!player.HasCollectible(ownType())) {
    return;
  }
  if (SaveUtil.getPlayerData(EntityRef(player), SaveType.PER_FLOOR, KEY_USED)) {
    return;
  }

  // Isaac.DebugString(`Current room index:${level.GetCurrentRoomIndex()}`);
  let visitedRoomData = SaveUtil.getPlayerData(
    EntityRef(player),
    SaveType.PER_FLOOR,
    KEY_VISITED_ROOMS,
  ) as int[] | null;
  if (visitedRoomData == null) {
    // Initialize array if null
    SaveUtil.savePlayerData(
      EntityRef(player),
      SaveType.PER_FLOOR,
      KEY_VISITED_ROOMS,
      [0, 0, 0],
    );

    visitedRoomData = SaveUtil.getPlayerData(
      EntityRef(player),
      SaveType.PER_FLOOR,
      KEY_VISITED_ROOMS,
    ) as int[];
  }
  const currentRoomIndex = level.GetCurrentRoomIndex();
  if (currentRoomIndex < 64) {
    visitedRoomData[0] |= 1 << currentRoomIndex;
  } else if (currentRoomIndex < 128) {
    visitedRoomData[1] |= 1 << (currentRoomIndex - 64);
  } else {
    visitedRoomData[2] |= 1 << (currentRoomIndex - 128);
  }

  const visitedUniqueRooms =
    numberOfSetBits(visitedRoomData[0]) +
    numberOfSetBits(visitedRoomData[1]) +
    numberOfSetBits(visitedRoomData[2]);

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
