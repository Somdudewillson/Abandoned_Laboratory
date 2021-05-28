/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
// Define imports
import { randomCollectible, CollectibleTypeLab } from "./constants";
import * as SaveUtil from "./saveData";
// ===== import event handlers =====
import * as PostRoomHandler from "./callbacks/handler_PostNewRoom";
// --- Entities ---
import * as MachineEvents from "./callbacks/handler_MachineEvents";
// ===== import item code =====
// --- Normal Upgraded Actives ---
import * as EFF_DigitalCard from "./items/active/upgraded/digitalCard";
import * as EFF_CartographersTome from "./items/active/upgraded/cartographersTome";
import * as EFF_AnarchistsEBook from "./items/active/upgraded/anarchistsEBook";
import * as EFF_SHADOWDEVICE from "./items/active/upgraded/shadowDevice";
import * as EFF_CHESTOFSIN from "./items/active/upgraded/chestOfSin";
import * as EFF_RUNICAMPLIFIER from "./items/active/upgraded/runicAmplifier";
import * as EFF_GLOWINGHEART from "./items/active/upgraded/glowingHeart";
import * as EFF_PILLMACHINE from "./items/active/upgraded/pillMachine";
import * as EFF_JAROFHEADS from "./items/active/upgraded/jarOfHeads";
import * as EFF_SILVERNICKEL from "./items/active/upgraded/silverNickel";
import * as EFF_METALFEATHER from "./items/active/upgraded/metalFeather";
import * as EFF_BIGBOXOFSPIDERS from "./items/active/upgraded/bigBoxOfSpiders";
import * as EFF_BOMBDISPENSER from "./items/active/upgraded/bombDispenser";
import * as EFF_MATTERREARRANGER from "./items/active/upgraded/matterRearranger";
import * as EFF_FORGETMELATER from "./items/active/upgraded/forgetMeLater";
import * as EFF_BLOODSAW from "./items/active/upgraded/bloodSaw";
import * as EFF_DIVINITYGENERATOR from "./items/active/upgraded/divinityGenerator";
import * as EFF_SATANITYGENERATOR from "./items/active/upgraded/satanityGenerator";
import * as EFF_TEMPEREDGLASSCANNON from "./items/active/upgraded/temperedGlassCannon";
import * as EFF_ZKEY from "./items/active/upgraded/zKey";
import * as EFF_SYNTHETICSKIN from "./items/active/upgraded/syntheticSkin";
import * as EFF_PAUSE2 from "./items/active/upgraded/pauseTwo";
import * as EFF_BLOODSIPHON from "./items/active/upgraded/bloodSiphon";
import * as EFF_ARTIFICIALSOUL from "./items/active/upgraded/artificialSoul";
import * as EFF_D2 from "./items/active/upgraded/dTwo";
import * as EFF_WEEKLYGIFT from "./items/active/upgraded/weeklyGift";
import * as EFF_DISCOUNTCODE from "./items/active/upgraded/discountCode";
import * as EFF_ILLUSORYRAZOR from "./items/active/upgraded/illusoryRazor";
import * as EFF_PORTABLETERRAFORMER from "./items/active/upgraded/portableTerraformer";
import * as EFF_TEARRESERVOIR from "./items/active/upgraded/tearReservoir";
import * as EFF_WAVECANNON from "./items/active/upgraded/waveCannon";
import * as EFF_TERRORVORTEX from "./items/active/upgraded/terrorVortex";
import * as EFF_PETRIFACTIONVORTEX from "./items/active/upgraded/pertifactionVortex";
import * as EFF_WEBBEDVORTEX from "./items/active/upgraded/webbedVortex";
import * as EFF_CHRONALVORTEX from "./items/active/upgraded/chronalVortex";
import * as EFF_NECROVORTEX from "./items/active/upgraded/necroVortex";
import * as EFF_MICROTRANSACTION from "./items/active/upgraded/microtransaction";
import * as EFF_CYBERMUSH from "./items/active/upgraded/cyberMush";
import * as EFF_PLAND from "./items/active/upgraded/planD";
import * as EFF_COUNTERFEITDEATHCERTIFICATE from "./items/active/upgraded/counterfeitDeathCertificate";
import * as EFF_STRAIGHTENEDPENNY from "./items/active/upgraded/straightenedPenny";
import * as EFF_CRIMSONKEY from "./items/active/upgraded/crimsonKey";
import * as EFF_DIGITALFORTUNE from "./items/active/upgraded/digitalFortune";
import * as EFF_VENDINGMACHINE from "./items/active/upgraded/vendingMachine";
import * as EFF_BLOODALCHEMIZER from "./items/active/upgraded/bloodAlchemizer";
import * as EFF_SUMMARIZEDBIBLE from "./items/active/upgraded/summarizedBible";
// --- Upgraded Starting Actives ---
import * as EFF_GOLDENNICKEL from "./items/active/specialized/goldenNickel";
import * as EFF_RECONSTRUCTIVEHEART from "./items/active/specialized/reconstructiveHeart";
import * as EFF_STABILIZEDETERNALD6 from "./items/active/specialized/stabilizedEternalDSix";
import * as EFF_ENERGIZEDD6 from "./items/active/specialized/energizedDSix";
import * as EFF_CRATEOFFRIENDS from "./items/active/specialized/crateOfFriends";
import * as EFF_CHAOSPOOP from "./items/active/specialized/chaosPoop";
import * as EFF_SIGILOFBELIAL from "./items/active/specialized/sigilOfBelial";
import * as EFF_TEMPEREDBLADE from "./items/active/specialized/temperedBlade";
import { MachineEntityType, MachineEntityVariant } from "./callbacks/handler_MachineEvents";

