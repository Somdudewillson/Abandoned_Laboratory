import { playSound } from "../../utils";

export function update(self: EntityTear): void {
  const targetDir =
    self.Target == null
      ? self.Velocity
      : self.Target.Position.sub(self.Position);
  self.Velocity = targetDir.Resized(math.min(25, self.Velocity.Length() + 0.5));

  self.GetSprite().Rotation = targetDir.GetAngleDegrees();
  self.Height = -30;
}

export function collide(
  self: EntityTear,
  _other: Entity,
  _low: boolean,
): boolean | null {
  playSound(SoundEffect.SOUND_EXPLOSION_WEAK, 0.75);
  const newBomb = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    EffectVariant.BOMB_EXPLOSION,
    0,
    self.Position,
    Vector.Zero,
    null,
  ).ToEffect()!;
  newBomb.SpriteScale = Vector(0.4, 0.4);

  const entities = Isaac.FindInRadius(self.Position, 15, EntityPartition.ENEMY);
  for (const entity of entities) {
    entity.TakeDamage(
      self.CollisionDamage,
      DamageFlag.DAMAGE_EXPLOSION,
      EntityRef(self),
      0,
    );
  }

  self.Remove();
  return true;
}
