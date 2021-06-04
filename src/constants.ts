import { getGlobalData, saveGlobalData, SaveType } from "./saveData";
import { toTearFlag } from "./utils";

export enum CollectibleTypeLabUtility {
  COLLECTIBLE_DISCHARGEDBATTERY = Isaac.GetItemIdByName("Discharged Battery"),
}

export enum CollectibleTypeLabUpgrade {
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
  COLLECTIBLE_ESSENCESPLITTER = Isaac.GetItemIdByName("Essence Splitter"),
  COLLECTIBLE_TELEPORT4 = Isaac.GetItemIdByName("Teleport -4.0"),
  COLLECTIBLE_SOULGENERATOR = Isaac.GetItemIdByName("Soul Generator"),
  COLLECTIBLE_PETROGLYPHOFBELIAL = Isaac.GetItemIdByName(
    "Petroglyph of Belial",
  ),
  COLLECTIBLE_SHAPEDCHARGEVEST = Isaac.GetItemIdByName("Shaped Charge Vest"),
  COLLECTIBLE_SOULREACTOR = Isaac.GetItemIdByName("Soul Reactor"),
  COLLECTIBLE_RESEALEDBOX = Isaac.GetItemIdByName("Resealed Box"),
  COLLECTIBLE_UNIVERSALKEY = Isaac.GetItemIdByName("Universal Key"),
  COLLECTIBLE_SCROLLOFAGGRESSION = Isaac.GetItemIdByName(
    "Scroll of Aggression",
  ),
  COLLECTIBLE_SCROLLOFBLOOD = Isaac.GetItemIdByName("Scroll of Blood"),
  COLLECTIBLE_SCROLLOFBLASTS = Isaac.GetItemIdByName("Scroll of Blasts"),
  COLLECTIBLE_SCROLLOFUTILITY = Isaac.GetItemIdByName("Scroll of Utility"),
  COLLECTIBLE_INACTIONREPLAY = Isaac.GetItemIdByName("Inaction Replay"),
  COLLECTIBLE_MRYOU = Isaac.GetItemIdByName("Mr. You"),
  COLLECTIBLE_TOXICVAT = Isaac.GetItemIdByName("Toxic Vat"),
  COLLECTIBLE_LAZERBLAST = Isaac.GetItemIdByName("Lazer Blast"),
  COLLECTIBLE_ALARMTRIGGER = Isaac.GetItemIdByName("Alarm Trigger"),
  COLLECTIBLE_KINETICIMPACTOR = Isaac.GetItemIdByName("Kinetic Impactor"),
  COLLECTIBLE_ITEMFABRICATOR = Isaac.GetItemIdByName("Item Fabricator"),
  COLLECTIBLE_FRIENDSEARCHER = Isaac.GetItemIdByName("Friend Searcher"),
  COLLECTIBLE_DOUBLESIDEDERASER = Isaac.GetItemIdByName("Double-Sided Eraser"),
  COLLECTIBLE_STRIKEDESIGNATOR = Isaac.GetItemIdByName("Strike Designator"),
  COLLECTIBLE_PLATEDRAZOR = Isaac.GetItemIdByName("Plated Razor"),
  COLLECTIBLE_SACRIFICEREACTOR = Isaac.GetItemIdByName("Sacrifice Reactor"),
  COLLECTIBLE_CLONEVAT = Isaac.GetItemIdByName("Clone Vat"),
  COLLECTIBLE_DEMONICNAIL = Isaac.GetItemIdByName("Demonic Nail"),
  COLLECTIBLE_AUGER = Isaac.GetItemIdByName("Auger"),
  COLLECTIBLE_TEMPEREDSHEARS = Isaac.GetItemIdByName("Tempered Shears"),
  COLLECTIBLE_BLADEDISC = Isaac.GetItemIdByName("Blade Disc"),
  COLLECTIBLE_GOLDENFLUSH = Isaac.GetItemIdByName("Golden Flush"),
  COLLECTIBLE_BRIMSTONECANNON = Isaac.GetItemIdByName("Brimstone Cannon"),
  COLLECTIBLE_SUMMARIZEDMONSTERMANUAL = Isaac.GetItemIdByName(
    "Summarized Monster Manual",
  ),
  COLLECTIBLE_COMPOSTBIN = Isaac.GetItemIdByName("Compost Bin"),
  COLLECTIBLE_SOULJAR = Isaac.GetItemIdByName("Soul Jar"),
  COLLECTIBLE_GOLDENSHARPKEY = Isaac.GetItemIdByName("Golden Sharp Key"),
  COLLECTIBLE_ACCELERATEDD10 = Isaac.GetItemIdByName("Accelerated D10"),
  COLLECTIBLE_AMPLIFIEDD8 = Isaac.GetItemIdByName("Amplified D8"),

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

export const CollectibleUpgrade: Map<number, number[]> = new Map([
  // =====Vanilla -> Vanilla Upgrades
  [
    CollectibleType.COLLECTIBLE_BUTTER_BEAN,
    [CollectibleType.COLLECTIBLE_WAIT_WHAT as number],
  ],
  [
    CollectibleType.COLLECTIBLE_TELEPORT,
    [CollectibleType.COLLECTIBLE_TELEPORT_2 as number],
  ],
  [
    CollectibleType.COLLECTIBLE_LEMON_MISHAP,
    [CollectibleType.COLLECTIBLE_FREE_LEMONADE as number],
  ],
  [
    CollectibleType.COLLECTIBLE_SCISSORS,
    [CollectibleType.COLLECTIBLE_PINKING_SHEARS as number],
  ],
  [
    CollectibleType.COLLECTIBLE_UNICORN_STUMP,
    [CollectibleType.COLLECTIBLE_MY_LITTLE_UNICORN as number],
  ],
  [
    CollectibleType.COLLECTIBLE_PONY,
    [CollectibleType.COLLECTIBLE_WHITE_PONY as number],
  ],
  [
    CollectibleType.COLLECTIBLE_BEAN,
    [CollectibleType.COLLECTIBLE_MEGA_BEAN as number],
  ],
  [
    CollectibleType.COLLECTIBLE_MOVING_BOX,
    [CollectibleType.COLLECTIBLE_BLUE_BOX as number],
  ],
  [
    CollectibleType.COLLECTIBLE_D6,
    [CollectibleType.COLLECTIBLE_ETERNAL_D6 as number],
  ],
  [
    CollectibleType.COLLECTIBLE_ETERNAL_D6,
    [CollectibleType.COLLECTIBLE_D6 as number],
  ],
  [
    CollectibleType.COLLECTIBLE_RED_CANDLE,
    [CollectibleType.COLLECTIBLE_CANDLE as number],
  ],
  [
    CollectibleType.COLLECTIBLE_CANDLE,
    [CollectibleType.COLLECTIBLE_RED_CANDLE as number],
  ],
  [
    CollectibleType.COLLECTIBLE_KIDNEY_BEAN,
    [CollectibleType.COLLECTIBLE_MEGA_BEAN as number],
  ],
  [
    CollectibleType.COLLECTIBLE_TELEPORT_2,
    [CollectibleType.COLLECTIBLE_UNDEFINED as number],
  ],
  [
    CollectibleType.COLLECTIBLE_TELEPATHY_BOOK,
    [CollectibleType.COLLECTIBLE_SPOON_BENDER as number],
  ],
  [
    CollectibleType.COLLECTIBLE_SULFUR,
    [CollectibleType.COLLECTIBLE_BRIMSTONE as number],
  ],
  [
    CollectibleType.COLLECTIBLE_BROWN_NUGGET,
    [CollectibleType.COLLECTIBLE_SPRINKLER as number],
  ],
  [
    CollectibleType.COLLECTIBLE_MY_LITTLE_UNICORN,
    [CollectibleType.COLLECTIBLE_GAMEKID as number],
  ],
  [
    CollectibleType.COLLECTIBLE_MONSTROS_TOOTH,
    [CollectibleType.COLLECTIBLE_DOCTORS_REMOTE as number],
  ],
  [
    CollectibleType.COLLECTIBLE_DATAMINER,
    [CollectibleType.COLLECTIBLE_NOTCHED_AXE as number],
  ],
  [
    CollectibleType.COLLECTIBLE_JAR_OF_FLIES,
    [CollectibleType.COLLECTIBLE_GUPPYS_HEAD as number],
  ],
  // =====New Upgraded Items=====
  [
    CollectibleType.COLLECTIBLE_BLANK_CARD,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_DIGITALCARD],
  ],
  [
    CollectibleType.COLLECTIBLE_BOOK_OF_SECRETS,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_CARTOGRAPHERTOME],
  ],
  [
    CollectibleType.COLLECTIBLE_ANARCHIST_COOKBOOK,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_ANARCHISTEBOOK],
  ],
  [
    CollectibleType.COLLECTIBLE_BOOK_OF_SHADOWS,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_SHADOWDEVICE],
  ],
  [
    CollectibleType.COLLECTIBLE_BOOK_OF_SIN,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_CHESTOFSIN],
  ],
  [
    CollectibleType.COLLECTIBLE_CLEAR_RUNE,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_RUNICAMPLIFIER],
  ],
  [
    CollectibleType.COLLECTIBLE_YUM_HEART,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_GLOWINGHEART],
  ],
  [
    CollectibleType.COLLECTIBLE_PLACEBO,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_PILLMACHINE],
  ],
  [
    CollectibleType.COLLECTIBLE_BOBS_ROTTEN_HEAD,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_JAROFHEADS],
  ],
  [
    CollectibleType.COLLECTIBLE_WOODEN_NICKEL,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_SILVERNICKEL],
  ],
  [
    CollectibleType.COLLECTIBLE_CRACK_THE_SKY,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_METALFEATHER],
  ],
  [
    CollectibleType.COLLECTIBLE_BOX_OF_SPIDERS,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_BIGBOXOFSPIDERS],
  ],
  [
    CollectibleType.COLLECTIBLE_MR_BOOM,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_BOMBDISPENSER],
  ],
  [
    CollectibleType.COLLECTIBLE_D20,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_MATTERREARRANGER],
  ],
  [
    CollectibleType.COLLECTIBLE_FORGET_ME_NOW,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_FORGETMELATER],
  ],
  [
    CollectibleType.COLLECTIBLE_BLOOD_RIGHTS,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_BLOODSAW],
  ],
  [
    CollectibleType.COLLECTIBLE_PRAYER_CARD,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_DIVINITYGENERATOR],
  ],
  [
    CollectibleType.COLLECTIBLE_SATANIC_BIBLE,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_SATANITYGENERATOR],
  ],
  [
    CollectibleType.COLLECTIBLE_GLASS_CANNON,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_TEMPEREDGLASSCANNON],
  ],
  [
    CollectibleType.COLLECTIBLE_BROKEN_GLASS_CANNON,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_TEMPEREDGLASSCANNON],
  ],
  [
    CollectibleType.COLLECTIBLE_GLOWING_HOUR_GLASS,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_ZKEY],
  ],
  [
    CollectibleType.COLLECTIBLE_MAGIC_SKIN,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_SYNTHETICSKIN],
  ],
  [
    CollectibleType.COLLECTIBLE_PAUSE,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_PAUSE2],
  ],
  [
    CollectibleType.COLLECTIBLE_SHARP_STRAW,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_BLOODSIPHON],
  ],
  [
    CollectibleType.COLLECTIBLE_EDENS_SOUL,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_ARTIFICIALSOUL],
  ],
  [CollectibleType.COLLECTIBLE_D1, [CollectibleTypeLabUpgrade.COLLECTIBLE_D2]],
  [
    CollectibleType.COLLECTIBLE_MYSTERY_GIFT,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_WEEKLYGIFT],
  ],
  [
    CollectibleType.COLLECTIBLE_COUPON,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_DISCOUNTCODE],
  ],
  [
    CollectibleType.COLLECTIBLE_DULL_RAZOR,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_ILLUSORYRAZOR],
  ],
  [
    CollectibleType.COLLECTIBLE_D12,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_PORTABLETERRAFORMER],
  ],
  [
    CollectibleType.COLLECTIBLE_ISAACS_TEARS,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_TEARRESERVOIR],
  ],
  [
    CollectibleType.COLLECTIBLE_TAMMYS_HEAD,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_WAVECANNON],
  ],
  [
    CollectibleType.COLLECTIBLE_MOMS_PAD,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_TERRORVORTEX],
  ],
  [
    CollectibleType.COLLECTIBLE_MOMS_BRA,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_PETRIFACTIONVORTEX],
  ],
  [
    CollectibleType.COLLECTIBLE_SPIDER_BUTT,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_WEBBEDVORTEX],
  ],
  [
    CollectibleType.COLLECTIBLE_HOURGLASS,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_CHRONALVORTEX],
  ],
  [
    CollectibleType.COLLECTIBLE_NECRONOMICON,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_NECROVORTEX],
  ],
  [
    CollectibleType.COLLECTIBLE_MAGIC_FINGERS,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_MICROTRANSACTION],
  ],
  [
    CollectibleType.COLLECTIBLE_MEGA_MUSH,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_CYBERMUSH],
  ],
  [
    CollectibleType.COLLECTIBLE_PLAN_C,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_PLAND],
  ],
  [
    CollectibleType.COLLECTIBLE_DEATH_CERTIFICATE,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_COUNTERFEITDEATHCERTIFICATE],
  ],
  [
    CollectibleType.COLLECTIBLE_CROOKED_PENNY,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_STRAIGHTENEDPENNY],
  ],
  [
    CollectibleType.COLLECTIBLE_RED_KEY,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_CRIMSONKEY],
  ],
  [
    CollectibleType.COLLECTIBLE_FORTUNE_COOKIE,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_DIGITALFORTUNE],
  ],
  [
    CollectibleType.COLLECTIBLE_PORTABLE_SLOT,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_VENDINGMACHINE],
  ],
  [
    CollectibleType.COLLECTIBLE_IV_BAG,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_BLOODALCHEMIZER],
  ],
  [
    CollectibleType.COLLECTIBLE_BIBLE,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_SUMMARIZEDBIBLE],
  ],
  [
    CollectibleType.COLLECTIBLE_POOP,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_CORNYPOOP],
  ],
  [
    CollectibleType.COLLECTIBLE_DIPLOPIA,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_TRIPLOPIA],
  ],
  [
    CollectibleType.COLLECTIBLE_TEAR_DETONATOR,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_OMNIDETONATOR],
  ],
  [
    CollectibleType.COLLECTIBLE_REMOTE_DETONATOR,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_OMNIDETONATOR],
  ],
  [
    CollectibleType.COLLECTIBLE_MEGA_BEAN,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_BOOSTEDBEAN],
  ],
  [
    CollectibleType.COLLECTIBLE_PLUM_FLUTE,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_PLUMORGAN],
  ],
  [
    CollectibleType.COLLECTIBLE_SPINDOWN_DICE,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_DECREMENTDICE],
  ],
  [
    CollectibleType.COLLECTIBLE_MOMS_BOTTLE_OF_PILLS,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_PILLDISPENSER],
  ],
  [
    CollectibleType.COLLECTIBLE_D4,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_AMPLIFIEDD4],
  ],
  [
    CollectibleType.COLLECTIBLE_RAZOR_BLADE,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_STEELRAZOR],
  ],
  [
    CollectibleType.COLLECTIBLE_GUPPYS_PAW,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_CYBERGUPPYSPAW],
  ],
  [
    CollectibleType.COLLECTIBLE_GUPPYS_HEAD,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_CYBERGUPPYSHEAD],
  ],
  [
    CollectibleType.COLLECTIBLE_DECK_OF_CARDS,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_CARDDISPENSER],
  ],
  [
    CollectibleType.COLLECTIBLE_METRONOME,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_OVERCLOCKEDMETRONOME],
  ],
  [
    CollectibleType.COLLECTIBLE_YUCK_HEART,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_ROTTINGHEART],
  ],
  [
    CollectibleType.COLLECTIBLE_SCOOPER,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_EYECANISTER],
  ],
  [
    CollectibleType.COLLECTIBLE_KEEPERS_BOX,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_BOXSHOP],
  ],
  [
    CollectibleType.COLLECTIBLE_POTATO_PEELER,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_ESSENCESPLITTER],
  ],
  [
    CollectibleType.COLLECTIBLE_UNDEFINED,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_TELEPORT4],
  ],
  [
    CollectibleType.COLLECTIBLE_BOOK_OF_REVELATIONS,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_SOULGENERATOR],
  ],
  [
    CollectibleType.COLLECTIBLE_BOOK_OF_BELIAL,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_PETROGLYPHOFBELIAL],
  ],
  [
    CollectibleType.COLLECTIBLE_KAMIKAZE,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_SHAPEDCHARGEVEST],
  ],
  [
    CollectibleType.COLLECTIBLE_ALABASTER_BOX,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_SOULREACTOR],
  ],
  [
    CollectibleType.COLLECTIBLE_BREATH_OF_LIFE,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_ILLUSORYRAZOR],
  ],
  [
    CollectibleType.COLLECTIBLE_BLUE_BOX,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_RESEALEDBOX],
  ],
  [
    CollectibleType.COLLECTIBLE_DADS_KEY,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_UNIVERSALKEY],
  ],
  [
    CollectibleType.COLLECTIBLE_DEAD_SEA_SCROLLS,
    [
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFAGGRESSION,
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFBLOOD,
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFBLASTS,
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFUTILITY,
    ],
  ],
  [
    CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFAGGRESSION as number,
    [
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFBLOOD,
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFBLASTS,
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFUTILITY,
    ],
  ],
  [
    CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFBLOOD as number,
    [
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFAGGRESSION,
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFBLASTS,
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFUTILITY,
    ],
  ],
  [
    CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFBLASTS as number,
    [
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFAGGRESSION,
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFBLOOD,
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFUTILITY,
    ],
  ],
  [
    CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFUTILITY as number,
    [
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFAGGRESSION,
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFBLOOD,
      CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFBLASTS,
    ],
  ],
  [
    CollectibleType.COLLECTIBLE_GAMEKID,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_INACTIONREPLAY],
  ],
  [
    CollectibleType.COLLECTIBLE_MINE_CRAFTER,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_BOMBDISPENSER],
  ],
  [
    CollectibleType.COLLECTIBLE_MR_ME,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_MRYOU],
  ],
  [
    CollectibleType.COLLECTIBLE_FREE_LEMONADE,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_TOXICVAT],
  ],
  [
    CollectibleType.COLLECTIBLE_SHOOP_DA_WHOOP,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_LAZERBLAST],
  ],
  [
    CollectibleType.COLLECTIBLE_D7,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_ALARMTRIGGER],
  ],
  [
    CollectibleType.COLLECTIBLE_WAIT_WHAT,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_KINETICIMPACTOR],
  ],
  [
    CollectibleType.COLLECTIBLE_LEMEGETON,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_ITEMFABRICATOR],
  ],
  [
    CollectibleType.COLLECTIBLE_FRIEND_FINDER,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_FRIENDSEARCHER],
  ],
  [
    CollectibleType.COLLECTIBLE_ERASER,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_DOUBLESIDEDERASER],
  ],
  [
    CollectibleType.COLLECTIBLE_DOCTORS_REMOTE,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_STRIKEDESIGNATOR],
  ],
  [
    CollectibleType.COLLECTIBLE_GOLDEN_RAZOR,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_PLATEDRAZOR],
  ],
  [
    CollectibleType.COLLECTIBLE_SACRIFICIAL_ALTAR,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_SACRIFICEREACTOR],
  ],
  [
    CollectibleType.COLLECTIBLE_CRYSTAL_BALL,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_DIGITALFORTUNE],
  ],
  [
    CollectibleType.COLLECTIBLE_BEST_FRIEND,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_CLONEVAT],
  ],
  [
    CollectibleType.COLLECTIBLE_THE_NAIL,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_DEMONICNAIL],
  ],
  [
    CollectibleType.COLLECTIBLE_WE_NEED_TO_GO_DEEPER,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_AUGER],
  ],
  [
    CollectibleType.COLLECTIBLE_PINKING_SHEARS,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_TEMPEREDSHEARS],
  ],
  [
    CollectibleType.COLLECTIBLE_BOOMERANG,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_BLADEDISC],
  ],
  [
    CollectibleType.COLLECTIBLE_FLUSH,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_GOLDENFLUSH],
  ],
  [
    CollectibleType.COLLECTIBLE_HEAD_OF_KRAMPUS,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_BRIMSTONECANNON],
  ],
  [
    CollectibleType.COLLECTIBLE_MONSTER_MANUAL,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_SUMMARIZEDMONSTERMANUAL],
  ],
  [
    CollectibleType.COLLECTIBLE_COMPOST,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_COMPOSTBIN],
  ],
  [
    CollectibleType.COLLECTIBLE_THE_JAR,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_SOULJAR],
  ],
  [
    CollectibleType.COLLECTIBLE_SHARP_KEY,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_GOLDENSHARPKEY],
  ],
  [
    CollectibleType.COLLECTIBLE_D10,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_ACCELERATEDD10],
  ],
  [
    CollectibleType.COLLECTIBLE_D8,
    [CollectibleTypeLabUpgrade.COLLECTIBLE_AMPLIFIEDD8],
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

export const LaserSubType = {
  /** A regular straight laser. */
  LASER_REGULAR: 0,
  /** A ring laser that does not move with its `parent` and ignores `timeout`. */
  LASER_STATICRING: 1,
  /** A pair of rings that shrink down on their spawn position. Does not move with `parent`. Shrink time dictated by `timeout`. */
  LASER_TARGETRINGS: 2,
  /** A ring laser that moves with its `parent` and respects `timeout`. Lacks fade-out anim. */
  LASER_SHARPRING: 3,
};

export const SHOT_SPEED_MULT = 10;

export function randomCollectible(rand: RNG): number {
  const enumEntries: Array<[string | number, string | number]> = Object.entries(
    CollectibleTypeLabUpgrade,
  );

  const randomIndex = Math.floor(rand.RandomFloat() * enumEntries.length);
  if (type(enumEntries[randomIndex][0]) === "number") {
    return enumEntries[randomIndex][0] as number;
  }
  return enumEntries[randomIndex][1] as number;
}

const UPGRADE_BLACKLIST_KEY = "upgrade_blacklist";

export function itemHasUpgrade(item: int, playerType?: int): boolean {
  const blacklistData = getGlobalData(
    SaveType.PER_RUN,
    UPGRADE_BLACKLIST_KEY,
  ) as null | int[];

  if (
    isSingleUpgrade(item) &&
    blacklistData != null &&
    blacklistData.includes(item)
  ) {
    return false;
  }

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

export function getItemUpgrade(
  rand: RNG,
  item: int,
  playerType?: int,
  deplete = false,
): number {
  if (deplete && isSingleUpgrade(item)) {
    const blacklistData = getGlobalData(
      SaveType.PER_RUN,
      UPGRADE_BLACKLIST_KEY,
    ) as null | int[];

    if (blacklistData == null) {
      saveGlobalData(SaveType.PER_RUN, UPGRADE_BLACKLIST_KEY, [item]);
    } else if (!blacklistData.includes(item)) {
      blacklistData.push(item);
      saveGlobalData(SaveType.PER_RUN, UPGRADE_BLACKLIST_KEY, blacklistData);
    }
  }

  switch (playerType) {
    case PlayerType.PLAYER_ISAAC:
      if (item === CollectibleType.COLLECTIBLE_D6) {
        return CollectibleTypeLabUpgrade.COLLECTIBLE_ENERGIZEDD6;
      }
      break;
    case PlayerType.PLAYER_MAGDALENA:
    case PlayerType.PLAYER_MAGDALENA_B:
      if (item === CollectibleType.COLLECTIBLE_YUM_HEART) {
        return CollectibleTypeLabUpgrade.COLLECTIBLE_RECONSTRUCTIVEHEART;
      }
      break;
    case PlayerType.PLAYER_JUDAS:
      if (item === CollectibleType.COLLECTIBLE_BOOK_OF_BELIAL) {
        return CollectibleTypeLabUpgrade.COLLECTIBLE_SIGILOFBELIAL;
      }
      break;
    case PlayerType.PLAYER_EVE:
      if (item === CollectibleType.COLLECTIBLE_RAZOR_BLADE) {
        return CollectibleTypeLabUpgrade.COLLECTIBLE_TEMPEREDBLADE;
      }
      break;
    case PlayerType.PLAYER_THELOST:
      if (item === CollectibleType.COLLECTIBLE_ETERNAL_D6) {
        return CollectibleTypeLabUpgrade.COLLECTIBLE_STABILIZEDETERNALD6;
      }
      break;
    case PlayerType.PLAYER_LILITH:
      if (item === CollectibleType.COLLECTIBLE_BOX_OF_FRIENDS) {
        return CollectibleTypeLabUpgrade.COLLECTIBLE_CRATEOFFRIENDS;
      }
      break;
    case PlayerType.PLAYER_KEEPER:
      if (item === CollectibleType.COLLECTIBLE_WOODEN_NICKEL) {
        return CollectibleTypeLabUpgrade.COLLECTIBLE_GOLDENNICKEL;
      }
      break;
    case PlayerType.PLAYER_XXX:
      if (item === CollectibleType.COLLECTIBLE_POOP) {
        return CollectibleTypeLabUpgrade.COLLECTIBLE_CHAOSPOOP;
      }
      break;
    default:
      break;
  }

  if (CollectibleUpgrade.has(item)) {
    const upgradeOptions = CollectibleUpgrade.get(item)!;
    return upgradeOptions[rand.RandomInt(upgradeOptions.length)];
  }

  return CollectibleType.COLLECTIBLE_NULL;
}

export function isSingleUpgrade(item: int): boolean {
  if (
    item === CollectibleType.COLLECTIBLE_DIPLOPIA ||
    item === CollectibleType.COLLECTIBLE_DEATH_CERTIFICATE
  ) {
    return true;
  }
  return false;
}

// Per-Build Constants
export const DUMP_NOUPGRADE = true;
export const DEBUG_SPAWN = true;
export const UNBALANCED = false;
export const VERSION = "0.10.19";