// Register the mod
// (which will make it show up in the list of mods on the mod screen in the main menu)
const ABANDONED_LABORATORY = RegisterMod("Abandoned_Laboratory", 1);

const USER_TEST = true;

// Define callback functions
function postGameStarted(isContinued:boolean) {
  if (ABANDONED_LABORATORY.HasData()) {
    SaveUtil.deserialize(ABANDONED_LABORATORY.LoadData(),isContinued);
  }

  if (EID !== null) {registerExternalItemDescriptions();}

  if (!isContinued && USER_TEST) {
    const rand:RNG = RNG();
    rand.SetSeed(Game().GetSeeds().GetStartSeed(), 0);
    const collectible = randomCollectible(rand);

    Isaac.Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_COLLECTIBLE,
      collectible,
      Game().GetRoom().GetCenterPos(),
      Vector.Zero,
      null);

    Isaac.Spawn(
       MachineEntityType.UPGRADEMACHINE,
       MachineEntityVariant.UPGRADEMACHINE,
       0,
       Game().GetRoom().GetTopLeftPos().add(Vector(50, 15)),
       Vector.Zero,
       null);
  }
}
function preGameExit(willContinue:boolean) {
  ABANDONED_LABORATORY.SaveData(SaveUtil.serialize(willContinue));
}

// Register callbacks
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_PRE_GAME_EXIT, preGameExit);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, SaveUtil.wipePerFloor);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, SaveUtil.wipePerRoom);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, PostRoomHandler.postRoom);

// --- Entities ---
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_PRE_NPC_COLLISION, MachineEvents.preCollide, MachineEntityType.UPGRADEMACHINE);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_PRE_NPC_UPDATE, MachineEvents.update, MachineEntityType.UPGRADEMACHINE);
PostRoomHandler.addRoomListener(MachineEvents.trySpawn);

