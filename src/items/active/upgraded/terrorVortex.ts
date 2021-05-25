import { CollectibleTypeLab } from "../../../constants";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_TERRORVORTEX as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
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

    entity.TakeDamage(10 + player.Damage, 0, EntityRef(player), 0);
    entity.AddFear(EntityRef(player), 5 * 30);
  }

  return true;
}
