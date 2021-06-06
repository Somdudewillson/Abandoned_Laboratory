import { CollectibleTypeLabUpgrade } from "../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_REINFORCEDITEMFABRICATOR as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_LEMEGETON,
    UseFlag.USE_NOANIM,
  );

  const itemWisps = Isaac.FindByType(
    EntityType.ENTITY_FAMILIAR,
    FamiliarVariant.ITEM_WISP,
  );
  for (const itemWisp of itemWisps) {
    if (itemWisp.MaxHitPoints === 4) {
      itemWisp.MaxHitPoints *= 3;
      itemWisp.HitPoints = itemWisp.MaxHitPoints;
      itemWisp.SetColor(Color(0.6, 0.6, 1), -1, 1);
    }
  }

  return true;
}
