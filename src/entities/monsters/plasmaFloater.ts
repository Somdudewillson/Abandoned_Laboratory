const enum AnimKeys {
  DOWN = "Down",
  L1 = "L1",
  L2 = "L2",
  LEFT = "Left",
  L3 = "L3",
  L4 = "L4",
  UP = "Up",
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
  // attemptApproach(currentTarget);
  // attemptAttack(currentTarget);

  return true;
}

function isFriendly(self: EntityNPC): boolean {
  return (
    self.HasEntityFlags(EntityFlag.FLAG_CHARM) ||
    self.HasEntityFlags(EntityFlag.FLAG_FRIENDLY)
  );
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
  print(`${desiredFacing} deg-> ${spriteFacing * 15} deg-> "${chosenAnimKey}"`);
  const currentFrame = sprite.GetFrame();
  sprite.Play(chosenAnimKey, true);
  sprite.SetFrame(currentFrame);
}
