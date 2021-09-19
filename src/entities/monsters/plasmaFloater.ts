import {
  LabProjectileEntityVariant,
  ProjectileEntitySubtype,
} from "../../callbacks/handler_ProjectileEvents";
import { isFriendly } from "../../utils/utils";

const enum AnimKeys {
  DOWN = "Down",
  L1 = "L1",
  L2 = "L2",
  LEFT = "Left",
  L3 = "L3",
  L4 = "L4",
  UP = "Up",
}

const SPEED = 2.5;
const APPROACH_DIST_SQ = 200 ** 2;

const SIDE_SPREAD = 25;

export function initPlasmaFloater(self: EntityNPC): void {
  self.ProjectileCooldown = 60;
}

export function updatePlasmaFloater(self: EntityNPC): boolean | void {
  let currentTarget = self.Target;
  const currentlyFriendly = isFriendly(self);

  if (currentTarget === undefined) {
    currentTarget = findNewTarget(currentlyFriendly, self.Position);
    self.Target = currentTarget;
  }
  if (currentTarget === undefined) {
    return true;
  }

  faceTarget(self.Position, currentTarget.Position, self.GetSprite());
  attemptApproach(self.Position, currentTarget.Position, self);
  attemptAttack(self.Position, currentTarget.Position, self);

  return true;
}

function findNewTarget(IAmFriendly: boolean, pos: Vector): Entity | undefined {
  let possibleTargets: Entity[];
  if (IAmFriendly) {
    possibleTargets = [];
    for (const entity of Isaac.GetRoomEntities()) {
      if (entity.IsActiveEnemy(false) && entity.IsVulnerableEnemy()) {
        possibleTargets.push(entity);
      }
    }
  } else {
    possibleTargets = Isaac.FindByType(EntityType.ENTITY_PLAYER);
  }

  let nearestTarget: Entity | undefined;
  let nearestDist = 0;
  for (const maybeTarget of possibleTargets) {
    const rayResult = Game()
      .GetRoom()
      .CheckLine(pos, maybeTarget.Position, LineCheckMode.PROJECTILE);
    if (rayResult[0]) {
      return maybeTarget;
    }

    const targetDistSq = pos.DistanceSquared(maybeTarget.Position);
    if (nearestTarget === undefined || targetDistSq < nearestDist) {
      nearestTarget = maybeTarget;
      nearestDist = targetDistSq;
    }
  }

  return nearestTarget;
}

function faceTarget(ownPos: Vector, targetPos: Vector, sprite: Sprite) {
  let desiredFacing = math.deg(
    Math.atan2(targetPos.X - ownPos.X, ownPos.Y - targetPos.Y),
  );
  desiredFacing = (desiredFacing + 180) % 360;
  let spriteFacing = Math.round(desiredFacing / 30);

  sprite.FlipX = false;
  if (spriteFacing > 6) {
    sprite.FlipX = true;
    spriteFacing = 6 - (spriteFacing - 6);
  }

  let chosenAnimKey = AnimKeys.DOWN;
  switch (spriteFacing) {
    case 0:
    default:
      break;
    case 1:
      chosenAnimKey = AnimKeys.L1;
      break;
    case 2:
      chosenAnimKey = AnimKeys.L2;
      break;
    case 3:
      chosenAnimKey = AnimKeys.LEFT;
      break;
    case 4:
      chosenAnimKey = AnimKeys.L3;
      break;
    case 5:
      chosenAnimKey = AnimKeys.L4;
      break;
    case 6:
      chosenAnimKey = AnimKeys.UP;
      break;
  }

  if (sprite.GetAnimation() === chosenAnimKey) {
    return;
  }
  const currentFrame = sprite.GetFrame();
  sprite.Play(chosenAnimKey, true);
  sprite.SetFrame(currentFrame);
}

