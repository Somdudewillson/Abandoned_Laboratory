import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { randomInt } from "../../../../utils/extMath";
import { spawnPickup } from "../../../../utils/utils";

const PILL_EFF_RANKING = new Map<PillEffect, int>([
  [PillEffect.PILLEFFECT_BAD_GAS, 1],
  [PillEffect.PILLEFFECT_BAD_TRIP, -2],
  [PillEffect.PILLEFFECT_BALLS_OF_STEEL, 3],
  [PillEffect.PILLEFFECT_BOMBS_ARE_KEYS, 0],
  [PillEffect.PILLEFFECT_EXPLOSIVE_DIARRHEA, 1],
  [PillEffect.PILLEFFECT_FULL_HEALTH, 2],
  [PillEffect.PILLEFFECT_HEALTH_DOWN, -3],
  [PillEffect.PILLEFFECT_HEALTH_UP, 3],
  [PillEffect.PILLEFFECT_I_FOUND_PILLS, 0],
  [PillEffect.PILLEFFECT_PUBERTY, 0],
  [PillEffect.PILLEFFECT_PRETTY_FLY, 3],
  [PillEffect.PILLEFFECT_RANGE_DOWN, -1],
  [PillEffect.PILLEFFECT_RANGE_UP, 1],
  [PillEffect.PILLEFFECT_SPEED_DOWN, -2],
  [PillEffect.PILLEFFECT_SPEED_UP, 2],
  [PillEffect.PILLEFFECT_TEARS_DOWN, -2],
  [PillEffect.PILLEFFECT_TEARS_UP, 2],
  [PillEffect.PILLEFFECT_LUCK_DOWN, -2],
  [PillEffect.PILLEFFECT_LUCK_UP, 2],
  [PillEffect.PILLEFFECT_TELEPILLS, 0],
  [PillEffect.PILLEFFECT_48HOUR_ENERGY, -4], // Rank reduced for balance
  [PillEffect.PILLEFFECT_HEMATEMESIS, 0],
  [PillEffect.PILLEFFECT_PARALYSIS, 0],
  [PillEffect.PILLEFFECT_SEE_FOREVER, 2],
  [PillEffect.PILLEFFECT_PHEROMONES, 1],
  [PillEffect.PILLEFFECT_AMNESIA, -3],
  [PillEffect.PILLEFFECT_LEMON_PARTY, 1],
  [PillEffect.PILLEFFECT_WIZARD, -1],
  [PillEffect.PILLEFFECT_PERCS, 1],
  [PillEffect.PILLEFFECT_ADDICTED, -1],
  [PillEffect.PILLEFFECT_RELAX, 0],
  [PillEffect.PILLEFFECT_QUESTIONMARK, -3],
  [PillEffect.PILLEFFECT_LARGER, -1],
  [PillEffect.PILLEFFECT_SMALLER, 2],
  [PillEffect.PILLEFFECT_INFESTED_EXCLAMATION, 2],
  [PillEffect.PILLEFFECT_INFESTED_QUESTION, 2],
  [PillEffect.PILLEFFECT_POWER, 1],
  [PillEffect.PILLEFFECT_RETRO_VISION, -1],
  [PillEffect.PILLEFFECT_FRIENDS_TILL_THE_END, 2],
  [PillEffect.PILLEFFECT_X_LAX, 1],
  [PillEffect.PILLEFFECT_SOMETHINGS_WRONG, 1],
  [PillEffect.PILLEFFECT_IM_DROWSY, 1],
  [PillEffect.PILLEFFECT_IM_EXCITED, -2],
  [PillEffect.PILLEFFECT_IM_DROWSY, 2],
  [PillEffect.PILLEFFECT_GULP, 3],
  [PillEffect.PILLEFFECT_HORF, 1],
  [PillEffect.PILLEFFECT_SUNSHINE, 1],
  [PillEffect.PILLEFFECT_VURP, 1],
  [PillEffect.PILLEFFECT_SHOT_SPEED_DOWN, -1],
  [PillEffect.PILLEFFECT_SHOT_SPEED_UP, 1],
  [PillEffect.PILLEFFECT_EXPERIMENTAL, 0],
]);

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_PILLDISPENSER as number;
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

  // Fill pill buckets from pill color pool
  const pillBuckets = new Map<int, int[]>();
  let maxPillRank = -5;
  for (let i = 1; i < PillColor.NUM_STANDARD_PILLS; i++) {
    let pillRank = PILL_EFF_RANKING.get(itemPool.GetPillEffect(i, player));
    pillRank = pillRank == undefined ? 0 : pillRank;

    if (pillRank > maxPillRank) {
      maxPillRank = pillRank;
    }

    if (!pillBuckets.has(pillRank)) {
      pillBuckets.set(pillRank, [i]);
    } else {
      pillBuckets.get(pillRank)!.push(i);
    }
  }

  // Choose a pill rank to spawn from
  const pillRankShift = rand.RandomFloat();
  let chosenRank = maxPillRank;
  if (pillRankShift < 0.056 && pillBuckets.has(maxPillRank - 3)) {
    chosenRank -= 3;
  } else if (pillRankShift < 0.167 && pillBuckets.has(maxPillRank - 2)) {
    chosenRank -= 2;
  } else if (pillRankShift < 0.334 && pillBuckets.has(maxPillRank - 1)) {
    chosenRank -= 1;
  }

  // Spawn a pill from the chosen ranks' bucket
  const chosenPillBucket = pillBuckets.get(chosenRank)!;
  spawnPickup(
    player.Position,
    rand,
    PickupVariant.PICKUP_PILL,
    chosenPillBucket[randomInt(rand, 0, chosenPillBucket.length - 1)],
    true,
  );

  return true;
}
