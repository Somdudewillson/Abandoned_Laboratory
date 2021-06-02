import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { randomInt } from "../../../../extMath";
import { spawnPickup } from "../../../../utils";

const CARD_BUCKETS = new Map<int, int[]>([
  [
    6,
    [
      Card.CARD_QUESTIONMARK,
      Card.CARD_WILD,
      Card.CARD_DICE_SHARD,
      Card.CARD_CRACKED_KEY,
    ],
  ],
  [
    5,
    [
      Card.CARD_REVERSE_HIEROPHANT,
      Card.CARD_REVERSE_LOVERS,
      Card.CARD_REVERSE_MOON,
      Card.CARD_JOKER,
      Card.CARD_CHAOS,
      Card.CARD_CREDIT,
    ],
  ],
  [
    4,
    [
      Card.CARD_HIEROPHANT,
      Card.CARD_REVERSE_MAGICIAN,
      Card.CARD_REVERSE_CHARIOT,
      Card.CARD_REVERSE_STRENGTH,
      Card.CARD_REVERSE_WORLD,
      Card.CARD_ACE_OF_HEARTS,
      Card.CARD_QUEEN_OF_HEARTS,
    ],
  ],
  [
    3,
    [
      Card.CARD_EMPRESS,
      Card.CARD_STRENGTH,
      Card.CARD_DEATH,
      Card.CARD_DEVIL,
      Card.CARD_SUN,
      Card.CARD_DIAMONDS_2,
      Card.CARD_ACE_OF_CLUBS,
      Card.CARD_ACE_OF_SPADES,
      Card.CARD_ACE_OF_DIAMONDS,
      Card.CARD_HUGE_GROWTH,
      Card.CARD_ERA_WALK,
      Card.CARD_HOLY,
    ],
  ],
  [
    2,
    [
      Card.CARD_MAGICIAN,
      Card.CARD_HIGH_PRIESTESS,
      Card.CARD_CHARIOT,
      Card.CARD_JUSTICE,
      Card.CARD_HANGED_MAN,
      Card.CARD_WORLD,
      Card.CARD_REVERSE_JUSTICE,
      Card.CARD_REVERSE_DEATH,
      Card.CARD_REVERSE_DEVIL,
      Card.CARD_REVERSE_JUDGEMENT,
      Card.CARD_CLUBS_2,
      Card.CARD_SPADES_2,
      Card.CARD_HEARTS_2,
      Card.CARD_ANCIENT_RECALL,
      Card.CARD_GET_OUT_OF_JAIL,
      Card.CARD_EMERGENCY_CONTACT,
    ],
  ],
  [
    1,
    [
      Card.CARD_FOOL,
      Card.CARD_LOVERS,
      Card.CARD_HERMIT,
      Card.CARD_STARS,
      Card.CARD_MOON,
      Card.CARD_REVERSE_EMPEROR,
      Card.CARD_REVERSE_HERMIT,
      Card.CARD_REVERSE_HANGED_MAN,
      Card.CARD_REVERSE_SUN,
      Card.CARD_HUMANITY,
    ],
  ],
  [
    0,
    [
      Card.CARD_EMPEROR,
      Card.CARD_WHEEL_OF_FORTUNE,
      Card.CARD_TEMPERANCE,
      Card.CARD_JUDGEMENT,
      Card.CARD_REVERSE_FOOL,
      Card.CARD_REVERSE_WHEEL_OF_FORTUNE,
      Card.CARD_REVERSE_TOWER,
    ],
  ],
  [
    -1,
    [
      Card.CARD_TOWER,
      Card.CARD_REVERSE_HIGH_PRIESTESS,
      Card.CARD_REVERSE_TEMPERANCE,
      Card.CARD_SUICIDE_KING,
      Card.CARD_RULES,
    ],
  ],
]);

const RANK_WEIGHTS = [
  { weight: 1, value: 6 },
  { weight: 40, value: 5 },
  { weight: 80, value: 4 },
  { weight: 120, value: 3 },
  { weight: 160, value: 2 },
  { weight: 200, value: 1 },
  { weight: 100, value: 0 },
  { weight: 25, value: -1 },
];

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_CARDDISPENSER as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  // Choose a card rank to spawn from
  const chosenRank = weightedRandom(RANK_WEIGHTS, rand);

  // Spawn a pill from the chosen ranks' bucket
  const chosenCardBucket = CARD_BUCKETS.get(chosenRank)!;
  spawnPickup(
    player.Position,
    rand,
    PickupVariant.PICKUP_TAROTCARD,
    chosenCardBucket[randomInt(rand, 0, chosenCardBucket.length - 1)],
    true,
  );

  return true;
}

function weightedRandom(
  weights: Array<{ weight: int; value: int }>,
  rand: RNG,
): int {
  let sum = 0;
  for (const entry of weights) {
    sum += entry.weight;
  }

  let selection = rand.RandomFloat() * sum;

  for (const entry of weights) {
    if (selection < entry.weight) {
      return entry.value;
    }
    selection -= entry.weight;
  }

  return 0;
}
