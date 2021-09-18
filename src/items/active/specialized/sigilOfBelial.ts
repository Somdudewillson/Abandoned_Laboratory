import { CollectibleTypeLabUpgrade } from "../../../constants";
import { tanh } from "../../../utils/extMath";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_SIGILOFBELIAL as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UseActiveItem(CollectibleType.COLLECTIBLE_BOOK_OF_BELIAL);

  const entities = Isaac.FindByType(
    EntityType.ENTITY_FAMILIAR,
    FamiliarVariant.ITEM_WISP,
    CollectibleType.COLLECTIBLE_PENTAGRAM,
  );
  const pentagrams = entities.length;

  if (rand.RandomFloat() <= 1 - tanh(pentagrams / 1.5)) {
    player
      .AddItemWisp(CollectibleType.COLLECTIBLE_PENTAGRAM, player.Position)
      .SetColor(Color(100, 0, 0), -1, 1);
  }

  return true;
}
