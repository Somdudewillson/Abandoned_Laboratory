import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { spawnPickup } from "../../../../utils/utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_GOLDENSHARPKEY as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  if (player.GetNumKeys() < 1) {
    return false;
  }
  player.UseActiveItem(CollectibleType.COLLECTIBLE_SHARP_KEY);

  return true;
}

export function postDeath(
  npc: EntityNPC,
  _player: EntityPlayer,
  _slot: ActiveSlot,
  _room: Room,
  _level: Level,
): void {
  if (
    !npc.IsEnemy() ||
    npc.HasEntityFlags(EntityFlag.FLAG_NO_TARGET) ||
    npc.HasEntityFlags(EntityFlag.FLAG_NO_REWARD)
  ) {
    return;
  }

  if (npc.GetDropRNG().RandomFloat() < 0.2) {
    spawnPickup(
      npc.Position,
      npc.GetDropRNG(),
      PickupVariant.PICKUP_KEY,
      KeySubType.KEY_NORMAL,
    );
  }
}
