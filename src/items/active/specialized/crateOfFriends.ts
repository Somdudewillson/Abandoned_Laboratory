/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CollectibleTypeLabUpgrade } from "../../../constants";
import { hasFlag } from "../../../utils";

const FRIEND_ITEMS: Set<int> = new Set<int>();
const REPLICATE_CHANCE: float = 0.05;

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_CRATEOFFRIENDS as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  if (!player.HasCollectible(CollectibleType.COLLECTIBLE_BFFS)) {
    player.AddCollectible(CollectibleType.COLLECTIBLE_BFFS);
  }

  player.UseActiveItem(CollectibleType.COLLECTIBLE_BOX_OF_FRIENDS, 0);

  for (const item of FRIEND_ITEMS) {
    // Isaac.DebugString(`FRIEND_ITEM: ${item}`);
    if (player.HasCollectible(item) && rand.RandomFloat() < REPLICATE_CHANCE) {
      player.AddCollectible(item);
    }
  }

  return true;
}

export function findAllFriendItems(): void {
  const itemConfig = Isaac.GetItemConfig();

  const collectibles = itemConfig.GetCollectibles();
  for (let i = 0; i < collectibles.Size; i++) {
    const item = itemConfig.GetCollectible(i);

    if (item == null || item.IsNull()) {
      continue;
    }
    if (!item.IsCollectible()) {
      continue;
    }

    if (
      !item.HasTags(ItemConfigTag.UNIQUE_FAMILIAR) && // Unique_familiar
      item.Type !== ItemType.ITEM_ACTIVE &&
      (item.HasTags(ItemConfigTag.BABY) || // Baby
        hasFlag(item.CacheFlags, CacheFlag.CACHE_FAMILIARS))
    ) {
      FRIEND_ITEMS.add(item.ID);
    }
  }
}
