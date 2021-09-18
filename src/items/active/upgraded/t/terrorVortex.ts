import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_TERRORVORTEX as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const entities = Isaac.GetRoomEntities();
  for (const entity of entities) {
    if (entity === undefined) {
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
