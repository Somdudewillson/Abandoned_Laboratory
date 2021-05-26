import { CollectibleTypeLab } from "../../../constants";
import { randomInt } from "../../../extMath";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_MICROTRANSACTION as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  if (player.GetNumCoins() <= 0) {
    return false;
  }
  const takenCoins = randomInt(rand, 1, math.min(player.GetNumCoins(), 5));
  player.AddCoins(-takenCoins);
  const flatDamage = 20 + (takenCoins - 1) * 5;
  const playerDamageMult = 2 + (takenCoins - 1) * 0.5;

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
      player.Damage * playerDamageMult + flatDamage,
      0,
      EntityRef(player),
      0,
    );
    entity.SetColor(Color(0.938, 0.835, 0.145), takenCoins * 15, 0, true);
  }

  if (takenCoins === 5 && rand.RandomFloat() < 0.025) {
    player.UsePill(
      PillEffect.PILLEFFECT_LUCK_UP,
      PillColor.PILL_WHITE_WHITE,
      UseFlag.USE_NOANIM | UseFlag.USE_NOANNOUNCER,
    );
  }

  return true;
}
