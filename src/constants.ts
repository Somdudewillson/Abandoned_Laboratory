import { toTearFlag } from "./utils";

export enum CollectibleTypeLab {
  // --- Normal Upgraded Actives ---
  COLLECTIBLE_DIGITALCARD = Isaac.GetItemIdByName("Digital Card"),
  COLLECTIBLE_CARTOGRAPHERTOME = Isaac.GetItemIdByName("Cartographer's Tome"),
  COLLECTIBLE_ANARCHISTEBOOK = Isaac.GetItemIdByName("Anarchist's E-Book"),
  COLLECTIBLE_SHADOWDEVICE = Isaac.GetItemIdByName("Shadow Device"),
  COLLECTIBLE_CHESTOFSIN = Isaac.GetItemIdByName("Chest of Sin"),
  COLLECTIBLE_RUNICAMPLIFIER = Isaac.GetItemIdByName("Runic Amplifier"),
  COLLECTIBLE_GLOWINGHEART = Isaac.GetItemIdByName("Glowing Heart"),
  COLLECTIBLE_PILLMACHINE = Isaac.GetItemIdByName("Pill Replicator"),
  COLLECTIBLE_JAROFHEADS = Isaac.GetItemIdByName("Jar of Heads"),
  COLLECTIBLE_SILVERNICKEL = Isaac.GetItemIdByName("Silver Nickel"),
  COLLECTIBLE_METALFEATHER = Isaac.GetItemIdByName("Metal Feather"),
  COLLECTIBLE_BIGBOXOFSPIDERS = Isaac.GetItemIdByName("Big Box of Spiders"),
  COLLECTIBLE_BOMBDISPENSER = Isaac.GetItemIdByName("Bomb Dispenser"),
  COLLECTIBLE_MATTERREARRANGER = Isaac.GetItemIdByName("Matter Rearranger"),
  COLLECTIBLE_FORGETMELATER = Isaac.GetItemIdByName("Forget Me Later"),
  COLLECTIBLE_BLOODSAW = Isaac.GetItemIdByName("Blood Saw"),
  COLLECTIBLE_DIVINITYGENERATOR = Isaac.GetItemIdByName("Divinity Generator"),
  COLLECTIBLE_SATANITYGENERATOR = Isaac.GetItemIdByName("Satanity Generator"),
  COLLECTIBLE_TEMPEREDGLASSCANNON = Isaac.GetItemIdByName(
    "Tempered Glass Cannon",
  ),
  COLLECTIBLE_ZKEY = Isaac.GetItemIdByName("Z Key"),
  COLLECTIBLE_SYNTHETICSKIN = Isaac.GetItemIdByName("Synthetic Skin"),
  COLLECTIBLE_PAUSE2 = Isaac.GetItemIdByName("Pause 2.0"),
  COLLECTIBLE_BLOODSIPHON = Isaac.GetItemIdByName("Blood Siphon"),
  COLLECTIBLE_ARTIFICIALSOUL = Isaac.GetItemIdByName("Artificial Soul"),
  COLLECTIBLE_D2 = Isaac.GetItemIdByName("D2"),
  COLLECTIBLE_WEEKLYGIFT = Isaac.GetItemIdByName("Weekly Gift"),
  COLLECTIBLE_DISCOUNTCODE = Isaac.GetItemIdByName("Discount Code"),
  COLLECTIBLE_ILLUSORYRAZOR = Isaac.GetItemIdByName("Illusory Razor"),
  COLLECTIBLE_PORTABLETERRAFORMER = Isaac.GetItemIdByName(
    "Portable Terraformer",
  ),
  COLLECTIBLE_TEARRESERVOIR = Isaac.GetItemIdByName("Tear Reservoir"),
  COLLECTIBLE_WAVECANNON = Isaac.GetItemIdByName("Wave Cannon"),
  COLLECTIBLE_TERRORVORTEX = Isaac.GetItemIdByName("Terror Vortex"),
  COLLECTIBLE_PETRIFACTIONVORTEX = Isaac.GetItemIdByName("Petrifaction Vortex"),
  COLLECTIBLE_WEBBEDVORTEX = Isaac.GetItemIdByName("Webbed Vortex"),
  COLLECTIBLE_CHRONALVORTEX = Isaac.GetItemIdByName("Chronal Vortex"),
  COLLECTIBLE_NECROVORTEX = Isaac.GetItemIdByName("Necro Vortex"),
  COLLECTIBLE_MICROTRANSACTION = Isaac.GetItemIdByName("Microtransaction"),
  COLLECTIBLE_CYBERMUSH = Isaac.GetItemIdByName("Cyber Mush"),
  COLLECTIBLE_PLAND = Isaac.GetItemIdByName("Plan D"),
  COLLECTIBLE_COUNTERFEITDEATHCERTIFICATE = Isaac.GetItemIdByName(
    "Counterfeit Death Certificate",
  ),
  COLLECTIBLE_STRAIGHTENEDPENNY = Isaac.GetItemIdByName("Straightened Penny"),
  COLLECTIBLE_CRIMSONKEY = Isaac.GetItemIdByName("Crimson Key"),
  COLLECTIBLE_DIGITALFORTUNE = Isaac.GetItemIdByName("Digital Fortune"),
  COLLECTIBLE_VENDINGMACHINE = Isaac.GetItemIdByName("Vending Machine"),
  COLLECTIBLE_BLOODALCHEMIZER = Isaac.GetItemIdByName("Blood Alchemizer"),
  COLLECTIBLE_SUMMARIZEDBIBLE = Isaac.GetItemIdByName("Summarized Bible"),
  COLLECTIBLE_CORNYPOOP = Isaac.GetItemIdByName("Corny Poop"),
  COLLECTIBLE_TRIPLOPIA = Isaac.GetItemIdByName("Triplopia"),
  COLLECTIBLE_OMNIDETONATOR = Isaac.GetItemIdByName("Omni Detonator"),
  COLLECTIBLE_BOOSTEDBEAN = Isaac.GetItemIdByName("Boosted Bean"),
  COLLECTIBLE_PLUMORGAN = Isaac.GetItemIdByName("Plum Organ"),
  COLLECTIBLE_DECREMENTDICE = Isaac.GetItemIdByName("Decrement Dice"),
  COLLECTIBLE_PILLDISPENSER = Isaac.GetItemIdByName("Pill Dispenser"),
  COLLECTIBLE_AMPLIFIEDD4 = Isaac.GetItemIdByName("Amplified D4"),
  COLLECTIBLE_STEELRAZOR = Isaac.GetItemIdByName("Steel Razor"),
  COLLECTIBLE_CYBERGUPPYSPAW = Isaac.GetItemIdByName("Cyber Guppy's Paw"),
  COLLECTIBLE_CYBERGUPPYSHEAD = Isaac.GetItemIdByName("Cyber Guppy's Head"),
  COLLECTIBLE_CARDDISPENSER = Isaac.GetItemIdByName("Card Dispenser"),
  COLLECTIBLE_OVERCLOCKEDMETRONOME = Isaac.GetItemIdByName(
    "Overclocked Metronome",
  ),
  COLLECTIBLE_ROTTINGHEART = Isaac.GetItemIdByName("Rotting Heart"),
  COLLECTIBLE_EYECANISTER = Isaac.GetItemIdByName("Eye Canister"),
  COLLECTIBLE_BOXSHOP = Isaac.GetItemIdByName("Box Shop"),

