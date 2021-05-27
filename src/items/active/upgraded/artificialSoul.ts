import { CollectibleTypeLab } from "../../../constants";
import * as SaveUtil from "../../../saveData";
import { SaveType } from "../../../saveData";
import { chargeEffect } from "../../../utils";

const DATA_KEY = "artificial_soul_visited";

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

  SaveUtil.savePlayerData(player.Index, SaveType.PER_FLOOR, DATA_KEY, []);

  return true;
}

export function postRoom(): void {
  const room = Game().GetRoom();
  const level = Game().GetLevel();
  if (room.GetType() === RoomType.ROOM_ERROR) {
    return;
  }

  for (let p = 0; p < Game().GetNumPlayers(); p++) {
    const player = Isaac.GetPlayer(p);
    if (player == null) {
      continue;
    }
    if (!player.HasCollectible(ownType())) {
      continue;
    }

    Isaac.DebugString(`Current room index:${level.GetCurrentRoomIndex()}`);
    let visitedRoomData = SaveUtil.getPlayerData(
      player.Index,
      SaveType.PER_FLOOR,
      DATA_KEY,
    ) as int[] | null;
    if (visitedRoomData == null) {
      SaveUtil.savePlayerData(player.Index, SaveType.PER_FLOOR, DATA_KEY, []);

      visitedRoomData = SaveUtil.getPlayerData(
        player.Index,
        SaveType.PER_FLOOR,
        DATA_KEY,
      ) as int[];
    }
    if (visitedRoomData.indexOf(level.GetCurrentRoomIndex()) === -1) {
      visitedRoomData.push(level.GetCurrentRoomIndex());
    }

    const visitedUniqueRooms = visitedRoomData.length;

    Isaac.DebugString(
      `Unique rooms visited:${visitedUniqueRooms}/${level.GetRoomCount()}`,
    );
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
}
