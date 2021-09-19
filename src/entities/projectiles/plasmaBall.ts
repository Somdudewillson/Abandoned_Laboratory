import {
  EffectEntitySubtype,
  LabEffectEntityVariant,
} from "../../callbacks/handler_EffectEvents";
import { isFriendly } from "../../utils/utils";

export function collide(
  self: EntityProjectile,
  other: Entity,
  _low: boolean,
): boolean | void {
  if (self.EntityCollisionClass === EntityCollisionClass.ENTCOLL_NONE) {
    return;
  }

  const amIFriendly =
    self.SpawnerEntity === undefined ? false : isFriendly(self.SpawnerEntity);
  const isValidTarget = other.IsActiveEnemy(false) === amIFriendly;

  if (isValidTarget) {
    other.TakeDamage(self.Damage, 0, EntityRef(self.SpawnerEntity), 0);
    die(self);
  }

  return true;
}

export function die(self: EntityProjectile): void {
  self.Remove();

  const newSplashFX = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    LabEffectEntityVariant,
    EffectEntitySubtype.PLASMABURST,
    self.Position.add(self.PositionOffset),
    Vector.Zero,
    self,
  ).ToEffect()!;
  newSplashFX.Size = self.Size;
  newSplashFX.SpriteScale = self.SpriteScale;
  newSplashFX.FlipX = self.FlipX;
  newSplashFX.SetColor(Color(1, 1, 1, 0.667), 99, 99);
}
