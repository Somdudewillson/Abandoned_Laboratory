import { CollectibleTypeLabUpgrade } from "../../../../constants";

const BASE_DAMAGE: int = 20;

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_NECROVORTEX as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  let damageMult: float = 1;
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_MISSING_PAGE_2)) {
    damageMult++;
  }
  if (player.HasTrinket(TrinketType.TRINKET_MISSING_PAGE)) {
    damageMult++;
  }

  const entities = Game().GetRoom().GetEntities();
  for (let i = 0; i < entities.Size; i++) {
    const entity = entities.Get(i);
    if (entity == null) {
      continue;
    }

    if (!entity.IsActiveEnemy(false)) {
      continue;
    }
    if (entity.IsInvincible()) {
      continue;
    }

    entity.TakeDamage(BASE_DAMAGE * damageMult, 0, EntityRef(player), 0);
  }

  return true;
}
