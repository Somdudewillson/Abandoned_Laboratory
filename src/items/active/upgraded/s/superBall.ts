import {
  EffectEntitySubtype,
  LabEffectEntityVariant,
} from "../../../../callbacks/handler_EffectEvents";
import { queueThrowable } from "../../../../callbacks/handler_ThrownEffect";
import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { CAPTURED_ENTITY_SAVE_KEY } from "../../../../entities/effects/effect_CaptureBall";
import { getPlayerData, SaveType } from "../../../../saveData";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_SUPERBALL as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  queueThrowable(player, ownType(), ActiveSlot, doThrow, ActiveSlot);

  return { Discharge: true, Remove: false, ShowAnim: false };
}

export function doThrow(
  player: EntityPlayer,
  directionVector: Vector,
  _direction: Direction,
  data: number,
): void {
  const capturedEntityData = getPlayerData(
    EntityRef(player),
    SaveType.PER_RUN,
    CAPTURED_ENTITY_SAVE_KEY,
  );

  const newBall = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    LabEffectEntityVariant,
    EffectEntitySubtype.SUPERBALL,
    player.Position,
    directionVector.Resized(20),
    player,
  ).ToEffect()!;

  newBall.Parent = player;
  newBall.State = data;
  newBall.Size = capturedEntityData == null ? 0 : 2;
  newBall.SpriteScale = Vector(1.15, 1.15);
}
