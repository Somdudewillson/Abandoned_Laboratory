import { CollectibleTypeLab } from "../../../constants";
import { chargeEffect } from "../../../utils";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_CRIMSONKEY as number;
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

export function postRoom(): void {
  if (Game().GetRoom().GetType() !== RoomType.ROOM_ERROR) {
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

    for (let s = 0; s < ActiveSlot.SLOT_POCKET2; s++) {
      if (player.GetActiveItem(s) === ownType()) {
        player.FullCharge(s, true);
        chargeEffect(player.Position);
        return;
      }
    }
  }
}
