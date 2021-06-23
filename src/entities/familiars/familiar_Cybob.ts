import {
  LabTearEntityVariant,
  TearEntitySubtype,
} from "../../callbacks/handler_TearEvents";
import { cardinalizedDirection } from "../../utils/extMath";
import { checkLine, directionToVector } from "../../utils/utils";

const enum CybobAnimKey {
  FLY_RIGHT = "FlyRight",
  FLY_LEFT = "FlyLeft",
  FLY_DOWN = "FlyDown",
  FLY_UP = "FlyUp",

  FIRE_RIGHT = "FireRight",
  FIRE_LEFT = "FireLeft",
  FIRE_DOWN = "FireDown",
  FIRE_UP = FLY_UP,
}

const ACCEL = 2;
const SPEED = 15;

const FOLLOWDIST = 75;
const MINFOLLOWDIST = FOLLOWDIST * 0.6;
const MAXFOLLOWDIST = FOLLOWDIST * 1.8;

export function update(self: EntityFamiliar): void {
  const hasBFF = self.Player.HasCollectible(CollectibleType.COLLECTIBLE_BFFS);
  const sprite = self.GetSprite();
  self.GridCollisionClass = EntityGridCollisionClass.GRIDCOLL_WALLS;

  // Update Target
  updateTarget(self, Game().GetRoom());

  // ---Motion Planning---
  const parentDistSq =
    self.Parent == null
      ? 0
      : self.Position.DistanceSquared(self.Parent.Position);
  let targetPos = self.Position;
  let toTargetDirection = Direction.NO_DIRECTION;
  if (
    self.Parent != null &&
    (parentDistSq > MAXFOLLOWDIST ** 2 || parentDistSq < MINFOLLOWDIST ** 2)
  ) {
    targetPos = self.Position.sub(self.Parent.Position)
      .Resized(FOLLOWDIST)
      .add(self.Parent.Position);
    toTargetDirection = cardinalizedDirection(targetPos.sub(self.Position));
  }
  if (self.Target != null) {
    toTargetDirection = cardinalizedDirection(
      self.Target.Position.sub(self.Position),
    );
  }

  // -- Motion Action ---
  const currentFrame = sprite.GetFrame();
  // Face Target
  switch (toTargetDirection) {
    default:
      break;
    case Direction.RIGHT:
      sprite.Play(
        self.State === 0 ? CybobAnimKey.FIRE_RIGHT : CybobAnimKey.FLY_RIGHT,
        true,
      );
      break;
    case Direction.LEFT:
      sprite.Play(
        self.State === 0 ? CybobAnimKey.FIRE_LEFT : CybobAnimKey.FLY_LEFT,
        true,
      );
      break;
    case Direction.DOWN:
      sprite.Play(
        self.State === 0 ? CybobAnimKey.FIRE_DOWN : CybobAnimKey.FLY_DOWN,
        true,
      );
      break;
    case Direction.UP:
      sprite.Play(
        self.State === 0 ? CybobAnimKey.FIRE_UP : CybobAnimKey.FLY_UP,
        true,
      );
      break;
  }
  sprite.SetFrame(currentFrame);

  // Move toward Target
  const toTarget = targetPos.sub(self.Position.add(self.Velocity));
  if (toTarget.LengthSquared() > ACCEL ** 2) {
    self.AddVelocity(toTarget.Resized(ACCEL));
  } else {
    self.AddVelocity(toTarget);
  }

  if (self.Velocity.LengthSquared() > SPEED ** 2) {
    self.Velocity = self.Velocity.Resized(SPEED);
  }

  // Attack
  if (self.Target != null && self.FireCooldown <= 0 && self.State > 0) {
    const newProjectile = Isaac.Spawn(
      EntityType.ENTITY_TEAR,
      LabTearEntityVariant,
      TearEntitySubtype.MINI_MISSILE,
      self.Position,
      directionToVector(toTargetDirection),
      self,
    ).ToTear()!;
    newProjectile.Parent = self.Parent;
    newProjectile.Target = self.Target;
    newProjectile.Height = -30;
    newProjectile.CollisionDamage = hasBFF ? 12 : 4;

    if (self.State === 2) {
      self.FireCooldown = 3;
      self.State = 1;
    } else {
      self.FireCooldown = hasBFF ? 20 : 30;
      self.State = 0;
    }

    self.AddVelocity(directionToVector(toTargetDirection).mul(Vector(-4, -4)));
  }

  // Attack cooldown
  if (self.FireCooldown > 0) {
    self.FireCooldown--;
  } else if (self.State <= 0) {
    self.State = 2;
  }
}

function updateTarget(self: EntityFamiliar, room: Room): void {
  if (self.Target == null || self.Target.IsDead()) {
    const entities = Isaac.GetRoomEntities();
    for (const entity of entities) {
      if (!entity.IsActiveEnemy(false)) {
        continue;
      }
      if (!entity.IsVulnerableEnemy()) {
        continue;
      }
      if (entity.IsInvincible()) {
        continue;
      }

      if (
        !checkLine(
          room,
          self.Position,
          entity.Position,
          LineCheckMode.PROJECTILE,
        ).clear
      ) {
        continue;
      }

      self.Target = entity;
      break;
    }
  } else if (self.Target != null && Isaac.GetFrameCount() % 6 === 0) {
    if (
      !checkLine(
        room,
        self.Position,
        self.Target.Position,
        LineCheckMode.PROJECTILE,
      ).clear
    ) {
      self.Target = null;
    }
  }
}
