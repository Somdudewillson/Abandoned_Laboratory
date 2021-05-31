import { CollectibleTypeLab } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_BOOSTEDBEAN as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_MEGA_BEAN,
    UseFlag.USE_NOANIM,
  );

  return true;
}

export function postBombInit(bomb: EntityBomb): void {
  if (
    bomb.Variant === BombVariant.BOMB_DECOY ||
    bomb.Variant === BombVariant.BOMB_TROLL ||
    bomb.Variant === BombVariant.BOMB_SUPERTROLL ||
    bomb.Variant === BombVariant.BOMB_THROWABLE
  ) {
    return;
  }
  const spawner = bomb.SpawnerEntity;
  if (
    spawner != null &&
    spawner.Type === EntityType.ENTITY_PLAYER &&
    spawner.ToPlayer()!.HasCollectible(ownType())
  ) {
    bomb.SetExplosionCountdown(30 * 60 * 60);
  }
}
