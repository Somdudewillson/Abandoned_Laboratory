import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { spawnPickup } from "../../../../utils";

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

export function postDeath(dying: EntityNPC): void {
  if (
    !dying.IsEnemy() ||
    dying.HasEntityFlags(EntityFlag.FLAG_NO_TARGET) ||
    dying.HasEntityFlags(EntityFlag.FLAG_NO_REWARD)
  ) {
    return;
  }

  for (let s = 0; s < Game().GetNumPlayers(); s++) {
    const player = Isaac.GetPlayer(s);
    if (player == null) {
      return;
    }

    if (player.HasCollectible(ownType())) {
      if (dying.GetDropRNG().RandomFloat() < 0.2) {
        spawnPickup(
          dying.Position,
          dying.GetDropRNG(),
          PickupVariant.PICKUP_KEY,
          KeySubType.KEY_NORMAL,
        );
      }
      return;
    }
  }
}
