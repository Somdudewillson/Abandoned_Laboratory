import { CollectibleTypeLab } from "../../../constants";
import { chargeEffect } from "../../../utils";

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

  player.GetData().visitedRooms = [];

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
    const visitedRoomData = player.GetData().visitedRooms as Record<
      string,
      boolean
    > | null;
    if (visitedRoomData == null) {
      player.GetData().visitedRooms = [false];
    }
    (player.GetData().visitedRooms as Record<string, boolean>)[
      level.GetCurrentRoomIndex().toString()
    ] = true;

    let visitedUniqueRooms = 0;
    for (const visited of Object.values(
      player.GetData().visitedRooms as Record<string, boolean>,
    )) {
      if (visited) {
        visitedUniqueRooms++;
      }
    }

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
