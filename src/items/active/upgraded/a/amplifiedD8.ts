import { CollectibleTypeLabUpgrade } from "../../../../constants";

const EFFECT_OPTIONS = [
  PillEffect.PILLEFFECT_LUCK_UP,
  PillEffect.PILLEFFECT_LUCK_UP,

  PillEffect.PILLEFFECT_RANGE_UP,
  PillEffect.PILLEFFECT_RANGE_UP,
  PillEffect.PILLEFFECT_RANGE_UP,
  PillEffect.PILLEFFECT_RANGE_UP,

  PillEffect.PILLEFFECT_SPEED_UP,
  PillEffect.PILLEFFECT_SPEED_UP,
  PillEffect.PILLEFFECT_SPEED_UP,

  PillEffect.PILLEFFECT_TEARS_UP,
  PillEffect.PILLEFFECT_TEARS_UP,

  PillEffect.PILLEFFECT_HEALTH_UP,

  PillEffect.PILLEFFECT_SHOT_SPEED_UP,
  PillEffect.PILLEFFECT_SHOT_SPEED_UP,
  PillEffect.PILLEFFECT_SHOT_SPEED_UP,
];

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_AMPLIFIEDD8 as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UsePill(
    EFFECT_OPTIONS[rand.RandomInt(EFFECT_OPTIONS.length)],
    PillColor.PILL_NULL,
    UseFlag.USE_NOANIM | UseFlag.USE_NOANNOUNCER,
  );

  return true;
}
