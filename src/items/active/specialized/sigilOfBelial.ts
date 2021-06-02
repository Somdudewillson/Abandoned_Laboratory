import { CollectibleTypeLabUpgrade } from "../../../constants";
import { tanh } from "../../../extMath";

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

  const entities = Game().GetRoom().GetEntities();
  let pentagrams = 0;
  for (let i = 0; i < entities.Size; i++) {
    const entity = entities.Get(i);
    if (entity == null) {
      continue;
    }

    if (entity.Type !== EntityType.ENTITY_FAMILIAR) {
      continue;
    }
    if (entity.Variant !== FamiliarVariant.ITEM_WISP) {
      continue;
    }
    if (entity.SubType !== CollectibleType.COLLECTIBLE_PENTAGRAM) {
      continue;
    }

    pentagrams++;
  }

  if (rand.RandomFloat() <= 1 - tanh(pentagrams / 1.5)) {
    player
      .AddItemWisp(CollectibleType.COLLECTIBLE_PENTAGRAM, player.Position)
      .SetColor(Color(100, 0, 0), -1, 1);
  }

  return true;
}
