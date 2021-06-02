import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_CARTOGRAPHERTOME as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  const level: Level = Game().GetLevel();

  level.ApplyMapEffect();
  level.ApplyCompassEffect(true);
  level.ApplyBlueMapEffect();
  player.UsePill(
    PillEffect.PILLEFFECT_SEE_FOREVER,
    PillColor.PILL_NULL,
    UseFlag.USE_NOANIM,
  );

  return true;
}
