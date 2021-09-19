import * as PROJ_PLASMABALL from "../entities/projectiles/plasmaBall";
import { hasGridCollision } from "../utils/utils";

export const LabProjectileEntityVariant = 2490;

export const enum ProjectileEntitySubtype {
  PLASMA_BALL = 56,
}

export function init(projectile: EntityProjectile): void {
  switch (projectile.SubType) {
    default:
    case ProjectileEntitySubtype.PLASMA_BALL:
      genericInit(projectile);
      break;
  }
}

export function update(projectile: EntityProjectile): void {
  const hasCollision = hasGridCollision(projectile);
  switch (projectile.SubType) {
    case ProjectileEntitySubtype.PLASMA_BALL:
      if (hasCollision) {
        PROJ_PLASMABALL.die(projectile);
      }
      break;
    default:
  }
}

export function collide(
  projectile: EntityProjectile,
  collider: Entity,
  low: boolean,
): boolean | void {
  switch (projectile.SubType) {
    default:
    case ProjectileEntitySubtype.PLASMA_BALL:
      return PROJ_PLASMABALL.collide(projectile, collider, low);
  }
}

function genericInit(projectile: EntityProjectile) {
  const sprite = projectile.GetSprite();

  if (sprite.GetAnimation().length < 1) {
    sprite.Play(sprite.GetDefaultAnimationName(), true);
    sprite.PlaybackSpeed = 1;
  }
}
