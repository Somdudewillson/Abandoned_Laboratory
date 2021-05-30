import { CollectibleTypeLab } from "../../../../constants";

const BASE_DAMAGE: int = 80;

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_BLOODSAW as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  let cost: int = player.HasCollectible(CollectibleType.COLLECTIBLE_WAFER)
    ? 1
    : 2;
  while (cost > 0) {
    if (player.GetRottenHearts() > 0) {
      player.AddRottenHearts(-1);
    } else if (player.GetHearts() > 0) {
      player.AddHearts(-1);
    } else if (player.GetSoulHearts() > 0) {
      player.AddSoulHearts(-1);
    } else if (player.GetBoneHearts() > 0) {
      player.AddBoneHearts(-1);
    }
    cost--;
  }
  player.TakeDamage(2, DamageFlag.DAMAGE_FAKE, EntityRef(player), 0);

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

    entity.TakeDamage(
      BASE_DAMAGE * damageMult,
      DamageFlag.DAMAGE_IGNORE_ARMOR,
      EntityRef(player),
      0,
    );
  }

  return true;
}
