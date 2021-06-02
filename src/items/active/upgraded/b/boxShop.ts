import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { randomInt } from "../../../../extMath";
import { spawnPickup } from "../../../../utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_BOXSHOP as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  _player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const room = Game().GetRoom();
  const centerPos = room.GetCenterPos();

  // Spawn shopkeeper
  Isaac.Spawn(
    EntityType.ENTITY_SHOPKEEPER,
    0,
    0,
    Isaac.GetFreeNearPosition(centerPos.add(Vector(0, -85)), 5),
    Vector.Zero,
    null,
  );

  // Spawn reroll machine
  if (rand.RandomFloat() < 0.1) {
    Isaac.Spawn(
      EntityType.ENTITY_SLOT,
      SlotVariant.SHOP_RESTOCK_MACHINE,
      0,
      Isaac.GetFreeNearPosition(centerPos.add(Vector(-160, -160)), 5),
      Vector.Zero,
      null,
    );
  }

  // Spawn shop items
  const itemCount = randomInt(rand, 2, 4);
  spawnPickup(
    centerPos.add(Vector(-50, 0)),
    rand,
    PickupVariant.PICKUP_SHOPITEM,
    0,
    true,
  );
  spawnPickup(
    centerPos.add(Vector(50, 0)),
    rand,
    PickupVariant.PICKUP_SHOPITEM,
    0,
    true,
  );
  if (itemCount === 3) {
    spawnPickup(centerPos, rand, PickupVariant.PICKUP_SHOPITEM, 0, true);
  } else if (itemCount === 4) {
    spawnPickup(
      centerPos.add(Vector(-125, 0)),
      rand,
      PickupVariant.PICKUP_SHOPITEM,
      0,
      true,
    );
    spawnPickup(
      centerPos.add(Vector(125, 0)),
      rand,
      PickupVariant.PICKUP_SHOPITEM,
      0,
      true,
    );
  }

  return true;
}
