import { CollectibleTypeLab } from "./constants";

export function getCoinVal(pickup: EntityPickup, useDevil = false): int {
  switch (pickup.Variant) {
    case PickupVariant.PICKUP_COIN:
      return pickup.GetCoinValue(); // Just return coin value
    case PickupVariant.PICKUP_COLLECTIBLE:
      if (useDevil) {
        // Calculate item value
        return (
          Isaac.GetItemConfig().GetCollectible(pickup.SubType).DevilPrice * 15
        );
      }
      return 15;

    case PickupVariant.PICKUP_HEART:
      // Calculate value based on type
      switch (pickup.SubType) {
        case HeartSubType.HEART_FULL:
        default:
          return 3;
        case HeartSubType.HEART_HALF:
          return 1;
        case HeartSubType.HEART_DOUBLEPACK:
          return 6;
        case HeartSubType.HEART_SOUL:
          return 5;
        case HeartSubType.HEART_HALF_SOUL:
          return 3;
      }
    case PickupVariant.PICKUP_KEY:
      if (pickup.SubType === KeySubType.KEY_NORMAL) {
        return 5;
      }
      if (pickup.SubType === KeySubType.KEY_DOUBLEPACK) {
        return 10;
      }
      break;
    case PickupVariant.PICKUP_BOMB:
      if (pickup.SubType === BombSubType.BOMB_NORMAL) {
        return 5;
      }
      if (pickup.SubType === BombSubType.BOMB_DOUBLEPACK) {
        return 10;
      }
      break;
    case PickupVariant.PICKUP_LIL_BATTERY:
      if (pickup.SubType === BatterySubType.BATTERY_NORMAL) {
        return 5;
      }
      if (pickup.SubType === BatterySubType.BATTERY_MICRO) {
        return 2;
      }
      break;
    case PickupVariant.PICKUP_TAROTCARD:
    case PickupVariant.PICKUP_PILL:
      return 5;
    case PickupVariant.PICKUP_GRAB_BAG:
      return 7;
    default:
      return 0;
  }

  return 0;
}

export function spawnCoins(
  amount: int,
  position: Vector,
  rand: RNG,
  consolidate = false,
  placeFree = false,
): void {
  if (!consolidate) {
    spawnPickupCluster(
      amount,
      position,
      rand,
      PickupVariant.PICKUP_COIN,
      CoinSubType.COIN_PENNY,
      placeFree,
    );
    return;
  }
  let velocity = Vector(0, 0);

  for (let c = amount; c > 0; ) {
    if (placeFree) {
      position = Isaac.GetFreeNearPosition(position, 1);
    } else {
      velocity = Vector(rand.RandomFloat() * 4 - 2, rand.RandomFloat() * 4 - 2);
    }

    let coinType: CoinSubType = CoinSubType.COIN_PENNY;
    let spawnedVal = 1;
    if (c >= 10) {
      coinType = CoinSubType.COIN_DIME;
      spawnedVal = 10;
    } else if (c >= 5) {
      coinType = CoinSubType.COIN_NICKEL;
      spawnedVal = 5;
    }

    Isaac.Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_COIN,
      coinType,
      position,
      velocity,
      null,
    );
    c -= spawnedVal;
  }
}

