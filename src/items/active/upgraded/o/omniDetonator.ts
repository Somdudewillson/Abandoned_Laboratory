import {
  CollectibleTypeLabUpgrade,
  SHOT_SPEED_MULT,
} from "../../../../constants";

const TEAR_COUNT: int = 6;
const FIRE_CONE: float = 360;
const TEAR_ANGLE_INTERVAL: float = FIRE_CONE / TEAR_COUNT;

const TEAR_COOLDOWN = 12 * 30;

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_OMNIDETONATOR as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const hasCarBattery = player.HasCollectible(
    CollectibleType.COLLECTIBLE_CAR_BATTERY,
  );
  const inCooldown = !(
    player.GetData().omniCooldown == null ||
    (player.GetData().omniCooldown as number) < Isaac.GetFrameCount()
  );

  const entities = Isaac.GetRoomEntities();
  for (const entity of entities) {
    if (entity == null) {
      continue;
    }

    if (
      ((entity.Type === EntityType.ENTITY_TEAR && !inCooldown) ||
        entity.Type === EntityType.ENTITY_BOMBDROP) &&
      entity.SpawnerEntity != null &&
      GetPtrHash(entity.SpawnerEntity) === GetPtrHash(player)
    ) {
      for (let i = 0; i < (hasCarBattery ? TEAR_COUNT * 2 : TEAR_COUNT); i++) {
        const fireDir = Vector(1, 0).Rotated(
          i * (hasCarBattery ? TEAR_ANGLE_INTERVAL / 2 : TEAR_ANGLE_INTERVAL),
        );
        fireDir.Resize(player.ShotSpeed * SHOT_SPEED_MULT);

        player.FireTear(entity.Position, fireDir, true, true, false, player);
      }

      if (entity.Type === EntityType.ENTITY_BOMBDROP) {
        entity.ToBomb()!.SetExplosionCountdown(-1);
      } else {
        entity.Remove();
      }
    }
  }
  if (!inCooldown) {
    player.GetData().omniCooldown = Isaac.GetFrameCount() + TEAR_COOLDOWN;
  }

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
