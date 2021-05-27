import { CollectibleTypeLab } from "../../../constants";
import { chargeEffect } from "../../../utils";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_ZKEY as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_GLOWING_HOUR_GLASS,
    UseFlag.USE_NOANIM | UseFlag.USE_NOCOSTUME,
  );
  player.GetData().zTriggered = ActiveSlot + 1;

  return true;
}

export function tick(): void {
  if (Game().GetRoom().IsClear()) {
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
      if (
        player.GetActiveItem(s) === ownType() &&
        player.GetActiveCharge(s) < 300
      ) {
        if (player.GetActiveCharge(s) === 299) {
          chargeEffect(player.Position);
        }
        player.SetActiveCharge(player.GetActiveCharge(s) + 1, s);
      }
    }
  }
}

export function postRoom(player: EntityPlayer): void {
  if (!player.HasCollectible(ownType())) {
    return;
  }

  const triggerSlot = player.GetData().zTriggered as number;
  if (triggerSlot !== 0) {
    player.SetActiveCharge(0, triggerSlot - 1);
    player.GetData().zTriggered = 0;
  }
}
