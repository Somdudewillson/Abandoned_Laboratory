import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_TOXICVAT as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const newPool = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    EffectVariant.PLAYER_CREEP_LEMON_PARTY,
    0,
    player.Position,
    Vector.Zero,
    player,
  );
  newPool.SetColor(Color(0.605, 0.739, 0), -1, 1);
  newPool.CollisionDamage = Math.max(player.Damage, 2) * 8;

  return true;
}
