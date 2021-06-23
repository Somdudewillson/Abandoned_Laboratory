import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { tanh } from "../../../../utils/extMath";
import { chargeEffect, spawnPickup } from "../../../../utils/utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_WEEKLYGIFT as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const itemPool = Game().GetItemPool();
  const room = Game().GetRoom();

  if (rand.RandomFloat() < tanh((player.Luck + 10) / 8.3)) {
    spawnPickup(
      player.Position,
      rand,
      PickupVariant.PICKUP_COLLECTIBLE,
      itemPool.GetCollectible(
        itemPool.GetPoolForRoom(room.GetType(), room.GetAwardSeed()),
        true,
      ),
      true,
    );
  } else if (
    (player.HasCollectible(CollectibleType.COLLECTIBLE_POOP) ||
      rand.RandomFloat() < 0.5) &&
    !player.HasCollectible(CollectibleType.COLLECTIBLE_LUMP_OF_COAL)
  ) {
    spawnPickup(
      player.Position,
      rand,
      PickupVariant.PICKUP_COLLECTIBLE,
      CollectibleType.COLLECTIBLE_LUMP_OF_COAL,
      true,
    );
  } else {
    let variant = PoopVariant.NORMAL as number;
    if (rand.RandomFloat() < 0.1) {
      if (rand.RandomFloat() < 0.5) {
        variant = PoopVariant.RAINBOW as number;
      } else {
        variant = PoopVariant.GOLDEN as number;
      }
    }
    Isaac.GridSpawn(GridEntityType.GRID_POOP, variant, player.Position, false);
  }

  return true;
}

export function postLevel(
  player: EntityPlayer,
  slot: ActiveSlot,
  _level: Level,
): void {
  player.SetActiveCharge(1, slot);
  chargeEffect(player.Position);
}