export function spawnHearts(
  amount: int,
  position: Vector,
  rand: RNG,
  subtype: number,
  consolidate = false,
  placeFree = false,
): void {
  if (!consolidate) {
    spawnPickupCluster(
      amount,
      position,
      rand,
      PickupVariant.PICKUP_HEART,
      subtype,
      placeFree,
    );
    return;
  }
  let quadType = null;
  let doubleType = null;
  let singleType = HeartSubType.HEART_HALF;
  switch (subtype) {
    case HeartSubType.HEART_BLACK:
    case HeartSubType.HEART_BLENDED:
    case HeartSubType.HEART_BONE:
    case HeartSubType.HEART_ETERNAL:
    case HeartSubType.HEART_GOLDEN:
    case HeartSubType.HEART_SCARED:
    default:
      spawnPickupCluster(
        amount,
        position,
        rand,
        PickupVariant.PICKUP_HEART,
        subtype,
        placeFree,
      );
      return;
    case HeartSubType.HEART_DOUBLEPACK:
      amount *= 4;

      quadType = HeartSubType.HEART_DOUBLEPACK;
      doubleType = HeartSubType.HEART_FULL;
      singleType = HeartSubType.HEART_HALF;
      break;
    case HeartSubType.HEART_FULL:
      amount *= 2;

      quadType = HeartSubType.HEART_DOUBLEPACK;
      doubleType = HeartSubType.HEART_FULL;
      singleType = HeartSubType.HEART_HALF;
      break;
    case HeartSubType.HEART_HALF:
      quadType = HeartSubType.HEART_DOUBLEPACK;
      doubleType = HeartSubType.HEART_FULL;
      singleType = HeartSubType.HEART_HALF;
      break;
    case HeartSubType.HEART_SOUL:
      amount *= 2;

      doubleType = HeartSubType.HEART_SOUL;
      singleType = HeartSubType.HEART_HALF_SOUL;
      break;
    case HeartSubType.HEART_HALF_SOUL:
      doubleType = HeartSubType.HEART_SOUL;
      singleType = HeartSubType.HEART_HALF_SOUL;
      break;
  }
  let velocity = Vector(0, 0);

  for (let h = amount; h > 0; ) {
    if (placeFree) {
      position = Isaac.GetFreeNearPosition(position, 5);
    } else {
      velocity = Vector(rand.RandomFloat() * 4 - 2, rand.RandomFloat() * 4 - 2);
    }

    let heartType: HeartSubType = singleType;
    let spawnedVal = 1;
    if (quadType != null && h >= 4) {
      heartType = quadType;
      spawnedVal = 4;
    } else if (doubleType != null && h >= 2) {
      heartType = doubleType;
      spawnedVal = 2;
    }

    Game().Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_HEART,
      position,
      velocity,
      null,
      heartType,
      rand.GetSeed(),
    );
    h -= spawnedVal;
  }
}

export function spawnPickupCluster(
  amount: int,
  position: Vector,
  rand: RNG,
  variant: number,
  subType: number,
  placeFree = false,
): void {
  let velocity = Vector(0, 0);

  for (let i = 0; i < amount; i++) {
    if (placeFree) {
      position = Isaac.GetFreeNearPosition(position, 5);
    } else {
      velocity = Vector(rand.RandomFloat() * 4 - 2, rand.RandomFloat() * 4 - 2);
    }

    Game().Spawn(
      EntityType.ENTITY_PICKUP,
      variant,
      position,
      velocity,
      null,
      subType,
      rand.GetSeed(),
    );
  }
}

export function spawnPickup(
  position: Vector,
  rand: RNG,
  variant: number,
  subType: number,
  placeFree = false,
): void {
  spawnPickupCluster(1, position, rand, variant, subType, placeFree);
}

export function randomCollectible(rand: RNG): number {
  const enumEntries: Array<[string | number, string | number]> =
    Object.entries(CollectibleTypeLab);

  const randomIndex = Math.floor(rand.RandomFloat() * enumEntries.length);
  if (type(enumEntries[randomIndex][0]) === "number") {
    return enumEntries[randomIndex][0] as number;
  }
  return enumEntries[randomIndex][1] as number;
}

export function playSound(
  sound: SoundEffect,
  volume: int = 1,
  frameDelay: int = 0,
  loop = false,
  pitch: int = 1,
): void {
  const effEntity = Isaac.Spawn(
    EntityType.ENTITY_FLY,
    0,
    0,
    Vector.Zero,
    Vector.Zero,
    null,
  );
  effEntity.ToNPC()!.PlaySound(sound, volume, frameDelay, loop, pitch);
  effEntity.Remove();
}

export function hasFlag(flags: int, testFlag: int): boolean {
  return (flags & testFlag) === testFlag;
}