// --- Normal Upgraded Actives ---
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_DigitalCard.use, EFF_DigitalCard.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_CartographersTome.use, EFF_CartographersTome.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_AnarchistsEBook.use, EFF_AnarchistsEBook.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SHADOWDEVICE.use, EFF_SHADOWDEVICE.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_ENTITY_TAKE_DMG, EFF_SHADOWDEVICE.interceptDamage, EntityType.ENTITY_PLAYER);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_CHESTOFSIN.use, EFF_CHESTOFSIN.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_RUNICAMPLIFIER.use, EFF_RUNICAMPLIFIER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_GLOWINGHEART.use, EFF_GLOWINGHEART.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_PILLMACHINE.use, EFF_PILLMACHINE.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_JAROFHEADS.use, EFF_JAROFHEADS.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SILVERNICKEL.use, EFF_SILVERNICKEL.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_METALFEATHER.use, EFF_METALFEATHER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_BIGBOXOFSPIDERS.use, EFF_BIGBOXOFSPIDERS.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_BOMBDISPENSER.use, EFF_BOMBDISPENSER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_MATTERREARRANGER.use, EFF_MATTERREARRANGER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_FORGETMELATER.use, EFF_FORGETMELATER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_PRE_SPAWN_CLEAN_AWARD, EFF_FORGETMELATER.preClean);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_BLOODSAW.use, EFF_BLOODSAW.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_DIVINITYGENERATOR.use, EFF_DIVINITYGENERATOR.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SATANITYGENERATOR.use, EFF_SATANITYGENERATOR.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_TEMPEREDGLASSCANNON.use, EFF_TEMPEREDGLASSCANNON.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_ZKEY.use, EFF_ZKEY.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_UPDATE, EFF_ZKEY.tick);
// ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, EFF_ZKEY.postRoom);
PostRoomHandler.addPlayerListener(EFF_ZKEY.postRoom);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SYNTHETICSKIN.use, EFF_SYNTHETICSKIN.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_PAUSE2.use, EFF_PAUSE2.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_BLOODSIPHON.use, EFF_BLOODSIPHON.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_ARTIFICIALSOUL.use, EFF_ARTIFICIALSOUL.ownType());
// ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, EFF_ARTIFICIALSOUL.postRoom);
PostRoomHandler.addPlayerListener(EFF_ARTIFICIALSOUL.postRoom);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_D2.use, EFF_D2.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_WEEKLYGIFT.use, EFF_WEEKLYGIFT.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, EFF_WEEKLYGIFT.postLevel);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_DISCOUNTCODE.use, EFF_DISCOUNTCODE.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, EFF_DISCOUNTCODE.postRoom);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_ILLUSORYRAZOR.use, EFF_ILLUSORYRAZOR.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_PORTABLETERRAFORMER.use, EFF_PORTABLETERRAFORMER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_TEARRESERVOIR.use, EFF_TEARRESERVOIR.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_FIRE_TEAR, EFF_TEARRESERVOIR.postTear);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_WAVECANNON.use, EFF_WAVECANNON.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_TERRORVORTEX.use, EFF_TERRORVORTEX.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_PETRIFACTIONVORTEX.use, EFF_PETRIFACTIONVORTEX.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_WEBBEDVORTEX.use, EFF_WEBBEDVORTEX.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_CHRONALVORTEX.use, EFF_CHRONALVORTEX.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_NECROVORTEX.use, EFF_NECROVORTEX.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_MICROTRANSACTION.use, EFF_MICROTRANSACTION.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_CYBERMUSH.use, EFF_CYBERMUSH.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_PLAND.use, EFF_PLAND.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_COUNTERFEITDEATHCERTIFICATE.use, EFF_COUNTERFEITDEATHCERTIFICATE.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_STRAIGHTENEDPENNY.use, EFF_STRAIGHTENEDPENNY.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_CRIMSONKEY.use, EFF_CRIMSONKEY.ownType());
// ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, EFF_CRIMSONKEY.postRoom);
PostRoomHandler.addSlotListener(EFF_CRIMSONKEY.postRoom, EFF_CRIMSONKEY.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_DIGITALFORTUNE.use, EFF_DIGITALFORTUNE.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_VENDINGMACHINE.use, EFF_VENDINGMACHINE.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_BLOODALCHEMIZER.use, EFF_BLOODALCHEMIZER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SUMMARIZEDBIBLE.use, EFF_SUMMARIZEDBIBLE.ownType());

