// TODO: Maybe make the matter rearranger able to generate pills/cards?
import { CollectibleTypeLabUpgrade } from "../../../../constants";
import * as extMath from "../../../../extMath";
import { getCoinVal, spawnPickup } from "../../../../utils/utils";

const VALUE_MULT: float = 1;
const BASE_PICKUP_WEIGHTS = new Map([
  // ===== Hearts =====
  [
    packForWeights(PickupVariant.PICKUP_HEART, HeartSubType.HEART_FULL),
    { weight: 400, cost: 3 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_HEART, HeartSubType.HEART_SOUL),
    { weight: 30, cost: 5 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_HEART, HeartSubType.HEART_HALF_SOUL),
    { weight: 30, cost: 3 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_HEART, HeartSubType.HEART_HALF),
    { weight: 600, cost: 1 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_HEART, HeartSubType.HEART_DOUBLEPACK),
    { weight: 200, cost: 6 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_HEART, HeartSubType.HEART_BLENDED),
    { weight: 15, cost: 6 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_HEART, HeartSubType.HEART_BONE),
    { weight: 6, cost: 9 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_HEART, HeartSubType.HEART_ETERNAL),
    { weight: 15, cost: 7 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_HEART, HeartSubType.HEART_BLACK),
    { weight: 10, cost: 7 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_HEART, HeartSubType.HEART_GOLDEN),
    { weight: 10, cost: 4 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_HEART, HeartSubType.HEART_ROTTEN),
    { weight: 5, cost: 2 },
  ],
  // ===== Bombs =====
  [
    packForWeights(PickupVariant.PICKUP_BOMB, BombSubType.BOMB_NORMAL),
    { weight: 100, cost: 5 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_BOMB, BombSubType.BOMB_DOUBLEPACK),
    { weight: 50, cost: 10 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_BOMB, BombSubType.BOMB_GOLDEN),
    { weight: 10, cost: 25 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_BOMB, BombSubType.BOMB_GIGA),
    { weight: 4, cost: 16 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_BOMB, BombSubType.BOMB_TROLL),
    { weight: 15, cost: -2 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_BOMB, BombSubType.BOMB_SUPERTROLL),
    { weight: 7.5, cost: -5 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_BOMB, BombSubType.BOMB_GOLDENTROLL),
    { weight: 2, cost: -20 },
  ],
  // ===== Keys =====
  [
    packForWeights(PickupVariant.PICKUP_KEY, KeySubType.KEY_NORMAL),
    { weight: 100, cost: 5 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_KEY, KeySubType.KEY_DOUBLEPACK),
    { weight: 50, cost: 10 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_KEY, KeySubType.KEY_CHARGED),
    { weight: 33, cost: 10 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_KEY, KeySubType.KEY_GOLDEN),
    { weight: 10, cost: 25 },
  ],
  // ===== Battery =====
  [
    packForWeights(
      PickupVariant.PICKUP_LIL_BATTERY,
      BatterySubType.BATTERY_NORMAL,
    ),
    { weight: 100, cost: 5 },
  ],
  [
    packForWeights(
      PickupVariant.PICKUP_LIL_BATTERY,
      BatterySubType.BATTERY_MICRO,
    ),
    { weight: 50, cost: 2 },
  ],
  [
    packForWeights(
      PickupVariant.PICKUP_LIL_BATTERY,
      BatterySubType.BATTERY_MEGA,
    ),
    { weight: 50, cost: 12 },
  ],
  [
    packForWeights(
      PickupVariant.PICKUP_LIL_BATTERY,
      BatterySubType.BATTERY_GOLDEN,
    ),
    { weight: 10, cost: 25 },
  ],
  // ===== CHEST =====
  [
    packForWeights(PickupVariant.PICKUP_CHEST, ChestSubType.CHEST_CLOSED),
    { weight: 30, cost: 9 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_BOMBCHEST, ChestSubType.CHEST_CLOSED),
    { weight: 20, cost: 12 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_LOCKEDCHEST, ChestSubType.CHEST_CLOSED),
    { weight: 20, cost: 12 },
  ],
  [
    packForWeights(PickupVariant.PICKUP_REDCHEST, ChestSubType.CHEST_CLOSED),
    { weight: 10, cost: 16 },
  ],
  [
    packForWeights(
      PickupVariant.PICKUP_ETERNALCHEST,
      ChestSubType.CHEST_CLOSED,
    ),
    { weight: 8, cost: 21 },
  ],
  // ===== MISC =====
  [
    packForWeights(PickupVariant.PICKUP_GRAB_BAG, SackSubType.SACK_NORMAL),
    { weight: 33, cost: 7 },
  ],
]);

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_MATTERREARRANGER as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  const room: Room = Game().GetRoom();

  const entities = room.GetEntities();
  let points: float = 0;
  for (let i = 0; i < entities.Size; i++) {
    const entity = entities.Get(i);
    if (entity == null) {
      continue;
    }

    if (entity.Type !== EntityType.ENTITY_PICKUP) {
      continue;
    }
    const pickupValue = evaluatePickup(entity.ToPickup()!);
    if (pickupValue > 0) {
      points += pickupValue;
      entity.Remove();
    }
  }
  points *= VALUE_MULT;

  const spawningData = {
    neededRedHearts: player.GetEffectiveMaxHearts() - player.GetHearts(),
    totalHealth: player.HitPoints,
    needsCharge:
      player.NeedsCharge() ||
      player.NeedsCharge(ActiveSlot.SLOT_SECONDARY) ||
      player.NeedsCharge(ActiveSlot.SLOT_POCKET) ||
      player.NeedsCharge(ActiveSlot.SLOT_POCKET2),
    bombs: player.GetNumBombs(),
    hasGoldBomb: player.HasGoldenBomb(),
    keys: player.GetNumKeys(),
    hasGoldKey: player.HasGoldenKey(),
    bombChests: 0,
    keyChests: 0,
  };
  // Use weighted random to spawn items
  while (points > 0) {
    // ---Copy base weights---
    const pickupWeights = copyWeights(BASE_PICKUP_WEIGHTS);

    // ---Modify weights conditionally---
    for (const entry of pickupWeights) {
      modifyWeight(entry, pickupWeights, spawningData, points);
    }

    // ---Select one at random---
    const result = weightedRandomPickup(pickupWeights, rand);
    points -= result.cost; // Deduct cost of spawned pickup
    // Spawn pickup
    if (
      result.variant === PickupVariant.PICKUP_BOMB &&
      (result.subtype === BombSubType.BOMB_TROLL ||
        result.subtype === BombSubType.BOMB_SUPERTROLL ||
        result.subtype === BombSubType.BOMB_GOLDENTROLL)
    ) {
      spawnPickup(
        player.Position.add(
          Vector(extMath.randomSign(rand) * 50, extMath.randomSign(rand) * 50),
        ),
        rand,
        result.variant,
        result.subtype,
        true,
      );
    } else {
      spawnPickup(player.Position, rand, result.variant, result.subtype, true);
    }

    // ---Alter requirement/need data based on spawned item---
    switch (result.variant) {
      default:
      case PickupVariant.PICKUP_HEART:
        switch (result.subtype) {
          case HeartSubType.HEART_FULL:
            spawningData.totalHealth += Math.min(
              2,
              spawningData.neededRedHearts,
            );
            spawningData.neededRedHearts -= 2;
            break;
          case HeartSubType.HEART_HALF:
            spawningData.totalHealth += Math.min(
              1,
              spawningData.neededRedHearts,
            );
            spawningData.neededRedHearts -= 1;
            break;
          case HeartSubType.HEART_DOUBLEPACK:
            spawningData.totalHealth += Math.min(
              4,
              spawningData.neededRedHearts,
            );
            spawningData.neededRedHearts -= 4;
            break;
          case HeartSubType.HEART_BLENDED:
            if (spawningData.neededRedHearts > 0) {
              spawningData.totalHealth += Math.min(
                2,
                spawningData.neededRedHearts,
              );
              spawningData.neededRedHearts -= 2;
            } else {
              spawningData.totalHealth += 2;
            }
            break;
          case HeartSubType.HEART_BLACK:
          case HeartSubType.HEART_SOUL:
          case HeartSubType.HEART_ETERNAL:
            spawningData.totalHealth += 2;
            break;
          case HeartSubType.HEART_BONE:
            spawningData.neededRedHearts += 2;
          // Falls through
          case HeartSubType.HEART_HALF_SOUL:
          case HeartSubType.HEART_ROTTEN:
            spawningData.totalHealth += 1;
            break;
          default:
            break;
        }
        break;
      case PickupVariant.PICKUP_LIL_BATTERY:
        switch (result.subtype) {
          case BatterySubType.BATTERY_MICRO:
            if (rand.RandomFloat() > 0.5) {
              break;
            }
          // falls through
          case BatterySubType.BATTERY_NORMAL:
          case BatterySubType.BATTERY_MEGA:
          case BatterySubType.BATTERY_GOLDEN:
            spawningData.needsCharge = false;
            break;
          default:
            break;
        }
        break;
      case PickupVariant.PICKUP_LOCKEDCHEST:
        spawningData.keyChests++;
        break;
      case PickupVariant.PICKUP_BOMBCHEST:
        spawningData.bombChests++;
        break;
      case PickupVariant.PICKUP_KEY:
        if (result.subtype === KeySubType.KEY_GOLDEN) {
          spawningData.hasGoldKey = true;
        } else {
          spawningData.keys++;
        }
        break;
      case PickupVariant.PICKUP_BOMB:
        if (result.subtype === BombSubType.BOMB_GOLDEN) {
          spawningData.hasGoldBomb = true;
        } else {
          spawningData.bombs++;
        }
        break;
    }
  }

  return true;
}

