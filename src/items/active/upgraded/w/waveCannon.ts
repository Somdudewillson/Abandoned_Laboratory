import { queueThrowable } from "../../../../callbacks/handler_ThrownEffect";
import {
  CollectibleTypeLabUpgrade,
  SHOT_SPEED_MULT,
} from "../../../../constants";
import { directionToVector } from "../../../../utils/utils";

const TEAR_COUNT: int = 10;
const FIRE_CONE: float = 75;
const TEAR_ANGLE_INTERVAL: float = FIRE_CONE / (TEAR_COUNT - 1);

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_WAVECANNON as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  queueThrowable(player, ownType(), ActiveSlot, doFire);

  return { Discharge: true, Remove: false, ShowAnim: false };
}

export function doFire(
  player: EntityPlayer,
  directionVector: Vector,
  _direction: Direction,
  _data: number,
): void {
  let aimDirection = directionVector.Rotated(-(FIRE_CONE / 2));
  if (aimDirection.LengthSquared() < 0.1) {
    aimDirection = directionToVector(player.GetHeadDirection());
  }
  const hasCarBattery = player.HasCollectible(
    CollectibleType.COLLECTIBLE_CAR_BATTERY,
  );

  // Fire wave 1
  for (let i = 0; i < (hasCarBattery ? TEAR_COUNT * 2 : TEAR_COUNT); i++) {
    const fireDir = aimDirection.Rotated(
      i * (hasCarBattery ? TEAR_ANGLE_INTERVAL / 2 : TEAR_ANGLE_INTERVAL),
    );
    fireDir.Resize(player.ShotSpeed * SHOT_SPEED_MULT * 0.8);

    const firedTear = player.FireTear(
      player.Position,
      fireDir,
      true,
      true,
      false,
      player,
      0.8,
    );
    firedTear.SetColor(Color(0.7, 0.8, 1, 0.7), -1, 1);
    firedTear.SizeMulti = Vector(2, 2);
    firedTear.KnockbackMultiplier *= 100;
    firedTear.CollisionDamage += 10;
    firedTear.AddTearFlags(TearFlags.TEAR_PIERCING);
    firedTear.AddTearFlags(TearFlags.TEAR_SPECTRAL);
    firedTear.AddTearFlags(TearFlags.TEAR_HYDROBOUNCE);
  }

  // Fire wave 2
  for (let i = 0; i < (hasCarBattery ? TEAR_COUNT * 2 : TEAR_COUNT) - 1; i++) {
    const fireDir = aimDirection.Rotated(
      i * (hasCarBattery ? TEAR_ANGLE_INTERVAL / 2 : TEAR_ANGLE_INTERVAL) +
        (hasCarBattery ? TEAR_ANGLE_INTERVAL / 4 : TEAR_ANGLE_INTERVAL / 2),
    );
    fireDir.Resize(player.ShotSpeed * SHOT_SPEED_MULT * 0.7);

    const firedTear = player.FireTear(
      player.Position,
      fireDir,
      true,
      true,
      false,
      player,
      1.2,
    );
    firedTear.SetColor(Color(0, 0.6, 1, 0.55), -1, 1);
    firedTear.SizeMulti = Vector(3.5, 3.5);
    firedTear.KnockbackMultiplier *= 500;
    firedTear.CollisionDamage += 25;
    firedTear.AddTearFlags(TearFlags.TEAR_PIERCING);
    firedTear.AddTearFlags(TearFlags.TEAR_SPECTRAL);
    firedTear.AddTearFlags(TearFlags.TEAR_HYDROBOUNCE);
  }
}
