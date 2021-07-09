import { shuffleArray } from "../../utils/extMath";

const enum CyberGhostAnimKey {
  IDLE = "Idle",
  EXPLODE = "Explode",
}

const BASE_DEATH_DAMAGE = 5;
const PROPORTIONAL_DEATH_DAMAGE = 0.08;

const SEEK_RANGE = 150;
const SEEK_SPEED = 1.5;

export function update(self: EntityEffect): void {
  const sprite = self.GetSprite();

  doSeek(self);
  if (sprite.IsFinished(CyberGhostAnimKey.EXPLODE)) {
    doDie(self);
  }
}

function doDie(self: EntityEffect): void {
  const scaledSize = Math.min(self.Size, 2);
  for (let p = 0; p < Game().GetNumPlayers(); p++) {
    const player = Isaac.GetPlayer(p);
    if (player === null) {
      continue;
    }

    if (
      player.Position.DistanceSquared(self.Position) <=
      (scaledSize * 100) ** 2
    ) {
      // Isaac.DebugString("Attempted to intercept damage");
      player.TakeDamage(0, DamageFlag.DAMAGE_FAKE, EntityRef(self), 0);
    }
  }

  Game().BombExplosionEffects(
    self.Position,
    BASE_DEATH_DAMAGE + self.CollisionDamage / PROPORTIONAL_DEATH_DAMAGE,
    TearFlags.TEAR_NORMAL,
    Color(1, 1, 1, 0.4, 0.746, 0.746, 0.461),
    self,
    scaledSize,
    true,
    false,
  );

  self.Remove();
}

function doSeek(self: EntityEffect): void {
  let hasTarget = false;
  let targetPos = Vector.Zero;
  let targetCount = 0;

  const nearEntities = Isaac.FindInRadius(self.Position, SEEK_RANGE);
  for (const entity of nearEntities) {
    if (!entity.IsActiveEnemy(false)) {
      continue;
    }

    targetPos = targetPos.add(entity.Position);
    targetCount++;
  }

  if (targetCount <= 0) {
    if (self.Target === null) {
      const entities = Isaac.GetRoomEntities();
      shuffleArray(entities, self.GetDropRNG());
      for (const entity of entities) {
        if (!entity.IsActiveEnemy(false)) {
          continue;
        }

        self.Target = entity;
        targetPos = entity.Position;
        hasTarget = true;
        break;
      }
    } else {
      targetPos = self.Target.Position;
      hasTarget = true;
    }
  } else {
    self.Target = null;
    targetPos = targetPos.div(targetCount);
    hasTarget = true;
  }

  if (hasTarget) {
    self.Velocity = targetPos.sub(self.Position).Resized(SEEK_SPEED);
  } else {
    self.Velocity = self.Velocity.mul(Vector(0.75, 0.75));
  }
}
