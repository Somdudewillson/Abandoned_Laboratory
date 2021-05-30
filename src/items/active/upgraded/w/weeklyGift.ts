import { CollectibleTypeLab } from "../../../../constants";
import { tanh } from "../../../../extMath";
import { chargeEffect, spawnPickup } from "../../../../utils";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_WEEKLYGIFT as number;
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

export function postLevel(): void {
  for (let p = 0; p < Game().GetNumPlayers(); p++) {
    const player = Isaac.GetPlayer(p);
    if (player == null) {
      continue;
    }

    if (!player.HasCollectible(ownType())) {
      continue;
    }
    for (let s = 0; s < ActiveSlot.SLOT_POCKET2; s++) {
      if (player.GetActiveItem(s) === ownType()) {
        player.SetActiveCharge(1, s);
        chargeEffect(player.Position);
      }
    }
  }
}
