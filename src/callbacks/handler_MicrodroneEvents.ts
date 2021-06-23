import * as extMath from "../utils/extMath";
import { directionToVector } from "../utils/utils";

export const MICRODRONE_ENTITYTYPE = 18;

export const enum MicrodroneEntityVariant {
  ATTACK_DRONE = 27,
  BARRIER_DRONE = 28,
  NANO_DRONE = 29,
  PREDICTOR_DRONE = 30,
}

const enum BarrierDroneAnimKey {
  FLY = "Fly",
  FLY_SHIELD = "FlyShielded",
  DIE = "Die",
  APPEAR = "Appear",
}

const enum PredictorDroneAnimKey {
  FLY = "Fly",
  TELEPORT_BEGIN = "BeginTeleport",
  TELEPORT_END = "EndTeleport",
  DIE = "Die",
  APPEAR = "Appear",
}

export function update(self: EntityNPC): boolean | null {
  switch (self.Variant) {
    default:
    case MicrodroneEntityVariant.ATTACK_DRONE:
    case MicrodroneEntityVariant.NANO_DRONE:
      return null;
    case MicrodroneEntityVariant.BARRIER_DRONE:
      return updateBarrierDrone(self);
    case MicrodroneEntityVariant.PREDICTOR_DRONE:
      return updatePredictorDrone(self);
  }
}

function updateBarrierDrone(self: EntityNPC): boolean | null {
  // Animation update
  const sprite = self.GetSprite();
  if (
    !sprite.IsPlaying(BarrierDroneAnimKey.FLY) &&
    !sprite.IsPlaying(BarrierDroneAnimKey.FLY_SHIELD)
  ) {
    sprite.Play(BarrierDroneAnimKey.FLY, true);
  }

  const nearTears = Isaac.FindInRadius(
    self.Position,
    100,
    EntityPartition.TEAR,
  );
  let nearestTear = null;
  let nearestDist = 0;
  for (const tear of nearTears) {
    const tearDist = self.Position.DistanceSquared(tear.Position);
    const playerDist = tear.Parent!.Position.DistanceSquared(tear.Position);

    if (
      (nearestTear == null || tearDist < nearestDist) &&
      playerDist > 75 * 75
    ) {
      nearestTear = tear;
      nearestDist = tearDist;
    }
  }

  if (nearestTear != null) {
    // Chase tears
    const futureTearPos = nearestTear.Position.add(
      nearestTear.Velocity.mul(Vector(3, 3)),
    );

    self.Velocity = futureTearPos.sub(self.Position).Resized(5);
  } else {
    const nearPlayer = Game().GetNearestPlayer(self.Position);
    const playerPos = nearPlayer.Position.add(
      Vector(
        nearPlayer.GetLastDirection().X * 200,
        nearPlayer.GetLastDirection().Y * 200,
      ),
    );
    const playerDist = self.Position.DistanceSquared(playerPos);

    if (playerDist > 25 * 25) {
      self.AddVelocity(playerPos.sub(self.Position).Resized(0.15));
    } else if (playerDist < 75 * 75) {
      self.AddVelocity(self.Position.sub(playerPos).Resized(0.15));
    } else {
      // Loose orbit movement
      if (self.GetData().orbitDir == null) {
        self.GetData().orbitDir = 90;
      }
      if (self.GetDropRNG().RandomFloat() < 0.01) {
        (self.GetData().orbitDir as number) *= -1;
      }

      self.AddVelocity(
        playerPos
          .sub(self.Position)
          .Resized(0.01)
          .Rotated(self.GetData().orbitDir as number),
      );
    }
  }

  // Update timeout
  const curTimeout = self.GetData().timeout as number | null;
  if (curTimeout != null && curTimeout > 0) {
    self.GetData().timeout = curTimeout - 1;
    if (curTimeout - 1 <= 0) {
      sprite.Play(BarrierDroneAnimKey.FLY, true);
    }
  }
  return true;
}

