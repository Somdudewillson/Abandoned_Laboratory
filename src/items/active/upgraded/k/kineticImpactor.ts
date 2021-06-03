import {
  EffectEntitySubtype,
  EffectEntityVariant,
} from "../../../../callbacks/handler_EffectEvents";
import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_KINETICIMPACTOR as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    EffectEntityVariant.STATICEFFECT,
    EffectEntitySubtype.KINETICIMPACTOR,
    player.Position,
    Vector.Zero,
    player,
  );

  return true;
}