// --- Upgraded Starting Actives ---
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_GOLDENNICKEL.use, EFF_GOLDENNICKEL.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_ENTITY_TAKE_DMG, EFF_GOLDENNICKEL.interceptDamage, EntityType.ENTITY_PLAYER);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_RECONSTRUCTIVEHEART.use, EFF_RECONSTRUCTIVEHEART.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_PRE_SPAWN_CLEAN_AWARD, EFF_RECONSTRUCTIVEHEART.preClean);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_STABILIZEDETERNALD6.use, EFF_STABILIZEDETERNALD6.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_ENERGIZEDD6.use, EFF_ENERGIZEDD6.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_CRATEOFFRIENDS.use, EFF_CRATEOFFRIENDS.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, EFF_CRATEOFFRIENDS.findAllFriendItems);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_CHAOSPOOP.use, EFF_CHAOSPOOP.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SIGILOFBELIAL.use, EFF_SIGILOFBELIAL.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_TEMPEREDBLADE.use, EFF_TEMPEREDBLADE.ownType());


// Print an initialization message to the "log.txt" file
Isaac.DebugString("Abandoned_Laboratory initialized.");

function registerExternalItemDescriptions(): void {
  // =====Upgraded Vanilla Items=====
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_DIGITALCARD, "Copies & boosts card effects");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_CARTOGRAPHERTOME, "Gives all mapping effects");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_ANARCHISTEBOOK, "Spawns troll bombs on enemies and tinted rocks");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_SHADOWDEVICE, "Gives invulnerability for 10 seconds"+
    "#↑ Can trigger and block damage, more likely with higher charge");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_CHESTOFSIN, "Spawns 2-3 random pickups");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_RUNICAMPLIFIER, "Copies & boosts rune effects");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_GLOWINGHEART, "Heals 2.5 {{Heart}}"+
    "#↑ Excess becomes {{SoulHeart}} at 3:1 ratio"+
    "#↑ Spawns 2 {{Coin}} for Keeper"+
    "#↑ Adds to Bethany's soul/heart charges"+
    "#↑ Heals other players for half the effect");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_PILLMACHINE, "Copies & boosts pill effects");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_JAROFHEADS, "Summons a throwable bomb");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_SILVERNICKEL, "75% chance to spawn coins"+
    "#90% chance 1-5"+
    "#9% chance 5-10"+
    "#1% chance 10-15");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_METALFEATHER, "Spawns damaging beams of light on enemies"+
    "#Spawns more on enemies with more health");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_BIGBOXOFSPIDERS, "Spawns 8-16 Blue Spiders");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_BOMBDISPENSER, "Spawns an active bomb");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_MATTERREARRANGER, "Consumes and converts pickups"+
    "#Tries to give you what you need");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_FORGETMELATER, "Rerolls & restarts the floor without changing the player"+
    "#↓ Cannot be charged by {{Battery}} effects");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_BLOODSAW, "Deals 80 damage to all enemies"+
  "#↓ Takes 1 full heart, prioritizing red health"+
  `#↑ {{Collectible${CollectibleType.COLLECTIBLE_MISSING_PAGE_2}}} adds 80 additional damage`+
  `#↑ {{Trinket${TrinketType.TRINKET_MISSING_PAGE}}} adds 80 additional damage`);
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_DIVINITYGENERATOR, "Gives {{EthernalHeart}}");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_SATANITYGENERATOR, "Gives {{BlackHeart}}");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_TEMPEREDGLASSCANNON, "fires one tear with 10 times player damage");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_ZKEY, "Undoes the current room"+
    "#↓ Only charges in rooms with enemies");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_SYNTHETICSKIN, "Spawns one item from the current room's item pool"+
    "#↓ Consumes {{Heart}} or {{SoulHeart}}{{SoulHeart}} and gives one broken heart"+
    "#!!! Can kill the player");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_PAUSE2, "Freezes all enemies until a fire button is pressed or 30 seconds pass");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_BLOODSIPHON, "Deals 5 + player damage + 15% of the enemy's max health to all enemies"+
    "#↑ 10% chance to spawn a half heart - 8% {{HalfHeart}} and 2% {{HalfSoulHeart}}");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_ARTIFICIALSOUL, "Spawns 2 items from the current room's item pool"+
    "#↓ Charges by exploring the floor, 90% exploration necessary for full charge"+
    "#!!! Secret and Super Secret rooms count"+
    "#!!! Charges do not carry over between floors"+
    "#↓ One use per floor");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_D2, "Creates two copies of a random pickup in the room"+
    "#↓ Cannot copy {{Rune}}Jera");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_WEEKLYGIFT, "Spawns one item from the current room's item pool"+
    "#↓ Charges when entering a new floor");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_DISCOUNTCODE, "Makes one purchasable item free"+
    "#While fully charged, store prices reduced by 60%"+
    "#!!! Sale effect will stop if the item is used");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_ILLUSORYRAZOR, "Deals fake damage to the player, triggering on-hit effects");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_PORTABLETERRAFORMER, "Alters room obstacles"+
    "#↑ Destroys most rocks, with a chance for extra drops"+
    "#↑ Fills in all pits"+
    "#↑ Spiked rocks and metal blocks become normal rocks"+
    "#↑ Poop becomes better poop"+
    "#↑ Rocks have a 10% chance to become tinted");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_TEARRESERVOIR, "Fires a burst of 7 tears with player damage in a cone"+
    "#Charges one bar for each fired tear"+
    `#!!! Does not work with {{Collectible"}${CollectibleType.COLLECTIBLE_BRIMSTONE}}}`);
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_WAVECANNON, "Fires a burst of 19 tears with player damage in a wave formation"+
    "#↑ Wave tears are Spectral, Piercing, and bounce off the ground"+
    "#↑ Wave tears have a 500% knockback modifier");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_TERRORVORTEX, "Gives all enemies the Fear effect for 5 seconds"+
    "#Deals 10 + the player's damage to all enemies");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_PETRIFACTIONVORTEX, "Petrifies all enemies for 4.5 seconds"+
    "#Deals 10 + the player's damage to all enemies");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_WEBBEDVORTEX, "Slows all enemies for 4.5 seconds"+
    "#Deals 25 + the player's damage to all enemies"+
    "#↑ Enemies killed by this damage have a chance to spawn Blue Spiders based on their maximum health");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_CHRONALVORTEX, "Slows all enemies for 4.5 seconds"+
    "#Deals 10 + the player's damage to all enemies");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_NECROVORTEX, "# Deals 20 damage to all enemies"+
    `#↑ {{Collectible${CollectibleType.COLLECTIBLE_MISSING_PAGE_2}}} adds 20 additional damage`+
    `#↑ {{Trinket${TrinketType.TRINKET_MISSING_PAGE}}} adds 20 additional damage`);
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_MICROTRANSACTION, "Takes 1-5 {{Coin}} from the player and deals damage to all enemies"+
    "#Damage scales with the amount of {{Coin}} taken, from 20 + 2 * player damage to 40 + 4 * player damage"+
    "#↑ If 5 {{Coin}} are taken, there is a 2.5% chance to get a permanent {{ColorGreen}}+1.0{{CR}} Luck Up");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_CYBERMUSH, "Gigantifies player for 30 seconds"+
    "#↑ Player is invulnerable while giant"+
    "#↑ Player can crush obstacles and enemies while giant"+
    "#↑ Increases Damage and Range while giant"+
    "#↓ Reduces Tears while giant");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_PLAND, "Kills every enemy in the room that isn't invulnerable"+
    "#Single-use"+
    "#!!! Reduces player to 1 half-heart of health"+
    "#!!! Will not kill both stages of multi-stage bosses");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_COUNTERFEITDEATHCERTIFICATE, "Takes the player to an area with all items"+
    "#One item can be taken from this area, which will destroy all other items in the room and send the player back"+
    `#Single-use, but gives the player {{Collectible${CollectibleType.COLLECTIBLE_DEATH_CERTIFICATE}}}, which has the same effect`);
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_STRAIGHTENEDPENNY, "↑ 75% chance to double all pickups and collectibles"+
    "↓ 25% chance to destroy all pickups and collectibles, and spawn a single Nickel");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_CRIMSONKEY, "Opens all doors and possible Red Rooms"+
    "# Charges itself if you end up in an I AM ERROR room, and teleports you back to the start of the floor on use");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_DIGITALFORTUNE, "Has a Luck-based chance to do nothing or spawn 1-2 {{SoulHeart}}, a {{Card}}, or a {{Trinket}}"+
    "#↑ Treats negative Luck as 0 Luck");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_VENDINGMACHINE, "Consumes 2 coins and has a Luck-based chance to do nothing or spawn one of the following:"+
    "#1-2 {{Heart}} (29%)"+
    "#1 {{Bomb}} (24%)"+
    "#1 {{Key}} (23%)"+
    "#3 {{Coin}} (20%)"+
    "#A Pretty Fly (2%)"+
    "#↑ Treats negative Luck as 0 Luck");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_BLOODALCHEMIZER, "Consumes 1 half-heart of health and spawns 1-4 {{Coin}}"+
    "#!!! Will instead spawn 2-4 Blue Flies for the Keeper");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_SUMMARIZEDBIBLE, "Gives flight for the current room"+
    "#↑ Instantly kills Mom, Mom's Heart, and It Lives"+
    "#!!! Will instantly kill you if used while fighting Satan");

  // =====Upgraded Starting Items=====
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_GOLDENNICKEL, "75% chance to spawn coins"+
    "#80% chance 1-5"+
    "#18% chance 5-10"+
    "#2% chance 10-15"+
    "#↑ If coins are spawned, can give the player an invisible \"Coin Barrier\" that will take the next hit of damage"+
    "#{{Blank}} Coin barriers can be layered up to 3 times, with reducing chances for each successive layer");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_RECONSTRUCTIVEHEART, "Heals 3.5 {{Heart}}"+
    "#↑ Excess becomes {{SoulHeart}} at 3:1 ratio"+
    "#↑ Spawns 2 {{Coin}} for Keeper"+
    "#↑ Adds to Bethany's soul/heart charges"+
    "#↑ Heals other players for half the effect"+
    "#↑ 20% chance to trigger its effect at half power for free on room clear");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_STABILIZEDETERNALD6, "Rerolls all collectibles in the room");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_ENERGIZEDD6, "Rerolls all collectibles in the room"+
    "#↑ Each item rerolled consumes only 2 charge bars"+
    "#↑ Attempts to reroll each item 5 times, keeping the best result");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_CRATEOFFRIENDS, "Adds an extra copy of every familiar"+
    `#↑ Permanently gives {{Collectible${CollectibleType.COLLECTIBLE_BFFS}}} on first use if the player does not already have it`+
    "#↑ 5% chance to permanently copy a familiar-giving item");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_CHAOSPOOP, "Spawns a poop of random type"+
    "#46% normal poop"+
    "#31% black poop"+
    "#15% golden poop"+
    "#8% holy poop");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_SIGILOFBELIAL, "{{ColorGreen}}+2{{CR}} Damage for the current room"+
    `Spawns {{Collectible${CollectibleType.COLLECTIBLE_PENTAGRAM}}} item wisps which give its effect but can be destroyed`+
    "Wisp spawn chance reduces proportionally to current number");
  EID.addCollectible(CollectibleTypeLab.COLLECTIBLE_TEMPEREDBLADE, "Causes 1 half-heart of damage to the user, gives {{ColorGreen}}+2{{CR}} Damage for the current room, and deals 40 damage to all enemies"+
  `#↑ {{Collectible${CollectibleType.COLLECTIBLE_MISSING_PAGE_2}}} adds 40 additional damage`+
  `#↑ {{Trinket${TrinketType.TRINKET_MISSING_PAGE}}} adds 40 additional damage`);
}