function attemptApproach(ownPos: Vector, targetPos: Vector, self: EntityNPC) {
  const room = Game().GetRoom();
  const targetVec = targetPos.sub(ownPos);

  // We don't like being on rocks & such
  if (
    room.GetGridCollisionAtPos(ownPos) >= GridCollisionClass.COLLISION_SOLID
  ) {
    self.Velocity = targetVec.Resized(SPEED);
    self.V1 = Vector.Zero;
    return;
  }

  // If we have a clear path, just go straight there
  const losCheck = room.CheckLine(
    ownPos,
    room.GetClampedPosition(targetPos, self.Size + 1),
    LineCheckMode.PROJECTILE,
    self.Size - 1,
  );
  if (losCheck[0]) {
    if (targetVec.LengthSquared() > APPROACH_DIST_SQ) {
      self.Velocity = targetVec.Resized(SPEED);
      self.V1 = Vector.Zero;
      return;
    }
  } else {
    // If we have no clear path
    if (
      self.V1 === undefined ||
      self.V1.LengthSquared() === 0 ||
      ownPos.DistanceSquared(self.V1) < SPEED * 2
    ) {
      // Try to pick a new grid destination
      const currentIndex = room.GetGridIndex(ownPos);
      const roomWidth = room.GetGridWidth();

      const options = [
        currentIndex - 1,
        currentIndex + 1,
        currentIndex + roomWidth,
        currentIndex - roomWidth,
      ];
      const weights = [0, 0, 0, 0];

      // Build option weight array
      const curVelocity = self.Velocity;
      let weightSum = 0;
      let nearestIndex;
      let nearestDist = 0;
      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        if (
          room.GetGridCollision(option) >= GridCollisionClass.COLLISION_SOLID
        ) {
          continue;
        }

        const optionPos = room.GetGridPosition(option);
        const optionDist = optionPos.DistanceSquared(targetPos);
        if (nearestIndex === undefined || optionDist < nearestDist) {
          nearestIndex = i;
          nearestDist = optionDist;
        }

        let angleDiff = math.deg(
          math.abs(
            Math.atan2(optionPos.Y, optionPos.X) -
              Math.atan2(curVelocity.Y, curVelocity.X),
          ),
        );
        angleDiff = Math.round(angleDiff / 90);
        switch (angleDiff) {
          case 0:
            weights[i] = 6;
            weightSum += 6;
            break;
          case 1:
            weights[i] = 3;
            weightSum += 3;
            break;
          default:
            weights[i] = 1;
            weightSum += 1;
            break;
        }
      }

      // Apply nearest-to-target weight boost
      if (nearestIndex !== undefined) {
        weightSum -= weights[nearestIndex];
        weights[nearestIndex] = 15;
        weightSum += 15;
      }

      // Select weighted random
      self.V1 = targetPos;
      let rand = self.GetDropRNG().RandomFloat() * weightSum;
      for (let i = 0; i < options.length; i++) {
        if (rand < weights[i]) {
          self.V1 = room.GetGridPosition(options[i]);
          break;
        }
        rand -= weights[i];
      }
    }
    self.Velocity = self.V1.sub(ownPos).Resized(SPEED);
    return;
  }

  self.Velocity = self.Velocity.mul(0.95);
}

function attemptAttack(ownPos: Vector, targetPos: Vector, self: EntityNPC) {
  if (self.ProjectileCooldown > 0) {
    self.ProjectileCooldown--;

    if (self.ProjectileCooldown < 6) {
      self.SetColor(
        Color.Lerp(
          Color(1.3, 1.25, 1),
          Color.Default,
          self.ProjectileCooldown / 6,
        ),
        2,
        99,
      );
    }
    return;
  }

  const room = Game().GetRoom();
  const losCheck = room.CheckLine(
    ownPos,
    room.GetClampedPosition(targetPos, 3),
    LineCheckMode.PROJECTILE,
    3,
  );
  if (!losCheck[0]) {
    return;
  }

  const rng = self.GetDropRNG();

  const centerVec = targetPos.sub(ownPos).Normalized();
  const fireVec = centerVec.Rotated(rng.RandomFloat() * 20 - 10);

  firePlasma(
    self,
    self.Position.add(centerVec.mul(self.Size)),
    fireVec.mul(8.5),
    1,
    rng,
  );
  firePlasma(
    self,
    self.Position.add(centerVec.Rotated(SIDE_SPREAD).mul(self.Size)),
    fireVec.Rotated(SIDE_SPREAD).mul(8.5),
    1,
    rng,
    0.5,
  );
  firePlasma(
    self,
    self.Position.add(centerVec.Rotated(-SIDE_SPREAD).mul(self.Size)),
    fireVec.Rotated(-SIDE_SPREAD).mul(8.5),
    1,
    rng,
    0.5,
  );

  SFXManager().Play(
    SoundEffect.SOUND_REDLIGHTNING_ZAP_WEAK,
    0.5,
    0,
    false,
    0.45,
  );
  self.ProjectileCooldown = 60;
}

function firePlasma(
  self: EntityNPC,
  firePoint: Vector,
  fireDirection: Vector,
  damage: int,
  rng: RNG,
  sizeMult = 1,
) {
  const newPlasmaBall = Isaac.Spawn(
    EntityType.ENTITY_PROJECTILE,
    LabProjectileEntityVariant,
    ProjectileEntitySubtype.PLASMA_BALL,
    firePoint,
    fireDirection,
    self,
  ).ToProjectile()!;
  newPlasmaBall.Damage = damage;
  newPlasmaBall.Height -= 8;
  newPlasmaBall.FallingAccel = -0.1;
  newPlasmaBall.Size *= sizeMult;
  newPlasmaBall.SpriteScale = Vector(sizeMult, sizeMult);

  newPlasmaBall.FlipX = rng.RandomInt(2) === 1;

  newPlasmaBall.Update();
}
