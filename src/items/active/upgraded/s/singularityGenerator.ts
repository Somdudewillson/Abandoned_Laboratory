import {
  EffectEntitySubtype,
  LabEffectEntityVariant,
} from "../../../../callbacks/handler_EffectEvents";
import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_SINGULARITYGENERATOR as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  const newSingularity = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    LabEffectEntityVariant,
    EffectEntitySubtype.SINGULARITYGENERATOR,
    player.Position,
    Vector.Zero,
    player,
  ).ToEffect()!;
  newSingularity.Parent = player;
  newSingularity.State = 30 * 20;
  newSingularity.Timeout = Isaac.GetFrameCount() + 30 * 20;

  return true;
}
