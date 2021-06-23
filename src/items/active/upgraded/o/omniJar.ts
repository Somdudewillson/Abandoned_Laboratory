import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { randomInt } from "../../../../extMath";
import { getPlayerData, savePlayerData, SaveType } from "../../../../saveData";
import { spawnCoins, spawnPickup, spawnPickupCluster } from "../../../../utils/utils";

const SAVE_KEY_USES = "omnijar_uses";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_OMNIJAR as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const uses = getPlayerData(
    EntityRef(player),
    SaveType.PER_RUN,
    SAVE_KEY_USES,
  ) as null | int;

  if (uses == null) {
    savePlayerData(EntityRef(player), SaveType.PER_RUN, SAVE_KEY_USES, 2);
  } else if (uses > 3) {
    savePlayerData(EntityRef(player), SaveType.PER_RUN, SAVE_KEY_USES, 1);
  } else {
    savePlayerData(
      EntityRef(player),
      SaveType.PER_RUN,
      SAVE_KEY_USES,
      uses + 1,
    );
  }

  switch (uses) {
    default:
    case 1:
      spawnFirstRewards(player.Position, rand);
      player.SetActiveCharge(6, ActiveSlot);
      return { Discharge: false, Remove: false, ShowAnim: true };
    case 2:
      spawnSecondRewards(player.Position, rand);
      player.SetActiveCharge(6, ActiveSlot);
      return { Discharge: false, Remove: false, ShowAnim: true };
    case 3:
      spawnFinalRewards(player.Position, rand, player);
      break;
  }

  return true;
}

function spawnFirstRewards(position: Vector, rand: RNG): void {
  spawnCoins(randomInt(rand, 2, 5), position, rand, true, true);
  spawnPickupCluster(
    randomInt(rand, 2, 3),
    position,
    rand,
    PickupVariant.PICKUP_BOMB,
    BombSubType.BOMB_NORMAL,
    true,
  );
  spawnPickupCluster(
    randomInt(rand, 1, 2),
    position,
    rand,
    PickupVariant.PICKUP_KEY,
    KeySubType.KEY_NORMAL,
    true,
  );
  spawnPickupCluster(
    randomInt(rand, 1, 4),
    position,
    rand,
    PickupVariant.PICKUP_HEART,
    HeartSubType.HEART_FULL,
    true,
  );
}

function spawnSecondRewards(position: Vector, rand: RNG): void {
  const itemPool = Game().GetItemPool();

  spawnPickup(
    position,
    rand,
    PickupVariant.PICKUP_PILL,
    itemPool.GetPill(rand.Next()),
  );
  spawnPickup(
    position,
    rand,
    PickupVariant.PICKUP_TAROTCARD,
    itemPool.GetCard(rand.Next(), true, true, false),
  );
  spawnPickup(
    position,
    rand,
    PickupVariant.PICKUP_BOMB,
    BombSubType.BOMB_GOLDEN,
  );
  spawnPickup(position, rand, PickupVariant.PICKUP_KEY, KeySubType.KEY_GOLDEN);
  spawnPickupCluster(
    randomInt(rand, 2, 3),
    position,
    rand,
    PickupVariant.PICKUP_HEART,
    HeartSubType.HEART_SOUL,
    true,
  );
  spawnPickupCluster(
    randomInt(rand, 1, 2),
    position,
    rand,
    PickupVariant.PICKUP_HEART,
    HeartSubType.HEART_GOLDEN,
    true,
  );
}

function spawnFinalRewards(
  position: Vector,
  rand: RNG,
  player: EntityPlayer,
): void {
  const itemPool = Game().GetItemPool();
  const room = Game().GetRoom();

  spawnCoins(randomInt(rand, 5, 20), position, rand, true, true);
  spawnPickupCluster(
    randomInt(rand, 1, 3),
    position,
    rand,
    PickupVariant.PICKUP_BOMB,
    BombSubType.BOMB_GIGA,
    true,
  );
  player.AddBlueFlies(randomInt(rand, 3, 9), position, null);
  for (let i = 0; i < randomInt(rand, 3, 9); i++) {
    player.AddBlueSpider(position);
  }
  for (let i = 0; i < randomInt(rand, 2, 6); i++) {
    player.AddFriendlyDip(0, position);
  }
  spawnPickup(
    position,
    rand,
    PickupVariant.PICKUP_COLLECTIBLE,
    itemPool.GetCollectible(
      itemPool.GetPoolForRoom(room.GetType(), rand.Next()),
      true,
      rand.Next(),
    ),
    true,
  );
}
