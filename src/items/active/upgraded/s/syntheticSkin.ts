import { CollectibleTypeLab } from "../../../../constants";
import { spawnPickup } from "../../../../utils";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_SYNTHETICSKIN as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  if (player.GetMaxHearts() >= 2) {
    player.AddMaxHearts(-2, true);
  } else if (player.GetSoulHearts() >= 4) {
    player.AddSoulHearts(-4);
  } else {
    return false;
  }
  player.AddBrokenHearts(1);

  const itemPool = Game().GetItemPool();
  const room = Game().GetRoom();

  spawnPickup(
    Game().GetRoom().GetCenterPos(),
    rand,
    PickupVariant.PICKUP_COLLECTIBLE,
    itemPool.GetCollectible(
      itemPool.GetPoolForRoom(room.GetType(), room.GetAwardSeed()),
      true,
      rand.Next(),
    ),
    true,
  );

  return true;
}
