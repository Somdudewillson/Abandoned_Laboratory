import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { chargeEffect } from "../../../../utils/utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_CRIMSONKEY as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  if (Game().GetRoom().GetType() === RoomType.ROOM_ERROR) {
    player.UseCard(
      Card.CARD_FOOL,
      UseFlag.USE_NOANIM | UseFlag.USE_NOANNOUNCER,
    );
  } else {
    player.UseCard(
      Card.CARD_SOUL_CAIN,
      UseFlag.USE_NOANIM | UseFlag.USE_NOANNOUNCER,
    );
  }

  return true;
}

export function postRoom(
  player: EntityPlayer,
  slot: ActiveSlot,
  room: Room,
  _level: Level,
): void {
  if (room.GetType() !== RoomType.ROOM_ERROR) {
    return;
  }

  player.FullCharge(slot, true);
  chargeEffect(player.Position);
}
