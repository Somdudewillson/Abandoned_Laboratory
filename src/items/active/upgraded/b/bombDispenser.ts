import { CollectibleTypeLab } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_BOMBDISPENSER as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  const newBomb: EntityBomb = Isaac.Spawn(
    EntityType.ENTITY_BOMBDROP,
    BombVariant.BOMB_MR_MEGA,
    BombSubType.BOMB_NORMAL,
    player.Position,
    Vector.Zero,
    player,
  ).ToBomb()!;
  newBomb.AddTearFlags(player.GetBombFlags());
  newBomb.SetColor(Color(0.7, 0.435, 0.179), -1, 1, false, false);

  if (player.HasCollectible(CollectibleType.COLLECTIBLE_MR_MEGA)) {
    newBomb.ExplosionDamage *= 2.7;
  } else {
    newBomb.ExplosionDamage *= 1.85;
  }

  return true;
}