  // --- Upgraded Starting Actives ---
  COLLECTIBLE_GOLDENNICKEL = Isaac.GetItemIdByName("Golden Nickel"),
  COLLECTIBLE_RECONSTRUCTIVEHEART = Isaac.GetItemIdByName(
    "Reconstructive Heart",
  ),
  COLLECTIBLE_STABILIZEDETERNALD6 = Isaac.GetItemIdByName(
    "Stabilized Eternal D6",
  ),
  COLLECTIBLE_ENERGIZEDD6 = Isaac.GetItemIdByName("Energized D6"),
  COLLECTIBLE_CRATEOFFRIENDS = Isaac.GetItemIdByName("Crate of Friends"),
  COLLECTIBLE_CHAOSPOOP = Isaac.GetItemIdByName("Chaos Poop"),
  COLLECTIBLE_SIGILOFBELIAL = Isaac.GetItemIdByName("Sigil of Belial"),
  COLLECTIBLE_TEMPEREDBLADE = Isaac.GetItemIdByName("Tempered Blade"),
}

export const CollectibleUpgrade: Map<CollectibleType, number> = new Map([
  // =====Vanilla -> Vanilla Upgrades
  [
    CollectibleType.COLLECTIBLE_BUTTER_BEAN,
    CollectibleType.COLLECTIBLE_WAIT_WHAT as number,
  ],
  [
    CollectibleType.COLLECTIBLE_TELEPORT,
    CollectibleType.COLLECTIBLE_TELEPORT_2 as number,
  ],
  [
    CollectibleType.COLLECTIBLE_LEMON_MISHAP,
    CollectibleType.COLLECTIBLE_FREE_LEMONADE as number,
  ],
  [
    CollectibleType.COLLECTIBLE_SCISSORS,
    CollectibleType.COLLECTIBLE_PINKING_SHEARS as number,
  ],
  [
    CollectibleType.COLLECTIBLE_UNICORN_STUMP,
    CollectibleType.COLLECTIBLE_MY_LITTLE_UNICORN as number,
  ],
  [
    CollectibleType.COLLECTIBLE_PONY,
    CollectibleType.COLLECTIBLE_WHITE_PONY as number,
  ],
  [
    CollectibleType.COLLECTIBLE_BEAN,
    CollectibleType.COLLECTIBLE_MEGA_BEAN as number,
  ],
  [
    CollectibleType.COLLECTIBLE_MOVING_BOX,
    CollectibleType.COLLECTIBLE_BLUE_BOX as number,
  ],
  [
    CollectibleType.COLLECTIBLE_D6,
    CollectibleType.COLLECTIBLE_ETERNAL_D6 as number,
  ],
  [
    CollectibleType.COLLECTIBLE_ETERNAL_D6,
    CollectibleType.COLLECTIBLE_D6 as number,
  ],
  [
    CollectibleType.COLLECTIBLE_RED_CANDLE,
    CollectibleType.COLLECTIBLE_CANDLE as number,
  ],
  [
    CollectibleType.COLLECTIBLE_CANDLE,
    CollectibleType.COLLECTIBLE_RED_CANDLE as number,
  ],
  [
    CollectibleType.COLLECTIBLE_KIDNEY_BEAN,
    CollectibleType.COLLECTIBLE_MEGA_BEAN as number,
  ],
  [
    CollectibleType.COLLECTIBLE_TELEPORT_2,
    CollectibleType.COLLECTIBLE_UNDEFINED as number,
  ],
  // =====New Upgraded Items=====
  [
    CollectibleType.COLLECTIBLE_BLANK_CARD,
    CollectibleTypeLab.COLLECTIBLE_DIGITALCARD,
  ],
  [
    CollectibleType.COLLECTIBLE_BOOK_OF_SECRETS,
    CollectibleTypeLab.COLLECTIBLE_CARTOGRAPHERTOME,
  ],
  [
    CollectibleType.COLLECTIBLE_ANARCHIST_COOKBOOK,
    CollectibleTypeLab.COLLECTIBLE_ANARCHISTEBOOK,
  ],
  [
    CollectibleType.COLLECTIBLE_BOOK_OF_SHADOWS,
    CollectibleTypeLab.COLLECTIBLE_SHADOWDEVICE,
  ],
  [
    CollectibleType.COLLECTIBLE_BOOK_OF_SIN,
    CollectibleTypeLab.COLLECTIBLE_CHESTOFSIN,
  ],
  [
    CollectibleType.COLLECTIBLE_CLEAR_RUNE,
    CollectibleTypeLab.COLLECTIBLE_RUNICAMPLIFIER,
  ],
  [
    CollectibleType.COLLECTIBLE_YUM_HEART,
    CollectibleTypeLab.COLLECTIBLE_GLOWINGHEART,
  ],
  [
    CollectibleType.COLLECTIBLE_PLACEBO,
    CollectibleTypeLab.COLLECTIBLE_PILLMACHINE,
  ],
  [
    CollectibleType.COLLECTIBLE_BOBS_ROTTEN_HEAD,
    CollectibleTypeLab.COLLECTIBLE_JAROFHEADS,
  ],
  [
    CollectibleType.COLLECTIBLE_WOODEN_NICKEL,
    CollectibleTypeLab.COLLECTIBLE_SILVERNICKEL,
  ],
  [
    CollectibleType.COLLECTIBLE_CRACK_THE_SKY,
    CollectibleTypeLab.COLLECTIBLE_METALFEATHER,
  ],
  [
    CollectibleType.COLLECTIBLE_BOX_OF_SPIDERS,
    CollectibleTypeLab.COLLECTIBLE_BIGBOXOFSPIDERS,
  ],
  [
    CollectibleType.COLLECTIBLE_MR_BOOM,
    CollectibleTypeLab.COLLECTIBLE_BOMBDISPENSER,
  ],
  [
    CollectibleType.COLLECTIBLE_D20,
    CollectibleTypeLab.COLLECTIBLE_MATTERREARRANGER,
  ],
  [
    CollectibleType.COLLECTIBLE_FORGET_ME_NOW,
    CollectibleTypeLab.COLLECTIBLE_FORGETMELATER,
  ],
  [
    CollectibleType.COLLECTIBLE_BLOOD_RIGHTS,
    CollectibleTypeLab.COLLECTIBLE_BLOODSAW,
  ],
  [
    CollectibleType.COLLECTIBLE_PRAYER_CARD,
    CollectibleTypeLab.COLLECTIBLE_DIVINITYGENERATOR,
  ],
  [
    CollectibleType.COLLECTIBLE_SATANIC_BIBLE,
    CollectibleTypeLab.COLLECTIBLE_SATANITYGENERATOR,
  ],
  [
    CollectibleType.COLLECTIBLE_GLASS_CANNON,
    CollectibleTypeLab.COLLECTIBLE_TEMPEREDGLASSCANNON,
  ],
  [
    CollectibleType.COLLECTIBLE_BROKEN_GLASS_CANNON,
    CollectibleTypeLab.COLLECTIBLE_TEMPEREDGLASSCANNON,
  ],
  [
    CollectibleType.COLLECTIBLE_GLOWING_HOUR_GLASS,
    CollectibleTypeLab.COLLECTIBLE_ZKEY,
  ],
  [
    CollectibleType.COLLECTIBLE_MAGIC_SKIN,
    CollectibleTypeLab.COLLECTIBLE_SYNTHETICSKIN,
  ],
  [CollectibleType.COLLECTIBLE_PAUSE, CollectibleTypeLab.COLLECTIBLE_PAUSE2],
  [
    CollectibleType.COLLECTIBLE_SHARP_STRAW,
    CollectibleTypeLab.COLLECTIBLE_BLOODSIPHON,
  ],
  [
    CollectibleType.COLLECTIBLE_EDENS_SOUL,
    CollectibleTypeLab.COLLECTIBLE_ARTIFICIALSOUL,
  ],
  [CollectibleType.COLLECTIBLE_D1, CollectibleTypeLab.COLLECTIBLE_D2],
  [
    CollectibleType.COLLECTIBLE_MYSTERY_GIFT,
    CollectibleTypeLab.COLLECTIBLE_WEEKLYGIFT,
  ],
  [
    CollectibleType.COLLECTIBLE_COUPON,
    CollectibleTypeLab.COLLECTIBLE_DISCOUNTCODE,
  ],
  [
    CollectibleType.COLLECTIBLE_DULL_RAZOR,
    CollectibleTypeLab.COLLECTIBLE_ILLUSORYRAZOR,
  ],
  [
    CollectibleType.COLLECTIBLE_D12,
    CollectibleTypeLab.COLLECTIBLE_PORTABLETERRAFORMER,
  ],
  [
    CollectibleType.COLLECTIBLE_ISAACS_TEARS,
    CollectibleTypeLab.COLLECTIBLE_TEARRESERVOIR,
  ],
  [
    CollectibleType.COLLECTIBLE_TAMMYS_HEAD,
    CollectibleTypeLab.COLLECTIBLE_WAVECANNON,
  ],
  [
    CollectibleType.COLLECTIBLE_MOMS_PAD,
    CollectibleTypeLab.COLLECTIBLE_TERRORVORTEX,
  ],
  [
    CollectibleType.COLLECTIBLE_MOMS_BRA,
    CollectibleTypeLab.COLLECTIBLE_PETRIFACTIONVORTEX,
  ],
  [
    CollectibleType.COLLECTIBLE_SPIDER_BUTT,
    CollectibleTypeLab.COLLECTIBLE_WEBBEDVORTEX,
  ],
  [
    CollectibleType.COLLECTIBLE_HOURGLASS,
    CollectibleTypeLab.COLLECTIBLE_CHRONALVORTEX,
  ],
  [
    CollectibleType.COLLECTIBLE_NECRONOMICON,
    CollectibleTypeLab.COLLECTIBLE_NECROVORTEX,
  ],
  [
    CollectibleType.COLLECTIBLE_MAGIC_FINGERS,
    CollectibleTypeLab.COLLECTIBLE_MICROTRANSACTION,
  ],
  [
    CollectibleType.COLLECTIBLE_MEGA_MUSH,
    CollectibleTypeLab.COLLECTIBLE_CYBERMUSH,
  ],
  [CollectibleType.COLLECTIBLE_PLAN_C, CollectibleTypeLab.COLLECTIBLE_PLAND],
  [
    CollectibleType.COLLECTIBLE_DEATH_CERTIFICATE,
    CollectibleTypeLab.COLLECTIBLE_COUNTERFEITDEATHCERTIFICATE,
  ],
  [
    CollectibleType.COLLECTIBLE_CROOKED_PENNY,
    CollectibleTypeLab.COLLECTIBLE_STRAIGHTENEDPENNY,
  ],
  [
    CollectibleType.COLLECTIBLE_RED_KEY,
    CollectibleTypeLab.COLLECTIBLE_CRIMSONKEY,
  ],
  [
    CollectibleType.COLLECTIBLE_FORTUNE_COOKIE,
    CollectibleTypeLab.COLLECTIBLE_DIGITALFORTUNE,
  ],
  [
    CollectibleType.COLLECTIBLE_PORTABLE_SLOT,
    CollectibleTypeLab.COLLECTIBLE_VENDINGMACHINE,
  ],
  [
    CollectibleType.COLLECTIBLE_IV_BAG,
    CollectibleTypeLab.COLLECTIBLE_BLOODALCHEMIZER,
  ],
  [
    CollectibleType.COLLECTIBLE_BIBLE,
    CollectibleTypeLab.COLLECTIBLE_SUMMARIZEDBIBLE,
  ],
  [CollectibleType.COLLECTIBLE_POOP, CollectibleTypeLab.COLLECTIBLE_CORNYPOOP],
  [
    CollectibleType.COLLECTIBLE_DIPLOPIA,
    CollectibleTypeLab.COLLECTIBLE_TRIPLOPIA,
  ],
  [
    CollectibleType.COLLECTIBLE_TEAR_DETONATOR,
    CollectibleTypeLab.COLLECTIBLE_OMNIDETONATOR,
  ],
  [
    CollectibleType.COLLECTIBLE_REMOTE_DETONATOR,
    CollectibleTypeLab.COLLECTIBLE_OMNIDETONATOR,
  ],
  [
    CollectibleType.COLLECTIBLE_MEGA_BEAN,
    CollectibleTypeLab.COLLECTIBLE_BOOSTEDBEAN,
  ],
  [
    CollectibleType.COLLECTIBLE_PLUM_FLUTE,
    CollectibleTypeLab.COLLECTIBLE_PLUMORGAN,
  ],
  [
    CollectibleType.COLLECTIBLE_SPINDOWN_DICE,
    CollectibleTypeLab.COLLECTIBLE_DECREMENTDICE,
  ],
  [
    CollectibleType.COLLECTIBLE_MOMS_BOTTLE_OF_PILLS,
    CollectibleTypeLab.COLLECTIBLE_PILLDISPENSER,
  ],
  [CollectibleType.COLLECTIBLE_D4, CollectibleTypeLab.COLLECTIBLE_AMPLIFIEDD4],
  [
    CollectibleType.COLLECTIBLE_RAZOR_BLADE,
    CollectibleTypeLab.COLLECTIBLE_STEELRAZOR,
  ],
  [
    CollectibleType.COLLECTIBLE_GUPPYS_PAW,
    CollectibleTypeLab.COLLECTIBLE_CYBERGUPPYSPAW,
  ],
  [
    CollectibleType.COLLECTIBLE_GUPPYS_HEAD,
    CollectibleTypeLab.COLLECTIBLE_CYBERGUPPYSHEAD,
  ],
  [
    CollectibleType.COLLECTIBLE_DECK_OF_CARDS,
    CollectibleTypeLab.COLLECTIBLE_CARDDISPENSER,
  ],
  [
    CollectibleType.COLLECTIBLE_METRONOME,
    CollectibleTypeLab.COLLECTIBLE_OVERCLOCKEDMETRONOME,
  ],
  [
    CollectibleType.COLLECTIBLE_YUCK_HEART,
    CollectibleTypeLab.COLLECTIBLE_ROTTINGHEART,
  ],
  [
    CollectibleType.COLLECTIBLE_SCOOPER,
    CollectibleTypeLab.COLLECTIBLE_EYECANISTER,
  ],
  [
    CollectibleType.COLLECTIBLE_KEEPERS_BOX,
    CollectibleTypeLab.COLLECTIBLE_BOXSHOP,
  ],
]);

