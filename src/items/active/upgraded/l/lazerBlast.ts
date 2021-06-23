import { queueThrowable } from "../../../../callbacks/handler_ThrownEffect";
import { CollectibleTypeLabUpgrade, LaserSubType } from "../../../../constants";
import { directionToDegrees } from "../../../../utils/utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_LAZERBLAST as number;
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
  _directionVector: Vector,
  direction: Direction,
  _data: number,
): void {
  const lazer = Isaac.Spawn(
    EntityType.ENTITY_LASER,
    LaserVariant.SHOOP_DA_WHOOP,
    LaserSubType.LASER_REGULAR,
    player.Position,
    Vector.Zero,
    player,
  ).ToLaser()!;

  lazer.ParentOffset = Vector(0, -25);
  lazer.DepthOffset = 100;
  lazer.Parent = player;
  lazer.AngleDegrees = directionToDegrees(direction);
  lazer.SetTimeout(60);
  lazer.SetColor(Color(1, 0, 0), 30, 2, true);
  lazer.SetColor(Color(1, 0.311, 0), -1, 1);
  lazer.CollisionDamage = player.Damage * 2;
  lazer.Update();
  lazer.SpriteScale = Vector(3, 3);
  lazer.Size *= 3;
}
