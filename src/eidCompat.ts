/* eslint-disable no-useless-concat */
import { CollectibleTypeLabUpgrade } from "./constants";

export function registerExternalItemDescriptions(): void {
  // =====Upgraded Vanilla Items=====
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_DIGITALCARD,
    "Copies & boosts card effects",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_CARTOGRAPHERTOME,
    "Gives all mapping effects",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ANARCHISTEBOOK,
    "Spawns troll bombs on enemies and tinted rocks",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SHADOWDEVICE,
    "Gives invulnerability for 10 seconds" +
      "#↑ Can trigger and block damage, more likely with higher charge",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_CHESTOFSIN,
    "Spawns 2-3 random pickups",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_RUNICAMPLIFIER,
    "Copies & boosts rune effects",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_GLOWINGHEART,
    "Heals 2.5 {{Heart}}" +
      "#↑ Excess becomes {{SoulHeart}} at 3:1 ratio" +
      "#↑ Spawns 2 {{Coin}} for Keeper" +
      "#↑ Adds to Bethany's soul/heart charges" +
      "#↑ Heals other players for half the effect",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_PILLMACHINE,
    "Copies & boosts pill effects",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_JAROFHEADS,
    "Summons a throwable bomb",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SILVERNICKEL,
    "75% chance to spawn coins" +
      "#90% chance 1-5" +
      "#9% chance 5-10" +
      "#1% chance 10-15",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_METALFEATHER,
    "Spawns damaging beams of light on enemies" +
      "#Spawns more on enemies with more health",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_BIGBOXOFSPIDERS,
    "Spawns 8-16 Blue Spiders",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_BOMBDISPENSER,
    "Spawns an active bomb",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_MATTERREARRANGER,
    "Consumes and converts pickups" + "#Tries to give you what you need",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_FORGETMELATER,
    "Rerolls & restarts the floor without changing the player" +
      "#↓ Cannot be charged by {{Battery}} effects",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_BLOODSAW,
    "Deals 80 damage to all enemies" +
      "#↓ Takes 1 full heart, prioritizing red health" +
      `#↑ {{Collectible${CollectibleType.COLLECTIBLE_MISSING_PAGE_2}}} adds 80 additional damage` +
      `#↑ {{Trinket${TrinketType.TRINKET_MISSING_PAGE}}} adds 80 additional damage`,
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_DIVINITYGENERATOR,
    "Gives {{EthernalHeart}}",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SATANITYGENERATOR,
    "Gives {{BlackHeart}}",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_TEMPEREDGLASSCANNON,
    "fires one tear with 10 times player damage",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ZKEY,
    "Undoes the current room" + "#↓ Only charges in rooms with enemies",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SYNTHETICSKIN,
    "Spawns one item from the current room's item pool" +
      "#↓ Consumes {{Heart}} or {{SoulHeart}}{{SoulHeart}} and gives one broken heart" +
      "#!!! Can kill the player",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_PAUSE2,
    "Freezes all enemies until a fire button is pressed or 30 seconds pass",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_BLOODSIPHON,
    "Deals 5 + player damage + 15% of the enemy's max health to all enemies" +
      "#↑ 10% chance to spawn a half heart - 8% {{HalfHeart}} and 2% {{HalfSoulHeart}}",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ARTIFICIALSOUL,
    "Spawns 2 items from the current room's item pool" +
      "#↓ Charges by exploring the floor, 90% exploration necessary for full charge" +
      "#!!! Secret and Super Secret rooms count" +
      "#!!! Charges do not carry over between floors" +
      "#↓ One use per floor",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_D2,
    "Creates two copies of a random pickup in the room" +
      "#↓ Cannot copy {{Rune}}Jera",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_WEEKLYGIFT,
    "Spawns one item from the current room's item pool" +
      "#↓ Charges when entering a new floor",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_DISCOUNTCODE,
    "Makes one purchasable item free" +
      "#While fully charged, store prices reduced by 60%" +
      "#!!! Sale effect will stop if the item is used",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ILLUSORYRAZOR,
    "Deals fake damage to the player, triggering on-hit effects",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_PORTABLETERRAFORMER,
    "Alters room obstacles" +
      "#↑ Destroys most rocks, with a chance for extra drops" +
      "#↑ Fills in all pits" +
      "#↑ Spiked rocks and metal blocks become normal rocks" +
      "#↑ Poop becomes better poop" +
      "#↑ Rocks have a 10% chance to become tinted",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_TEARRESERVOIR,
    "Fires a burst of 7 tears with player damage in a cone" +
      "#Charges one bar for each fired tear" +
      `#!!! Does not work with {{Collectible${CollectibleType.COLLECTIBLE_BRIMSTONE}}}`,
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_WAVECANNON,
    "Fires a burst of 19 tears with player damage in a wave formation" +
      "#↑ Wave tears are Spectral, Piercing, and bounce off the ground" +
      "#↑ Wave tears have a 500% knockback modifier",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_TERRORVORTEX,
    "Gives all enemies the Fear effect for 5 seconds" +
      "#Deals 10 + the player's damage to all enemies",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_PETRIFACTIONVORTEX,
    "Petrifies all enemies for 4.5 seconds" +
      "#Deals 10 + the player's damage to all enemies",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_WEBBEDVORTEX,
    "Slows all enemies for 4.5 seconds" +
      "#Deals 25 + the player's damage to all enemies" +
      "#↑ Enemies killed by this damage have a chance to spawn Blue Spiders based on their maximum health",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_CHRONALVORTEX,
    "Slows all enemies for 4.5 seconds" +
      "#Deals 10 + the player's damage to all enemies",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_NECROVORTEX,
    "# Deals 20 damage to all enemies" +
      `#↑ {{Collectible${CollectibleType.COLLECTIBLE_MISSING_PAGE_2}}} adds 20 additional damage` +
      `#↑ {{Trinket${TrinketType.TRINKET_MISSING_PAGE}}} adds 20 additional damage`,
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_MICROTRANSACTION,
    "Takes 1-5 {{Coin}} from the player and deals damage to all enemies" +
      "#Damage scales with the amount of {{Coin}} taken, from 20 + 2 * player damage to 40 + 4 * player damage" +
      "#↑ If 5 {{Coin}} are taken, there is a 2.5% chance to get a permanent {{ColorGreen}}+1.0{{CR}} Luck Up",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_CYBERMUSH,
    "Gigantifies player for 30 seconds" +
      "#↑ Player is invulnerable while giant" +
      "#↑ Player can crush obstacles and enemies while giant" +
      "#↑ Increases Damage and Range while giant" +
      "#↓ Reduces Tears while giant",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_PLAND,
    "Kills every enemy in the room that isn't invulnerable" +
      "#Single-use" +
      "#!!! Reduces player to 1 half-heart of health" +
      "#!!! Will not kill both stages of multi-stage bosses",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_COUNTERFEITDEATHCERTIFICATE,
    "Takes the player to an area with all items" +
      "#One item can be taken from this area, which will destroy all other items in the room and send the player back" +
      `#Single-use, but gives the player {{Collectible${CollectibleType.COLLECTIBLE_DEATH_CERTIFICATE}}}, which has the same effect`,
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_STRAIGHTENEDPENNY,
    "↑ 75% chance to double all pickups and collectibles" +
      "↓ 25% chance to destroy all pickups and collectibles, and spawn a single Nickel",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_CRIMSONKEY,
    "Opens all doors and possible Red Rooms" +
      "# Charges itself if you end up in an I AM ERROR room, and teleports you back to the start of the floor on use",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_DIGITALFORTUNE,
    "Spawns 1-2 {{SoulHeart}}, a {{Card}}, or a {{Trinket}}" +
      "#↑ Reveals the full map",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_VENDINGMACHINE,
    "Consumes 2 coins and has a Luck-based chance to do nothing or spawn one of the following:" +
      "#1-2 {{Heart}} (29%)" +
      "#1 {{Bomb}} (24%)" +
      "#1 {{Key}} (23%)" +
      "#3 {{Coin}} (20%)" +
      "#A Pretty Fly (2%)" +
      "#↑ Treats negative Luck as 0 Luck",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_BLOODALCHEMIZER,
    "Consumes 1 half-heart of health and spawns 1-4 {{Coin}}" +
      "#!!! Will instead spawn 2-4 Blue Flies for the Keeper",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SUMMARIZEDBIBLE,
    "Gives flight for the current room" +
      "#↑ Instantly kills Mom, Mom's Heart, and It Lives" +
      "#!!! Will instantly kill you if used while fighting Satan",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_CORNYPOOP,
    "Spawns a poop, pushes away enemies and bullets" +
      "#↓ Poop has reduced drops",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_TRIPLOPIA,
    "Doubles all collectibles and pickups in the current room" +
      "# Single-use" +
      `#↑ Gives the player {{Collectible${CollectibleType.COLLECTIBLE_DIPLOPIA}}}`,
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_OMNIDETONATOR,
    "Splits player tears into 6 and detonates bombs" +
      "# Prevents bombs from detonating until used" +
      "#↓ Tear split effect can only occur once every 12 seconds",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_BOOSTEDBEAN,
    "Temporarily petrifies all enemies" +
      "# Poisons nearby enemies" +
      "# Generates a rock wave along the current look direction",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_PLUMORGAN,
    "Summons 2 friendly Baby Plums for 10 seconds.",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_DECREMENTDICE,
    "Rerolls all collectibles by reducing their item id" +
      "# Can reduce item id by 1 to 5" +
      "# Aims for the best item available within that range",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_PILLDISPENSER,
    "Spawns a random pill" +
      "#↑ Preferentially spawns pills with a beneficial effect" +
      "#↓ 48 Hour Energy has very low weight",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_AMPLIFIEDD4,
    "Randomizes player items" +
      "#↑ Does not deplete item pools" +
      "#↓ Removes transformation progress" +
      "# Rerolls within original item pools",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_STEELRAZOR,
    "Lose 1 full heart, get +2 damage for the room" +
      "#↑ Damage takes red hearts first",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_CYBERGUPPYSPAW,
    "Convert 1 red heart container into {{SoulHeart}}{{SoulHeart}}{{SoulHeart}}{{SoulHeart}}{{HalfSoulHeart}}",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_CYBERGUPPYSHEAD,
    "Spawns 0-2 blue flies for each enemy present, 4-6 for each boss" +
      "# If there are no enemies, spawns 4-6 blue flies",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_CARDDISPENSER,
    "Spawns a random card" + "#↑ Preferentially spawns better cards",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_OVERCLOCKEDMETRONOME,
    "Gives a random item's effect for the current room",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ROTTINGHEART,
    "Gives 1 Rotten heart" + "#↑ Spawns 1-5 blue flies",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_EYECANISTER,
    "Spawns 2 eye familiars" +
      "#↑ Increases damage from right eye tears by 34%",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_BOXSHOP,
    "Spawns a shop in the current room" +
      "# 2-4 shop items are spawned" +
      "# A shopkeeper is spawned" +
      "#↑ 10% chance to spawn a restock machine",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ESSENCESPLITTER,
    `Takes 1 red heart container and spawns a {{Collectible${CollectibleType.COLLECTIBLE_CUBE_OF_MEAT}}} & {{Collectible${CollectibleType.COLLECTIBLE_BALL_OF_BANDAGES}}}`,
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_TELEPORT4,
    "Teleports the player" +
      "# Teleports to the Ultra Secret room on first use" +
      "# Teleports to I AM ERROR room on second use" +
      "# Resets on floor transition",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SOULGENERATOR,
    "Gives {{SoulHeart}}{{SoulHeart}}",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_PETROGLYPHOFBELIAL,
    "Gives +4 DMG for the room" +
      "#↑ Gives up to 1 full black heart if at less than 2 hearts",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SHAPEDCHARGEVEST,
    "Causes a 185 damage explosion on the player" +
      "#↑ Explosion does not damage player",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SOULREACTOR,
    "Spawns {{SoulHeart}}{{SoulHeart}} and 1 Angel Room item" +
      "#↓ Can only be charged by soul/black heart pickups",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_RESEALEDBOX,
    `Triggers {{Collectible${CollectibleType.COLLECTIBLE_BLUE_BOX}}} effect`,
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_UNIVERSALKEY,
    "Opens most doors" + "#↑ Opens all chests" + "#↑ Opens all key blocks",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFAGGRESSION,
    "Triggers the effect of a random active item useful against enemies",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFBLOOD,
    "Triggers the effect of a random active item that relates to damage",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFBLASTS,
    "Triggers the effect of a random active item that causes an explosion",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFUTILITY,
    "Triggers the effect of a random active item that can generate something useful",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_INACTIONREPLAY,
    "Turns the player into Man-Pac for 6 seconds" +
      "#↑ Invulnerability" +
      "#↑ Mass fear" +
      "#↑ 40 contact damage/sec" +
      "#↑ Heal {{HalfHeart}} per 2 enemies killed",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_MRYOU,
    "Summons a controllable ghost that can perform various tasks depending on what it targets",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_TOXICVAT,
    "Creates a large pool of creep that does 8 times player damage",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_LAZERBLAST,
    "Fires a beam which does 2x player damage/tick",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ALARMTRIGGER,
    "Respawns the current room's enemies" +
      "#↓ 10% chance to work on boss rooms" +
      "#↓ 20% chance to work on miniboss rooms",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_KINETICIMPACTOR,
    "Spawns a stationary turret that fires rock waves at enemies" +
      "#↑ Also targets tinted/super-secret rocks",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ITEMFABRICATOR,
    "Spawns an item wisp orbital" +
      "#↑ Item wisps gives their item's effect" +
      "#↑ Item wisps deal damage and absorb tears" +
      "#↓ Item wisps can be destroyed",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_FRIENDSEARCHER,
    "Spawns a random friendly monster that mimics your movements and attacks",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_DOUBLESIDEDERASER,
    "Fires an eraser in the current fire direction" +
      "# Erases the first enemy it hits for the rest of the run" +
      "# Deals 15 damage to bosses, if fatal they are erased" +
      "# 2 uses per floor",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_STRIKEDESIGNATOR,
    "Launches 7 rocket strikes at random enemies, weighted by health" +
      "#↑ Can also target tinted/super-secret rocks and secret rooms",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_PLATEDRAZOR,
    "Consumes 3 coins and gives +1.2 damage for the room",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SACRIFICEREACTOR,
    "Sacrifices up to 2 familiars and spawns a Devil item for each" +
      "# Converts all friendly spiders and flies into coins",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_CLONEVAT,
    "Spawns a decoy Isaac, which draws the attention of all enemies" +
      "#↑ The decoy explodes after 5 seconds for 185 damage",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_DEMONICNAIL,
    "Gives half a Black Heart, +2 damage, -0.18 speed and the ability to destroy obstacles" +
      `#↑ Gives {{Collectible${CollectibleType.COLLECTIBLE_BRIMSTONE}}}`,
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_AUGER,
    "Spawns a ladder to the crawlspace with the first use on a floor" +
      "# All consecutive uses spawn a trapdoor to the next floor" +
      "#↑ Discharges only 4 bars on first use/floor",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_TEMPEREDSHEARS,
    "Separates character's head and body for the current room" +
      "# Player controls head, which gains flight" +
      "# Body automatically chases down enemies to deal 82.5 contact damage/sec",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_BLADEDISC,
    "Launches a ricocheting blade disc" +
      "# Lasts for 15 bounces" +
      "#↑ Deals 3x player damage/tick" +
      "#↑ Picks up item pedestals and pickups",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_GOLDENFLUSH,
    "Turns all non-boss monsters in the room into poop" +
      "#↑ Instantly kills poop-themed bosses",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_BRIMSTONECANNON,
    "Fires a cone of 4 brimstone lasers for 0.5 sec" +
      "#↑ Each beam does 11 damage/tick",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SUMMARIZEDMONSTERMANUAL,
    "Spawns a random familiar for the current floor",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_COMPOSTBIN,
    "Quadruples current blue flies and spiders" +
      "#↑ If none are present, spawns 2 blue flies or spiders" +
      "# Converts pickups to blue flies or spiders",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SOULJAR,
    "Spawns {{SoulHeart}}{{SoulHeart}}{{SoulHeart}}{{SoulHeart}}" +
      "#↓ Can only be charged by red heart pickups",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_GOLDENSHARPKEY,
    "Throws a key, which can deal damage, destroy obstacles, and open doors" +
      "#↑ While held, all enemies have a 20% chance to drop a key",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ACCELERATEDD10,
    "Rerolls monsters" +
      "# Monsters are rerolled to other monsters with similar health",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_AMPLIFIEDD8,
    "Randomly increases one of Luck, Range, Speed, Tears, Health, or Shot Speed",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_POWEREDD100,
    `Triggers the effects of {{Collectible${CollectibleTypeLabUpgrade.COLLECTIBLE_D2}}},` +
      `{{Collectible${CollectibleType.COLLECTIBLE_D6}}},` +
      `{{Collectible${CollectibleTypeLabUpgrade.COLLECTIBLE_ALARMTRIGGER}}},` +
      `{{Collectible${CollectibleTypeLabUpgrade.COLLECTIBLE_AMPLIFIEDD8}}},` +
      `{{Collectible${CollectibleType.COLLECTIBLE_D10}}},` +
      `{{Collectible${CollectibleTypeLabUpgrade.COLLECTIBLE_PORTABLETERRAFORMER}}}, and` +
      `{{Collectible${CollectibleTypeLabUpgrade.COLLECTIBLE_MATTERREARRANGER}}}`,
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_BLUEFRIENDSBOX,
    "Fires a massive laser for 15 seconds" +
      "#↑ Persists between rooms" +
      "# Pushes player back while active",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ENERGIZEDMEGABLAST,
    "Duplicates familiars for the current room" +
      `#↑ If no familiars are present, spawns {{Collectible${CollectibleType.COLLECTIBLE_DEMON_BABY}}}` +
      "#↑ Spawns 4-8 blue spiders and 2-4 blue flies",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SUPERHEATEDSMELTER,
    "Destroys current trinkets and applies double their effect permanently",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_MOTHEROFBOMBS,
    "Damages all enemies and destroys all obstacles for the entire floor" +
      "#↑ Spawns 10-25 bombs" +
      `# Turns into {{Collectible${CollectibleType.COLLECTIBLE_MAMA_MEGA}}} on use`,
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ENERGIZEDDELIRIOUS,
    "Spawns Delirium as a random friendly boss",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SINGULARITYGENERATOR,
    "Places a black hole generator, which lasts 20 seconds" +
      "#↑ Pulls in most entities other than players and player tears" +
      "#↑ Deals high damage to entities" +
      "#!!! When it despawns, it will cause a large explosion that can hurt the player",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SPRINKLERS,
    "Spawns a sprinkler that rotates and fires tears" +
      "#↑ Recharges itself twice within the room it was used",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SHARPENEDMEATCLEAVER,
    "Splits all enemies into four smaller versions of themselves with much less health",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_OMNIJAR,
    "Spawns pickups based on the number of times used" +
      "# First use spawns {{Coin}}s, {{Bomb}}s, {{Key}}s, and {{Heart}}s" +
      "# Second use spawns {{SoulHeart}}s, a {{Pill}}, {{Card}}, {{GoldenKey}}, and a {{GoldenBomb}}" +
      "# Third use spawns many {{Coin}}s, giga bombs, blue spiders/flies, friendly dips, and an item" +
      "# Cycles back to the beginning after the third",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ABIEXSPIRAVIT,
    "Enemies spawn ghosts on death while held" +
      "#↑ Detonates ghosts, for 5+8% of the max health it had in life" +
      "#↑ Ghosts home in on enemies" +
      "#↑ Ghost explosions don't hurt players",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_PORTALGENERATOR,
    "Splits a permanently-charmed Lil Portal" +
      "#↑ Spawns various friendly enemies",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_HEALTHYBALL,
    "Throws a capture ball" +
      "# Captures the first non-boss enemy it hits, which is released and permanently charmed on next use" +
      "#↑ Recharges if ball is picked up" +
      "#↑ Fully heals all friendly enemies on room clear",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SUPERBALL,
    "Throws a capture ball" +
      "# Captures the first enemy, which is released and permanently charmed on next use" +
      "#↑ Recharges if ball is picked up" +
      "#↑ Can capture bosses at <15% health",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ENERGIZEDCONVERTER,
    "Converts {{HalfSoulHeart}} into {{Heart}}",
  );

  // =====Upgraded Starting Items=====
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_GOLDENNICKEL,
    "75% chance to spawn coins" +
      "#80% chance 1-5" +
      "#18% chance 5-10" +
      "#2% chance 10-15" +
      '#↑ If coins are spawned, can give the player an invisible "Coin Barrier" that will take the next hit of damage' +
      "#{{Blank}} Coin barriers can be layered up to 3 times, with reducing chances for each successive layer",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_RECONSTRUCTIVEHEART,
    "Heals 3.5 {{Heart}}" +
      "#↑ Excess becomes {{SoulHeart}} at 3:1 ratio" +
      "#↑ Spawns 2 {{Coin}} for Keeper" +
      "#↑ Adds to Bethany's soul/heart charges" +
      "#↑ Heals other players for half the effect" +
      "#↑ 20% chance to trigger its effect at half power for free on room clear",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_STABILIZEDETERNALD6,
    "Rerolls all collectibles in the room",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ENERGIZEDD6,
    "Rerolls all collectibles in the room" +
      "#↑ Each item rerolled consumes only 2 charge bars" +
      "#↑ Attempts to reroll each item 5 times, keeping the best result",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_CRATEOFFRIENDS,
    "Adds an extra copy of every familiar" +
      `#↑ Permanently gives {{Collectible${CollectibleType.COLLECTIBLE_BFFS}}} on first use if the player does not already have it` +
      "#↑ 5% chance to permanently copy a familiar-giving item",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_CHAOSPOOP,
    "Spawns a poop of random type" +
      "#46% normal poop" +
      "#31% black poop" +
      "#15% golden poop" +
      "#8% holy poop",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_SIGILOFBELIAL,
    "{{ColorGreen}}+2{{CR}} Damage for the current room" +
      `Spawns {{Collectible${CollectibleType.COLLECTIBLE_PENTAGRAM}}} item wisps which give its effect but can be destroyed` +
      "Wisp spawn chance reduces proportionally to current number",
  );
  EID.addCollectible(
    CollectibleTypeLabUpgrade.COLLECTIBLE_TEMPEREDBLADE,
    "Causes 1 half-heart of damage to the user, gives {{ColorGreen}}+2{{CR}} Damage for the current room, and deals 40 damage to all enemies" +
      `#↑ {{Collectible${CollectibleType.COLLECTIBLE_MISSING_PAGE_2}}} adds 40 additional damage` +
      `#↑ {{Trinket${TrinketType.TRINKET_MISSING_PAGE}}} adds 40 additional damage`,
  );
}