function evaluatePickup(pickup: EntityPickup): float {
  switch (pickup.Variant) {
    default:
      if (
        BASE_PICKUP_WEIGHTS.has(packForWeights(pickup.Variant, pickup.SubType))
      ) {
        const cost: number = BASE_PICKUP_WEIGHTS.get(
          packForWeights(pickup.Variant, pickup.SubType),
        )!.cost;
        if (cost > 0) {
          return cost;
        }
      }
    // Falls through
    case PickupVariant.PICKUP_BED:
    case PickupVariant.PICKUP_BIGCHEST:
    case PickupVariant.PICKUP_COLLECTIBLE:
    case PickupVariant.PICKUP_NULL:
    case PickupVariant.PICKUP_TROPHY:
    case PickupVariant.PICKUP_THROWABLEBOMB:
    case PickupVariant.PICKUP_TRINKET:
      return 0;
    case PickupVariant.PICKUP_HEART:
    case PickupVariant.PICKUP_KEY:
    case PickupVariant.PICKUP_BOMB:
    case PickupVariant.PICKUP_LIL_BATTERY:
    case PickupVariant.PICKUP_COIN:
      return getCoinVal(pickup);
    case PickupVariant.PICKUP_TAROTCARD:
    case PickupVariant.PICKUP_PILL:
    case PickupVariant.PICKUP_GRAB_BAG:
      return getCoinVal(pickup) * 2;
  }
}