export const enum FireplaceVariant {
  FIREPLACE_NORMAL = 0,
  FIREPLACE_RED = 1,
  FIREPLACE_BLUE = 2,
  FIREPLACE_PURPLE = 3,
  FIREPLACE_WHITE = 4,
  FIREPLACE_MOVEABLE = 10,
  COAL = 11,
  FIREPLACE_MOVEABLE_BLUE = 12,
  FIREPLACE_MOVEABLE_PURPLE = 13,
}

export const enum LabMachineVariant {
  UPGRADE_MACHINE = 56,
}

export const TearFlag128 = {
  TEAR_NORMAL: BitSet128(0, 0),
  TEAR_SPECTRAL: toTearFlag(0),
  TEAR_PIERCING: toTearFlag(1),
  TEAR_HOMING: toTearFlag(2),
  TEAR_SLOW: toTearFlag(3),
  TEAR_POISON: toTearFlag(4),
  TEAR_FREEZE: toTearFlag(5),
  TEAR_SPLIT: toTearFlag(6),
  TEAR_GROW: toTearFlag(7),
  TEAR_BOOMERANG: toTearFlag(8),
  TEAR_PERSISTENT: toTearFlag(9),
  TEAR_WIGGLE: toTearFlag(10),
  TEAR_MULLIGAN: toTearFlag(11),
  TEAR_EXPLOSIVE: toTearFlag(12),
  TEAR_CHARM: toTearFlag(13),
  TEAR_CONFUSION: toTearFlag(14),
  TEAR_HP_DROP: toTearFlag(15),
  TEAR_ORBIT: toTearFlag(16),
  TEAR_WAIT: toTearFlag(17),
  TEAR_QUADSPLIT: toTearFlag(18),
  TEAR_BOUNCE: toTearFlag(19),
  TEAR_FEAR: toTearFlag(20),
  TEAR_SHRINK: toTearFlag(21),
  TEAR_BURN: toTearFlag(22),
  TEAR_ATTRACTOR: toTearFlag(23),
  TEAR_KNOCKBACK: toTearFlag(24),
  TEAR_PULSE: toTearFlag(25),
  TEAR_SPIRAL: toTearFlag(26),
  TEAR_FLAT: toTearFlag(27),
  TEAR_SAD_BOMB: toTearFlag(28),
  TEAR_BUTT_BOMB: toTearFlag(29),
  TEAR_SQUARE: toTearFlag(30),
  TEAR_GLOW: toTearFlag(31),
  TEAR_GISH: toTearFlag(32),
  TEAR_MYSTERIOUS_LIQUID_CREEP: toTearFlag(33),
  TEAR_SHIELDED: toTearFlag(34),
  TEAR_GLITTER_BOMB: toTearFlag(35),
  TEAR_SCATTER_BOMB: toTearFlag(36),
  TEAR_STICKY: toTearFlag(37),
  TEAR_CONTINUUM: toTearFlag(38),
  TEAR_LIGHT_FROM_HEAVEN: toTearFlag(39),
  TEAR_COIN_DROP: toTearFlag(40),
  TEAR_BLACK_HP_DROP: toTearFlag(41),
  TEAR_TRACTOR_BEAM: toTearFlag(42),
  TEAR_GODS_FLESH: toTearFlag(43),
  TEAR_GREED_COIN: toTearFlag(44),
  TEAR_CROSS_BOMB: toTearFlag(45),
  TEAR_BIG_SPIRAL: toTearFlag(46),
  TEAR_PERMANENT_CONFUSION: toTearFlag(47),
  TEAR_BOOGER: toTearFlag(48),
  TEAR_EGG: toTearFlag(49),
  TEAR_ACID: toTearFlag(50),
  TEAR_BONE: toTearFlag(51),
  TEAR_BELIAL: toTearFlag(52),
  TEAR_MIDAS: toTearFlag(53),
  TEAR_NEEDLE: toTearFlag(54),
  TEAR_JACOBS: toTearFlag(55),
  TEAR_HORN: toTearFlag(56),
  TEAR_LASER: toTearFlag(57),
  TEAR_POP: toTearFlag(58),
  TEAR_ABSORB: toTearFlag(59),
  TEAR_LASERSHOT: toTearFlag(60),
  TEAR_HYDROBOUNCE: toTearFlag(61),
  TEAR_BURSTSPLIT: toTearFlag(62),
  TEAR_CREEP_TRAIL: toTearFlag(63),
  TEAR_PUNCH: toTearFlag(64),
  TEAR_ICE: toTearFlag(65),
  TEAR_MAGNETIZE: toTearFlag(66),
  TEAR_BAIT: toTearFlag(67),
  TEAR_OCCULT: toTearFlag(68),
  TEAR_ORBIT_ADVANCED: toTearFlag(69),
  TEAR_ROCK: toTearFlag(70),
  TEAR_TURN_HORIZONTAL: toTearFlag(71),
  TEAR_BLOOD_BOMB: toTearFlag(72),
  TEAR_ECOLI: toTearFlag(73),
  TEAR_COIN_DROP_DEATH: toTearFlag(74),
  TEAR_BRIMSTONE_BOMB: toTearFlag(75),
  TEAR_RIFT: toTearFlag(76),
  TEAR_SPORE: toTearFlag(77),
  TEAR_GHOST_BOMB: toTearFlag(78),
  TEAR_CARD_DROP_DEATH: toTearFlag(79),
  TEAR_RUNE_DROP_DEATH: toTearFlag(80),
  TEAR_TELEPORT: toTearFlag(81),
  TEAR_REROLL_ROCK_WISP: toTearFlag(115),
  TEAR_MOM_STOMP_WISP: toTearFlag(116),
  TEAR_ENEMY_TO_WISP: toTearFlag(117),
  TEAR_REROLL_ENEMY: toTearFlag(118),
  TEAR_GIGA_BOMB: toTearFlag(119),
  TEAR_EXTRA_GORE: toTearFlag(120),
  TEAR_RAINBOW: toTearFlag(121),
  TEAR_DETONATE: toTearFlag(122),
  TEAR_CHAIN: toTearFlag(123),
  TEAR_DARK_MATTER: toTearFlag(124),
  TEAR_GOLDEN_BOMB: toTearFlag(125),
  TEAR_FAST_BOMB: toTearFlag(126),
  TEAR_LUDOVICO: toTearFlag(127),
};

