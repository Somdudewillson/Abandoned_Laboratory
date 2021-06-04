import { CollectibleTypeLabUpgrade, LaserSubType } from "../../../../constants";
import { sign } from "../../../../extMath";
import { directionToDegrees } from "../../../../utils";

const BEAM_COUNT: int = 4;
const FIRE_CONE: float = 20;
const TEAR_ANGLE_INTERVAL: float = FIRE_CONE / (BEAM_COUNT - 1);

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_BRIMSTONECANNON as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const startDegrees =
    directionToDegrees(player.GetHeadDirection()) - FIRE_CONE / 2;
  const hasCarBattery = player.HasCollectible(
    CollectibleType.COLLECTIBLE_CAR_BATTERY,
  );

  for (let i = 0; i < (hasCarBattery ? BEAM_COUNT * 2 : BEAM_COUNT); i++) {
    const curInterval =
      i * (hasCarBattery ? TEAR_ANGLE_INTERVAL / 2 : TEAR_ANGLE_INTERVAL);
    const lazer = Isaac.Spawn(
      EntityType.ENTITY_LASER,
      LaserVariant.THICK_RED,
      LaserSubType.LASER_REGULAR,
      player.Position,
      Vector.Zero,
      player,
    ).ToLaser()!;

    lazer.ParentOffset = Vector(0, -25);
    lazer.DepthOffset = 100;
    lazer.Parent = player;
    lazer.AngleDegrees = startDegrees + curInterval;
    lazer.SetTimeout(30);
    lazer.CollisionDamage = 11;
    lazer.IsActiveRotating = true;

    lazer.RotationSpd = sign(FIRE_CONE - curInterval * 2);
    lazer.RotationDelay = 6;
    lazer.RotationDegrees = FIRE_CONE - curInterval * 2;
  }

  return true;
}
