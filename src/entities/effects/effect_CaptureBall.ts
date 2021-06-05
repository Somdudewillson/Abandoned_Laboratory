/** Entity Data Usage:
 * State = ActiveSlot this was thrown from
 * Size = Ball type:
 *  0: empty
 *  1: newly caught
 *  2: queued release
 */

import { getPlayerData, savePlayerData, SaveType } from "../../saveData";

const enum TimeoutBallSize {
  EMPTY = 0,
  NEW_CATCH = 1,
  RELEASE = 2,
}

export const CAPTURED_ENTITY_SAVE_KEY = "capture_ball_captured";

const FRICTION_EMPTY = 0.96;
const FRICTION_FULL = 0.9;

const MAX_SPEED = 20;
const MAX_HEIGHT = 25;
const GROUND_FRAC = 0.4;
const ANIM_SPEED_MULT = 2;

const COLLISION_RADIUS = 15;

export function update(self: EntityEffect): void {
  const sprite = self.GetSprite();
  const currentAngle = self.Velocity.GetAngleDegrees();
  // Apply friction
  const friction =
    self.Size === TimeoutBallSize.EMPTY ? FRICTION_EMPTY : FRICTION_FULL;
  self.Velocity = self.Velocity.mul(Vector(friction, friction));

  if (self.Velocity.LengthSquared() < 0.5 || checkWallCollision(self)) {
    self.Velocity = Vector.Zero;
    if (self.Size === TimeoutBallSize.RELEASE) {
      doRelease(self);
    } else {
      checkPlayerCollision(self);
    }
  } else {
    // Update sprite angle
    sprite.Rotation = currentAngle - 90;

    // Capture enemy
    if (self.Size === TimeoutBallSize.EMPTY) {
      checkEnemyCollision(self);
    }
  }

  // Update sprite speed & height
  const speedFrac = self.Velocity.Length() / MAX_SPEED;
  sprite.PlaybackSpeed = speedFrac * ANIM_SPEED_MULT;
  sprite.Offset = Vector(
    0,
    Math.min(-MAX_HEIGHT * (speedFrac - GROUND_FRAC), 0),
  );
}

function checkPlayerCollision(self: EntityEffect): void {
  if (
    self.SpawnerEntity != null &&
    self.SpawnerEntity.Position.DistanceSquared(self.Position) <
      COLLISION_RADIUS ** 2
  ) {
    self.SpawnerEntity.ToPlayer()!.SetActiveCharge(3, self.State);
    self.Remove();
  }
}

function checkWallCollision(self: EntityEffect): boolean {
  const clampedPos = Game().GetRoom().GetClampedPosition(self.Position, 10);
  if (clampedPos.DistanceSquared(self.Position) > 0.1) {
    self.Position = clampedPos;
    return true;
  }

  return false;
}

function checkEnemyCollision(self: EntityEffect): void {
  const entities = Isaac.FindInRadius(self.Position, COLLISION_RADIUS * 3);
  for (const entity of entities) {
    if (!entity.IsActiveEnemy(false)) {
      continue;
    }
    if (entity.IsBoss()) {
      continue;
    }
    if (entity.HasEntityFlags(EntityFlag.FLAG_FRIENDLY)) {
      continue;
    }

    saveCapturedEntity(self, entity.ToNPC()!);
    entity.Remove();
    self.Size = TimeoutBallSize.NEW_CATCH;
    return;
  }
}

function doRelease(self: EntityEffect): void {
  const entityData = getCapturedEntity(self);
  const newFriend = Isaac.Spawn(
    entityData.type,
    entityData.variant,
    entityData.subtype,
    self.Position,
    Vector.Zero,
    self.SpawnerEntity,
  );
  newFriend.AddCharmed(EntityRef(self.SpawnerEntity!), -1);
  newFriend.AddEntityFlags(EntityFlag.FLAG_PERSISTENT);

  self.Remove();
}

function saveCapturedEntity(self: EntityEffect, target: EntityNPC): void {
  savePlayerData(
    EntityRef(self.SpawnerEntity!),
    SaveType.PER_RUN,
    CAPTURED_ENTITY_SAVE_KEY,
    [
      target.Type,
      target.Variant,
      target.SubType,
      target.IsChampion() ? target.GetChampionColorIdx() : -1,
    ],
  );
}

function getCapturedEntity(self: EntityEffect): {
  type: int;
  variant: int;
  subtype: int;
  champion: int;
} {
  const savedEntityData = getPlayerData(
    EntityRef(self.SpawnerEntity!),
    SaveType.PER_RUN,
    CAPTURED_ENTITY_SAVE_KEY,
  ) as number[] | null;

  savePlayerData(
    EntityRef(self.SpawnerEntity!),
    SaveType.PER_RUN,
    CAPTURED_ENTITY_SAVE_KEY,
    null,
  );

  if (savedEntityData == null || savedEntityData.length < 4) {
    return {
      type: EntityType.ENTITY_FLY,
      variant: 0,
      subtype: 0,
      champion: -1,
    };
  }
  return {
    type: savedEntityData[0],
    variant: savedEntityData[1],
    subtype: savedEntityData[2],
    champion: savedEntityData[3],
  };
}