export const SHOT_SPEED_MULT = 10;

export function randomCollectible(rand: RNG): number {
  const enumEntries: Array<[string | number, string | number]> =
    Object.entries(CollectibleTypeLab);

  const randomIndex = Math.floor(rand.RandomFloat() * enumEntries.length);
  if (type(enumEntries[randomIndex][0]) === "number") {
    return enumEntries[randomIndex][0] as number;
  }
  return enumEntries[randomIndex][1] as number;
}

export function itemHasUpgrade(item: int, playerType?: int): boolean {
  if (CollectibleUpgrade.has(item)) {
    return true;
  }

  switch (playerType) {
    case PlayerType.PLAYER_ISAAC:
      return item === CollectibleType.COLLECTIBLE_D6;
    case PlayerType.PLAYER_MAGDALENA:
    case PlayerType.PLAYER_MAGDALENA_B:
      return item === CollectibleType.COLLECTIBLE_YUM_HEART;
    case PlayerType.PLAYER_JUDAS:
      return item === CollectibleType.COLLECTIBLE_BOOK_OF_BELIAL;
    case PlayerType.PLAYER_EVE:
      return item === CollectibleType.COLLECTIBLE_RAZOR_BLADE;
    case PlayerType.PLAYER_THELOST:
      return item === CollectibleType.COLLECTIBLE_ETERNAL_D6;
    case PlayerType.PLAYER_LILITH:
      return item === CollectibleType.COLLECTIBLE_BOX_OF_FRIENDS;
    case PlayerType.PLAYER_KEEPER:
      return item === CollectibleType.COLLECTIBLE_WOODEN_NICKEL;
    case PlayerType.PLAYER_XXX:
      return item === CollectibleType.COLLECTIBLE_POOP;
    default:
      return false;
  }
}

