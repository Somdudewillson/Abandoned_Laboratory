import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { chargeEffect } from "../../../../utils/utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_ZKEY as number;
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

export function tick(
  player: EntityPlayer,
  slot: ActiveSlot,
  room: Room,
  _level: Level,
): void {
  if (room.IsClear()) {
    return;
  }

  if (player.GetActiveCharge(slot) < 300) {
    if (player.GetActiveCharge(slot) === 299) {
      chargeEffect(player.Position);
    }
    player.SetActiveCharge(player.GetActiveCharge(slot) + 1, slot);
  }
}

export function postRoom(
  player: EntityPlayer,
  _room: Room,
  _level: Level,
): void {
  if (!player.HasCollectible(ownType())) {
    return;
  }

  const triggerSlot = player.GetData().zTriggered as number;
  if (triggerSlot != null || triggerSlot !== 0) {
    player.SetActiveCharge(0, triggerSlot - 1);
    player.GetData().zTriggered = 0;
  }
}