function copyWeights(
  source: Map<
    number,
    {
      weight: number;
      cost: number;
    }
  >,
): Map<
  number,
  {
    weight: number;
    cost: number;
  }
> {
  const out = new Map<
    number,
    {
      weight: number;
      cost: number;
    }
  >();

  for (const [key, value] of source.entries()) {
    out.set(key, { weight: value.weight, cost: value.cost });
  }

  return out;
}

function weightedRandomPickup(
  weights: Map<
    number,
    {
      weight: number;
      cost: number;
    }
  >,
  rand: RNG,
): { variant: number; subtype: number; cost: number } {
  let sum = 0;
  for (const entry of weights) {
    sum += entry[1].weight;
  }

  let selection = rand.RandomFloat() * sum;

  for (const entry of weights) {
    if (selection < entry[1].weight) {
      const newVariant = Math.floor(entry[0] / 100);
      return {
        variant: newVariant,
        subtype: entry[0] - newVariant * 100,
        cost: entry[1].cost,
      };
    }
    selection -= entry[1].weight;
  }

  return {
    variant: PickupVariant.PICKUP_COIN,
    subtype: CoinSubType.COIN_PENNY,
    cost: 1,
  };
}

function modifyWeight(
  entry: [
    number,
    {
      weight: number;
      cost: number;
    },
  ],
  map: Map<
    number,
    {
      weight: number;
      cost: number;
    }
  >,
  spawningData: {
    neededRedHearts: number;
    totalHealth: number;
    needsCharge: boolean;
    bombs: number;
    hasGoldBomb: boolean;
    keys: number;
    hasGoldKey: boolean;
    bombChests: number;
    keyChests: number;
  },
  points: int,
): void {
  const key = entry[0];
  const value = entry[1];
  const variant = Math.floor(key / 100);
  const subtype = key - variant * 100;

  if (points < value.cost) {
    map.set(key, { weight: 0, cost: value.cost });
    return;
  }

  switch (variant) {
    case PickupVariant.PICKUP_HEART:
      map.set(key, {
        weight:
          value.weight * (1 - extMath.tanh(spawningData.totalHealth / 10)),
        cost: value.cost,
      });

      if (
        spawningData.neededRedHearts <= 0 &&
        (subtype === HeartSubType.HEART_FULL ||
          subtype === HeartSubType.HEART_HALF ||
          subtype === HeartSubType.HEART_DOUBLEPACK)
      ) {
        map.set(key, { weight: 0, cost: value.cost });
      }
      break;
    case PickupVariant.PICKUP_LIL_BATTERY:
      if (!spawningData.needsCharge) {
        map.set(key, { weight: 0, cost: value.cost });
      }
      break;
    case PickupVariant.PICKUP_BOMB:
      if (spawningData.hasGoldBomb && subtype === BombSubType.BOMB_GOLDEN) {
        map.set(key, { weight: 0, cost: value.cost });
      } else if (spawningData.hasGoldBomb) {
        map.set(key, { weight: value.weight * 0.5, cost: value.cost });
      }
      map.set(key, {
        weight:
          value.weight *
          (1 - extMath.tanh(Math.max(spawningData.bombs - 2, 0) / 12)),
        cost: value.cost,
      });
      break;
    case PickupVariant.PICKUP_KEY:
      if (spawningData.hasGoldKey && subtype === KeySubType.KEY_GOLDEN) {
        map.set(key, { weight: 0, cost: value.cost });
      } else if (spawningData.hasGoldKey) {
        map.set(key, { weight: value.weight * 0.5, cost: value.cost });
      }
      map.set(key, {
        weight:
          value.weight *
          (1 - extMath.tanh(Math.max(spawningData.keys - 2, 0) / 12)),
        cost: value.cost,
      });
      break;
    case PickupVariant.PICKUP_BOMBCHEST:
      if (spawningData.hasGoldBomb) {
        map.set(key, { weight: value.weight * 2, cost: value.cost });
      } else if (spawningData.bombs - spawningData.bombChests <= 2) {
        map.set(key, { weight: value.weight / 2, cost: value.cost });
      }
      break;
    case PickupVariant.PICKUP_LOCKEDCHEST:
      if (spawningData.hasGoldKey) {
        map.set(key, { weight: value.weight * 2, cost: value.cost });
      } else if (spawningData.keys - spawningData.keyChests <= 2) {
        map.set(key, { weight: value.weight / 2.5, cost: value.cost });
      }
      break;
    case PickupVariant.PICKUP_ETERNALCHEST:
      if (spawningData.hasGoldKey) {
        map.set(key, { weight: value.weight * 2.5, cost: value.cost });
      } else if (spawningData.keys - spawningData.keyChests <= 2) {
        map.set(key, { weight: value.weight / 10, cost: value.cost });
      } else if (spawningData.keys - spawningData.keyChests <= 6) {
        map.set(key, { weight: value.weight / 3, cost: value.cost });
      }
      break;
    default:
      break;
  }
}

function packForWeights(variant: number, subtype: number): number {
  return variant * 100 + subtype;
}
