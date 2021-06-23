import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { randomInt } from "../../../../utils/extMath";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_GOLDPLATER as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const hasTrinket =
    player.GetTrinket(0) !== TrinketType.TRINKET_NULL ||
    player.GetTrinket(1) !== TrinketType.TRINKET_NULL;

  if (hasTrinket) {
    const trinket0 = player.GetTrinket(0);
    const trinket1 = player.GetTrinket(1);

    if (trinket0 !== TrinketType.TRINKET_NULL) {
      player.TryRemoveTrinket(trinket0);
      player.AddTrinket(trinket0 + TrinketType.TRINKET_GOLDEN_FLAG);
    }
    if (trinket1 !== TrinketType.TRINKET_NULL) {
      player.TryRemoveTrinket(trinket1);
      player.AddTrinket(trinket1 + TrinketType.TRINKET_GOLDEN_FLAG);
    }

    player.RemoveCollectible(ownType(), false, ActiveSlot);
    player.AddCollectible(
      CollectibleType.COLLECTIBLE_MOMS_BOX,
      0,
      false,
      ActiveSlot,
    );
    return true;
  }

  const itemPool = Game().GetItemPool();
  const room = Game().GetRoom();

  for (let i = 0; i < randomInt(rand, 6, 10); i++) {
    const newTrinket = Isaac.Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_TRINKET,
      itemPool.GetTrinket(),
      Isaac.GetFreeNearPosition(
        room.FindFreePickupSpawnPosition(player.Position, 25, true),
        5,
      ),
      Vector.Zero,
      null,
    ).ToPickup()!;

    newTrinket.OptionsPickupIndex = 58;
  }

  return true;
}