export function getItemUpgrade(item: int, playerType?: int): number {
  switch (playerType) {
    case PlayerType.PLAYER_ISAAC:
      if (item === CollectibleType.COLLECTIBLE_D6) {
        return CollectibleTypeLab.COLLECTIBLE_ENERGIZEDD6;
      }
      break;
    case PlayerType.PLAYER_MAGDALENA:
    case PlayerType.PLAYER_MAGDALENA_B:
      if (item === CollectibleType.COLLECTIBLE_YUM_HEART) {
        return CollectibleTypeLab.COLLECTIBLE_RECONSTRUCTIVEHEART;
      }
      break;
    case PlayerType.PLAYER_JUDAS:
      if (item === CollectibleType.COLLECTIBLE_BOOK_OF_BELIAL) {
        return CollectibleTypeLab.COLLECTIBLE_SIGILOFBELIAL;
      }
      break;
    case PlayerType.PLAYER_EVE:
      if (item === CollectibleType.COLLECTIBLE_RAZOR_BLADE) {
        return CollectibleTypeLab.COLLECTIBLE_TEMPEREDBLADE;
      }
      break;
    case PlayerType.PLAYER_THELOST:
      if (item === CollectibleType.COLLECTIBLE_ETERNAL_D6) {
        return CollectibleTypeLab.COLLECTIBLE_STABILIZEDETERNALD6;
      }
      break;
    case PlayerType.PLAYER_LILITH:
      if (item === CollectibleType.COLLECTIBLE_BOX_OF_FRIENDS) {
        return CollectibleTypeLab.COLLECTIBLE_CRATEOFFRIENDS;
      }
      break;
    case PlayerType.PLAYER_KEEPER:
      if (item === CollectibleType.COLLECTIBLE_WOODEN_NICKEL) {
        return CollectibleTypeLab.COLLECTIBLE_GOLDENNICKEL;
      }
      break;
    case PlayerType.PLAYER_XXX:
      if (item === CollectibleType.COLLECTIBLE_POOP) {
        return CollectibleTypeLab.COLLECTIBLE_CHAOSPOOP;
      }
      break;
    default:
      break;
  }

  if (CollectibleUpgrade.has(item)) {
    return CollectibleUpgrade.get(item)!;
  }

  return CollectibleType.COLLECTIBLE_NULL;
}

// Per-Build Constants
export const DUMP_NOUPGRADE = true;
export const DEBUG_SPAWN = true;
export const UNBALANCED = false;
export const VERSION = "0.7.5";
