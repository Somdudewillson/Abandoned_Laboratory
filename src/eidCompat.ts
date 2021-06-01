/* eslint-disable no-useless-concat */
import { CollectibleTypeLab } from "./constants";

export function registerExternalItemDescriptions(): void {
  // =====Upgraded Vanilla Items=====
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_DIGITALCARD,
    "Copies & boosts card effects",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_CARTOGRAPHERTOME,
    "Gives all mapping effects",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_ANARCHISTEBOOK,
    "Spawns troll bombs on enemies and tinted rocks",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_SHADOWDEVICE,
    "Gives invulnerability for 10 seconds" +
      "#↑ Can trigger and block damage, more likely with higher charge",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_CHESTOFSIN,
    "Spawns 2-3 random pickups",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_RUNICAMPLIFIER,
    "Copies & boosts rune effects",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_GLOWINGHEART,
    "Heals 2.5 {{Heart}}" +
      "#↑ Excess becomes {{SoulHeart}} at 3:1 ratio" +
      "#↑ Spawns 2 {{Coin}} for Keeper" +
      "#↑ Adds to Bethany's soul/heart charges" +
      "#↑ Heals other players for half the effect",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_PILLMACHINE,
    "Copies & boosts pill effects",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_JAROFHEADS,
    "Summons a throwable bomb",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_SILVERNICKEL,
    "75% chance to spawn coins" +
      "#90% chance 1-5" +
      "#9% chance 5-10" +
      "#1% chance 10-15",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_METALFEATHER,
    "Spawns damaging beams of light on enemies" +
      "#Spawns more on enemies with more health",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_BIGBOXOFSPIDERS,
    "Spawns 8-16 Blue Spiders",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_BOMBDISPENSER,
    "Spawns an active bomb",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_MATTERREARRANGER,
    "Consumes and converts pickups" + "#Tries to give you what you need",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_FORGETMELATER,
    "Rerolls & restarts the floor without changing the player" +
      "#↓ Cannot be charged by {{Battery}} effects",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_BLOODSAW,
    "Deals 80 damage to all enemies" +
      "#↓ Takes 1 full heart, prioritizing red health" +
      `#↑ {{Collectible${CollectibleType.COLLECTIBLE_MISSING_PAGE_2}}} adds 80 additional damage` +
      `#↑ {{Trinket${TrinketType.TRINKET_MISSING_PAGE}}} adds 80 additional damage`,
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_DIVINITYGENERATOR,
    "Gives {{EthernalHeart}}",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_SATANITYGENERATOR,
    "Gives {{BlackHeart}}",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_TEMPEREDGLASSCANNON,
    "fires one tear with 10 times player damage",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_ZKEY,
    "Undoes the current room" + "#↓ Only charges in rooms with enemies",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_SYNTHETICSKIN,
    "Spawns one item from the current room's item pool" +
      "#↓ Consumes {{Heart}} or {{SoulHeart}}{{SoulHeart}} and gives one broken heart" +
      "#!!! Can kill the player",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_PAUSE2,
    "Freezes all enemies until a fire button is pressed or 30 seconds pass",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_BLOODSIPHON,
    "Deals 5 + player damage + 15% of the enemy's max health to all enemies" +
      "#↑ 10% chance to spawn a half heart - 8% {{HalfHeart}} and 2% {{HalfSoulHeart}}",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_ARTIFICIALSOUL,
    "Spawns 2 items from the current room's item pool" +
      "#↓ Charges by exploring the floor, 90% exploration necessary for full charge" +
      "#!!! Secret and Super Secret rooms count" +
      "#!!! Charges do not carry over between floors" +
      "#↓ One use per floor",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_D2,
    "Creates two copies of a random pickup in the room" +
      "#↓ Cannot copy {{Rune}}Jera",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_WEEKLYGIFT,
    "Spawns one item from the current room's item pool" +
      "#↓ Charges when entering a new floor",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_DISCOUNTCODE,
    "Makes one purchasable item free" +
      "#While fully charged, store prices reduced by 60%" +
      "#!!! Sale effect will stop if the item is used",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_ILLUSORYRAZOR,
    "Deals fake damage to the player, triggering on-hit effects",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_PORTABLETERRAFORMER,
    "Alters room obstacles" +
      "#↑ Destroys most rocks, with a chance for extra drops" +
      "#↑ Fills in all pits" +
      "#↑ Spiked rocks and metal blocks become normal rocks" +
      "#↑ Poop becomes better poop" +
      "#↑ Rocks have a 10% chance to become tinted",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_TEARRESERVOIR,
    "Fires a burst of 7 tears with player damage in a cone" +
      "#Charges one bar for each fired tear" +
      `#!!! Does not work with {{Collectible${CollectibleType.COLLECTIBLE_BRIMSTONE}}}`,
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_WAVECANNON,
    "Fires a burst of 19 tears with player damage in a wave formation" +
      "#↑ Wave tears are Spectral, Piercing, and bounce off the ground" +
      "#↑ Wave tears have a 500% knockback modifier",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_TERRORVORTEX,
    "Gives all enemies the Fear effect for 5 seconds" +
      "#Deals 10 + the player's damage to all enemies",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_PETRIFACTIONVORTEX,
    "Petrifies all enemies for 4.5 seconds" +
      "#Deals 10 + the player's damage to all enemies",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_WEBBEDVORTEX,
    "Slows all enemies for 4.5 seconds" +
      "#Deals 25 + the player's damage to all enemies" +
      "#↑ Enemies killed by this damage have a chance to spawn Blue Spiders based on their maximum health",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_CHRONALVORTEX,
    "Slows all enemies for 4.5 seconds" +
      "#Deals 10 + the player's damage to all enemies",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_NECROVORTEX,
    "# Deals 20 damage to all enemies" +
      `#↑ {{Collectible${CollectibleType.COLLECTIBLE_MISSING_PAGE_2}}} adds 20 additional damage` +
      `#↑ {{Trinket${TrinketType.TRINKET_MISSING_PAGE}}} adds 20 additional damage`,
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_MICROTRANSACTION,
    "Takes 1-5 {{Coin}} from the player and deals damage to all enemies" +
      "#Damage scales with the amount of {{Coin}} taken, from 20 + 2 * player damage to 40 + 4 * player damage" +
      "#↑ If 5 {{Coin}} are taken, there is a 2.5% chance to get a permanent {{ColorGreen}}+1.0{{CR}} Luck Up",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_CYBERMUSH,
    "Gigantifies player for 30 seconds" +
      "#↑ Player is invulnerable while giant" +
      "#↑ Player can crush obstacles and enemies while giant" +
      "#↑ Increases Damage and Range while giant" +
      "#↓ Reduces Tears while giant",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_PLAND,
    "Kills every enemy in the room that isn't invulnerable" +
      "#Single-use" +
      "#!!! Reduces player to 1 half-heart of health" +
      "#!!! Will not kill both stages of multi-stage bosses",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_COUNTERFEITDEATHCERTIFICATE,
    "Takes the player to an area with all items" +
      "#One item can be taken from this area, which will destroy all other items in the room and send the player back" +
      `#Single-use, but gives the player {{Collectible${CollectibleType.COLLECTIBLE_DEATH_CERTIFICATE}}}, which has the same effect`,
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_STRAIGHTENEDPENNY,
    "↑ 75% chance to double all pickups and collectibles" +
      "↓ 25% chance to destroy all pickups and collectibles, and spawn a single Nickel",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_CRIMSONKEY,
    "Opens all doors and possible Red Rooms" +
      "# Charges itself if you end up in an I AM ERROR room, and teleports you back to the start of the floor on use",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_DIGITALFORTUNE,
    "Has a Luck-based chance to do nothing or spawn 1-2 {{SoulHeart}}, a {{Card}}, or a {{Trinket}}" +
      "#↑ Treats negative Luck as 0 Luck",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_VENDINGMACHINE,
    "Consumes 2 coins and has a Luck-based chance to do nothing or spawn one of the following:" +
      "#1-2 {{Heart}} (29%)" +
      "#1 {{Bomb}} (24%)" +
      "#1 {{Key}} (23%)" +
      "#3 {{Coin}} (20%)" +
      "#A Pretty Fly (2%)" +
      "#↑ Treats negative Luck as 0 Luck",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_BLOODALCHEMIZER,
    "Consumes 1 half-heart of health and spawns 1-4 {{Coin}}" +
      "#!!! Will instead spawn 2-4 Blue Flies for the Keeper",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_SUMMARIZEDBIBLE,
    "Gives flight for the current room" +
      "#↑ Instantly kills Mom, Mom's Heart, and It Lives" +
      "#!!! Will instantly kill you if used while fighting Satan",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_CORNYPOOP,
    "Spawns a poop, pushes away enemies and bullets" +
      "#↓ Poop has reduced drops",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_TRIPLOPIA,
    "Doubles all collectibles and pickups in the current room" +
      "# Single-use" +
      `#↑ Gives the player {{Collectible${CollectibleType.COLLECTIBLE_DIPLOPIA}}}`,
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_OMNIDETONATOR,
    "Splits player tears into 6 and detonates bombs" +
      "# Prevents bombs from detonating until used" +
      "#↓ Tear split effect can only occur once every 12 seconds",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_BOOSTEDBEAN,
    "Temporarily petrifies all enemies" +
      "# Poisons nearby enemies" +
      "# Generates a rock wave along the current look direction",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_PLUMORGAN,
    "Summons 2 friendly Baby Plums for 10 seconds.",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_DECREMENTDICE,
    "Rerolls all collectibles by reducing their item id" +
      "# Can reduce item id by 1 to 5" +
      "# Aims for the best item available within that range",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_PILLDISPENSER,
    "Spawns a random pill" +
      "#↑ Preferentially spawns pills with a beneficial effect" +
      "#↓ 48 Hour Energy has very low weight",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_AMPLIFIEDD4,
    "Randomizes player items" +
      "#↑ Does not deplete item pools" +
      "#↓ Removes transformation progress" +
      "# Rerolls within original item pools",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_STEELRAZOR,
    "Lose 1 full heart, get +2 damage for the room" +
      "#↑ Damage takes red hearts first",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_CYBERGUPPYSPAW,
    "Convert 1 red heart container into {{SoulHeart}}{{SoulHeart}}{{SoulHeart}}{{SoulHeart}}{{HalfSoulHeart}}",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_CYBERGUPPYSHEAD,
    "Spawns 0-2 blue flies for each enemy present, 4-6 for each boss" +
      "# If there are no enemies, spawns 4-6 blue flies",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_CARDDISPENSER,
    "Spawns a random card" + "#↑ Preferentially spawns better cards",
  );

  // =====Upgraded Starting Items=====
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_GOLDENNICKEL,
    "75% chance to spawn coins" +
      "#80% chance 1-5" +
      "#18% chance 5-10" +
      "#2% chance 10-15" +
      '#↑ If coins are spawned, can give the player an invisible "Coin Barrier" that will take the next hit of damage' +
      "#{{Blank}} Coin barriers can be layered up to 3 times, with reducing chances for each successive layer",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_RECONSTRUCTIVEHEART,
    "Heals 3.5 {{Heart}}" +
      "#↑ Excess becomes {{SoulHeart}} at 3:1 ratio" +
      "#↑ Spawns 2 {{Coin}} for Keeper" +
      "#↑ Adds to Bethany's soul/heart charges" +
      "#↑ Heals other players for half the effect" +
      "#↑ 20% chance to trigger its effect at half power for free on room clear",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_STABILIZEDETERNALD6,
    "Rerolls all collectibles in the room",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_ENERGIZEDD6,
    "Rerolls all collectibles in the room" +
      "#↑ Each item rerolled consumes only 2 charge bars" +
      "#↑ Attempts to reroll each item 5 times, keeping the best result",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_CRATEOFFRIENDS,
    "Adds an extra copy of every familiar" +
      `#↑ Permanently gives {{Collectible${CollectibleType.COLLECTIBLE_BFFS}}} on first use if the player does not already have it` +
      "#↑ 5% chance to permanently copy a familiar-giving item",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_CHAOSPOOP,
    "Spawns a poop of random type" +
      "#46% normal poop" +
      "#31% black poop" +
      "#15% golden poop" +
      "#8% holy poop",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_SIGILOFBELIAL,
    "{{ColorGreen}}+2{{CR}} Damage for the current room" +
      `Spawns {{Collectible${CollectibleType.COLLECTIBLE_PENTAGRAM}}} item wisps which give its effect but can be destroyed` +
      "Wisp spawn chance reduces proportionally to current number",
  );
  EID.addCollectible(
    CollectibleTypeLab.COLLECTIBLE_TEMPEREDBLADE,
    "Causes 1 half-heart of damage to the user, gives {{ColorGreen}}+2{{CR}} Damage for the current room, and deals 40 damage to all enemies" +
      `#↑ {{Collectible${CollectibleType.COLLECTIBLE_MISSING_PAGE_2}}} adds 40 additional damage` +
      `#↑ {{Trinket${TrinketType.TRINKET_MISSING_PAGE}}} adds 40 additional damage`,
  );
}
