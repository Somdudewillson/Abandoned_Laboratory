import {
  EffectEntitySubtype,
  LabEffectEntityVariant,
} from "../../../../callbacks/handler_EffectEvents";
import { queueThrowable } from "../../../../callbacks/handler_ThrownEffect";
import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_BLADEDISC as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  queueThrowable(player, ownType(), ActiveSlot, doThrow);

  return { Discharge: true, Remove: false, ShowAnim: false };
}

export function doThrow(
  player: EntityPlayer,
  directionVector: Vector,
  _direction: Direction,
  _data: number,
): void {
  const newDisc = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    LabEffectEntityVariant,
    EffectEntitySubtype.BLADEDISC,
    player.Position,
    directionVector.Resized(25),
    player,
  );

  newDisc.Parent = player;
  newDisc.CollisionDamage = player.Damage * 3;
  newDisc.DepthOffset = 25;
}
