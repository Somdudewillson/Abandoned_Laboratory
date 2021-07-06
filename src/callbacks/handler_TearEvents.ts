import * as TEAR_MINIMISSILE from "../entities/tears/tear_MiniMissile";

export const LabTearEntityVariant = 3468;

export const enum TearEntitySubtype {
  MINI_MISSILE = 78,
}

export function init(projectile: EntityTear): void {
  switch (projectile.SubType) {
    default:
    case TearEntitySubtype.MINI_MISSILE: {
      const sprite = projectile.GetSprite();

      if (sprite.GetAnimation().length < 1) {
        sprite.Play(sprite.GetDefaultAnimationName(), true);
        sprite.PlaybackSpeed = 1;
      }
      break;
    }
  }
}

export function update(projectile: EntityTear): void {
  switch (projectile.SubType) {
    default:
      break;
    case TearEntitySubtype.MINI_MISSILE:
      TEAR_MINIMISSILE.update(projectile);
      break;
  }
}

export function collide(
  projectile: EntityTear,
  collider: Entity,
  low: boolean,
): boolean | void {
  switch (projectile.SubType) {
    default:
    case TearEntitySubtype.MINI_MISSILE:
      return TEAR_MINIMISSILE.collide(projectile, collider, low);
  }
}
