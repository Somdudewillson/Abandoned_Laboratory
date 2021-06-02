import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { randRound } from "../../../../extMath";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_WEBBEDVORTEX as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const entities = Game().GetRoom().GetEntities();
  for (let i = 0; i < entities.Size; i++) {
    const entity = entities.Get(i);
    if (entity == null) {
      continue;
    }

    if (!entity.IsActiveEnemy(false)) {
      continue;
    }

    entity.TakeDamage(25 + player.Damage, 0, EntityRef(player), 0);
    entity.AddSlowing(
      EntityRef(player),
      4.5 * 30,
      7.5,
      Color(1, 1, 1, 1, 0.6, 0.5, 0.6),
    );

    if (entity.HasMortalDamage()) {
      for (let j = 0; j < randRound(entity.MaxHitPoints / 45, rand); j++) {
        player.AddBlueSpider(entity.Position);
      }
    }
  }

  return true;
}
