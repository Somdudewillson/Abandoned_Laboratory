import { CollectibleTypeLab } from "../../../constants";
import { hasFlag } from "../../../utils";

const FRIEND_ITEMS: Set<int> = new Set<int>();
const REPLICATE_CHANCE: float = 0.05;

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_CRATEOFFRIENDS as number;
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
  player.UseActiveItem(CollectibleType.COLLECTIBLE_BOX_OF_SPIDERS, 0);
  player.UseActiveItem(CollectibleType.COLLECTIBLE_GUPPYS_HEAD, 0);

  for (const item of FRIEND_ITEMS) {
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

    if (item.IsNull()) {
      continue;
    }
    if (!item.IsCollectible()) {
      continue;
    }

    if (
      // TODO: use actual flag enums
      !item.HasTags(1 << 27) && // Unique_familiar
      (item.HasTags(1 << 9) || // Baby
        hasFlag(item.CacheFlags, CacheFlag.CACHE_FAMILIARS))
    ) {
      FRIEND_ITEMS.add(item.ID);
    }
  }
}
