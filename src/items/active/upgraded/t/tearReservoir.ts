import { queueThrowable } from "../../../../callbacks/handler_ThrownEffect";
import {
  CollectibleTypeLabUpgrade,
  SHOT_SPEED_MULT,
} from "../../../../constants";
import { playSound } from "../../../../utils";

const TEAR_COUNT: int = 7;
const FIRE_CONE: float = 35;
const TEAR_ANGLE_INTERVAL: float = FIRE_CONE / (TEAR_COUNT - 1);

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_TEARRESERVOIR as number;
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

export function postTear(tear: EntityTear): void {
  if (tear.SpawnerEntity == null) {
    return;
  }
  const player = tear.SpawnerEntity.ToPlayer();
  if (player == null) {
    return;
  }

  if (!player.HasCollectible(ownType())) {
    return;
  }
  for (let s = 0; s < ActiveSlot.SLOT_POCKET2; s++) {
    if (player.GetActiveItem(s) === ownType()) {
      player.SetActiveCharge(Math.min(player.GetActiveCharge(s) + 1, 6), s);
      playSound(SoundEffect.SOUND_BEEP, 0.25);
    }
  }
}

export function doFire(
  player: EntityPlayer,
  directionVector: Vector,
  _direction: Direction,
  _data: number,
): void {
  const aimDirection = directionVector.Rotated(-(FIRE_CONE / 2));
  const hasCarBattery = player.HasCollectible(
    CollectibleType.COLLECTIBLE_CAR_BATTERY,
  );

  for (let i = 0; i < (hasCarBattery ? TEAR_COUNT * 2 : TEAR_COUNT); i++) {
    const fireDir = aimDirection.Rotated(
      i * (hasCarBattery ? TEAR_ANGLE_INTERVAL / 2 : TEAR_ANGLE_INTERVAL),
    );
    fireDir.Resize(player.ShotSpeed * SHOT_SPEED_MULT);

    player.FireTear(player.Position, fireDir, true, true, false, player);
  }
}