function updatePredictorDrone(self: EntityNPC): boolean | null {
  const sprite = self.GetSprite();
  if (
    sprite.GetAnimation() === PredictorDroneAnimKey.APPEAR &&
    sprite.IsFinished(PredictorDroneAnimKey.APPEAR)
  ) {
    sprite.Play(PredictorDroneAnimKey.FLY, true);
  }
  const isMoving = sprite.IsPlaying(PredictorDroneAnimKey.FLY);
  const targetPlayer = Game().GetNearestPlayer(self.Position);

  if (isMoving) {
    // Normal motion

    const posDiff = Vector(
      self.Position.X - targetPlayer.Position.X,
      self.Position.Y - targetPlayer.Position.Y,
    );
    if (Math.abs(posDiff.X) <= 10 && Math.abs(posDiff.Y) <= 10) {
      // If we're really close
      self.AddVelocity(targetPlayer.Position.sub(self.Position).Resized(0.1));
    } else if (
      Math.abs(posDiff.Y) <= 10 ||
      (Math.abs(posDiff.X) < Math.abs(posDiff.Y) && Math.abs(posDiff.X) > 10)
    ) {
      // Move along X
      self.Velocity = Vector(extMath.sign(-posDiff.X) * 2.5, 0);
    } else {
      // Move along Y
      self.Velocity = Vector(0, extMath.sign(-posDiff.Y) * 2.5);
    }
  } else {
    // Teleportation mini-state-machine
    self.Velocity = Vector.Zero;

    if (sprite.IsPlaying(PredictorDroneAnimKey.TELEPORT_BEGIN)) {
      const oldAvg = self.GetData().avgVector as Vector | null;
      if (oldAvg == null) {
        self.GetData().avgVector = Vector(
          targetPlayer.Velocity.X,
          targetPlayer.Velocity.Y,
        );
      } else {
        self.GetData().avgVector = Vector(
          (oldAvg.X * (10 - 1) + targetPlayer.Velocity.X) / 10,
          (oldAvg.Y * (10 - 1) + targetPlayer.Velocity.Y) / 10,
        );
      }
    } else if (sprite.IsFinished(PredictorDroneAnimKey.TELEPORT_BEGIN)) {
      let targetShift = (self.GetData().avgVector as Vector).mul(
        Vector(13 + 20, 13 + 20),
      );
      if (targetShift.LengthSquared() < 50 * 50) {
        targetShift = targetShift.add(
          directionToVector(targetPlayer.GetHeadDirection()).mul(
            Vector(50, 50),
          ),
        );
      }

      self.Position = Game()
        .GetRoom()
        .GetClampedPosition(targetPlayer.Position.add(targetShift), 7);

      sprite.Play(PredictorDroneAnimKey.TELEPORT_END, true);
      self.GetData().avgVector = null;
    } else if (sprite.IsFinished(PredictorDroneAnimKey.TELEPORT_END)) {
      sprite.Play(PredictorDroneAnimKey.FLY, true);

      self.GetData().timeout =
        30 * 2 + Math.round(self.GetDropRNG().RandomFloat() * 15);
    }
  }

  // Update timeout
  const curTimeout = self.GetData().timeout as number | null;
  if (curTimeout != null && curTimeout > 0) {
    self.GetData().timeout = curTimeout - 1;
    if (curTimeout - 1 <= 0 && isMoving) {
      sprite.Play(PredictorDroneAnimKey.TELEPORT_BEGIN, true);
    }
  } else if (curTimeout == null) {
    self.GetData().timeout =
      30 * 2 + Math.round(self.GetDropRNG().RandomFloat() * 30);
  }
  return true;
}

export function interceptDamage(
  tookDamage: Entity,
  _damageAmount: float,
  _damageFlags: int,
  _damageSource: EntityRef,
  _damageCountdownFrames: int,
): boolean | null {
  if (tookDamage.Variant !== MicrodroneEntityVariant.BARRIER_DRONE) {
    return null;
  }

  const curTimeout = tookDamage.GetData().timeout as number | null;
  if (curTimeout != null && curTimeout > 0) {
    return false;
  }

  tookDamage.GetData().timeout = 36;
  tookDamage.GetSprite().Play(BarrierDroneAnimKey.FLY_SHIELD, true);
  return null;
}
