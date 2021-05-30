import { CollectibleTypeLab } from "../../../../constants";
import { spawnPickup } from "../../../../utils";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_STRAIGHTENEDPENNY as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const result = rand.RandomFloat() < 0.75;

  const entities = Game().GetRoom().GetEntities();
  const size = entities.Size;
  for (let i = 0; i < size; i++) {
    const entity = entities.Get(i);
    if (entity == null) {
      continue;
    }

    if (entity.Type !== EntityType.ENTITY_PICKUP) {
      continue;
    }
    if (
      entity.Variant === PickupVariant.PICKUP_BED ||
      entity.Variant === PickupVariant.PICKUP_MEGACHEST ||
      entity.Variant === PickupVariant.PICKUP_THROWABLEBOMB ||
      entity.Variant === PickupVariant.PICKUP_TROPHY ||
      entity.Variant === PickupVariant.PICKUP_TRINKET
    ) {
      continue;
    }

    if (result) {
      spawnPickup(entity.Position, rand, entity.Variant, entity.SubType, true);
    } else {
      entity.Remove();
    }
  }

  if (!result) {
    spawnPickup(
      player.Position,
      rand,
      PickupVariant.PICKUP_COIN,
      CoinSubType.COIN_NICKEL,
      true,
    );
  }

  return true;
}
