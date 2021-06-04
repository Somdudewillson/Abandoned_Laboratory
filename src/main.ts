/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
// Define imports
import { randomCollectible, DEBUG_SPAWN, itemHasUpgrade, VERSION, DUMP_NOUPGRADE, CollectibleTypeLabUpgrade, CollectibleTypeLabUtility } from "./constants";
import * as SaveUtil from "./saveData";
import * as extMath from "./extMath";
import { registerExternalItemDescriptions } from "./eidCompat";
// ===== import event handlers =====
import * as PostRoomHandler from "./callbacks/handler_PostNewRoom";
import * as PostLevelHandler from "./callbacks/handler_PostNewLevel";
// --- Entities ---
import * as MachineEvents from "./callbacks/handler_MachineEvents";
import { MachineEntityType, MachineEntityVariant } from "./callbacks/handler_MachineEvents";
import * as SpiderEvents from "./callbacks/handler_SpiderEvents";
import * as MicrodroneEvents from "./callbacks/handler_MicrodroneEvents";
import * as EffectEvents from "./callbacks/handler_EffectEvents";
// ===== import item code =====
// --- Normal Upgraded Actives ---
import * as EFF_ALARMTRIGGER from "./items/active/upgraded/a/alarmTrigger";
import * as EFF_AMPLIFIEDD4 from "./items/active/upgraded/a/amplifiedD4";
import * as EFF_AnarchistsEBook from "./items/active/upgraded/a/anarchistsEBook";
import * as EFF_ARTIFICIALSOUL from "./items/active/upgraded/a/artificialSoul";
import * as EFF_AUGER from "./items/active/upgraded/a/auger";

import * as EFF_BIGBOXOFSPIDERS from "./items/active/upgraded/b/bigBoxOfSpiders";
import * as EFF_BLADEDISC from "./items/active/upgraded/b/bladeDisc";
import * as EFF_BLOODALCHEMIZER from "./items/active/upgraded/b/bloodAlchemizer";
import * as EFF_BLOODSAW from "./items/active/upgraded/b/bloodSaw";
import * as EFF_BLOODSIPHON from "./items/active/upgraded/b/bloodSiphon";
import * as EFF_BOMBDISPENSER from "./items/active/upgraded/b/bombDispenser";
import * as EFF_BOOSTEDBEAN from "./items/active/upgraded/b/boostedBean";
import * as EFF_BOXSHOP from "./items/active/upgraded/b/boxShop";

import * as EFF_CARDDISPENSER from "./items/active/upgraded/c/cardDispenser";
import * as EFF_CartographersTome from "./items/active/upgraded/c/cartographersTome";
import * as EFF_CHESTOFSIN from "./items/active/upgraded/c/chestOfSin";
import * as EFF_CHRONALVORTEX from "./items/active/upgraded/c/chronalVortex";
import * as EFF_CLONEVAT from "./items/active/upgraded/c/cloneVat";
import * as EFF_CORNYPOOP from "./items/active/upgraded/c/cornyPoop";
import * as EFF_COUNTERFEITDEATHCERTIFICATE from "./items/active/upgraded/c/counterfeitDeathCertificate";
import * as EFF_CRIMSONKEY from "./items/active/upgraded/c/crimsonKey";
import * as EFF_CYBERGUPPYSHEAD from "./items/active/upgraded/c/cyberGuppysHead";
import * as EFF_CYBERGUPPYSPAW from "./items/active/upgraded/c/cyberGuppysPaw";
import * as EFF_CYBERMUSH from "./items/active/upgraded/c/cyberMush";

import * as EFF_DECREMENTDICE from "./items/active/upgraded/d/decrementDice";
import * as EFF_DEMONICNAIL from "./items/active/upgraded/d/demonicNail";
import * as EFF_D2 from "./items/active/upgraded/d/dTwo";
import * as EFF_DigitalCard from "./items/active/upgraded/d/digitalCard";
import * as EFF_DIGITALFORTUNE from "./items/active/upgraded/d/digitalFortune";
import * as EFF_DISCOUNTCODE from "./items/active/upgraded/d/discountCode";
import * as EFF_DIVINITYGENERATOR from "./items/active/upgraded/d/divinityGenerator";
import * as EFF_DOUBLESIDEDERASER from "./items/active/upgraded/d/doubleSidedEraser";

import * as EFF_ESSENCESPLITTER from "./items/active/upgraded/e/essenceSplitter";
import * as EFF_EYECANISTER from "./items/active/upgraded/e/eyeCanister";

import * as EFF_FORGETMELATER from "./items/active/upgraded/f/forgetMeLater";
import * as EFF_FRIENDSEARCHER from "./items/active/upgraded/f/friendSearcher";

import * as EFF_GLOWINGHEART from "./items/active/upgraded/g/glowingHeart";
import * as EFF_GOLDENFLUSH from "./items/active/upgraded/g/goldenFlush";
import * as EFF_PAUSE2 from "./items/active/upgraded/p/pauseTwo";

import * as EFF_INACTIONREPLAY from "./items/active/upgraded/i/inactionReplay";
import * as EFF_ILLUSORYRAZOR from "./items/active/upgraded/i/illusoryRazor";
import * as EFF_ITEMFABRICATOR from "./items/active/upgraded/i/itemFabricator";

import * as EFF_JAROFHEADS from "./items/active/upgraded/j/jarOfHeads";

import * as EFF_KINETICIMPACTOR from "./items/active/upgraded/k/kineticImpactor";

import * as EFF_LAZERBLAST from "./items/active/upgraded/l/lazerBlast";

import * as EFF_MATTERREARRANGER from "./items/active/upgraded/m/matterRearranger";
import * as EFF_METALFEATHER from "./items/active/upgraded/m/metalFeather";
import * as EFF_MICROTRANSACTION from "./items/active/upgraded/m/microtransaction";
import * as EFF_MRYOU from "./items/active/upgraded/m/mrYou";

import * as EFF_NECROVORTEX from "./items/active/upgraded/n/necroVortex";

import * as EFF_OMNIDETONATOR from "./items/active/upgraded/o/omniDetonator";
import * as EFF_OVERCLOCKEDMETRONOME from "./items/active/upgraded/o/overclockedMetronome";

import * as EFF_PETRIFACTIONVORTEX from "./items/active/upgraded/p/pertifactionVortex";
import * as EFF_PETROGLYPHOFBELIAL from "./items/active/upgraded/p/petroglyphOfBelial";
import * as EFF_PILLDISPENSER from "./items/active/upgraded/p/pillDispenser";
import * as EFF_PILLMACHINE from "./items/active/upgraded/p/pillMachine";
import * as EFF_PLAND from "./items/active/upgraded/p/planD";
import * as EFF_PLATEDRAZOR from "./items/active/upgraded/p/platedRazor";
import * as EFF_PLUMORGAN from "./items/active/upgraded/p/plumOrgan";
import * as EFF_PORTABLETERRAFORMER from "./items/active/upgraded/p/portableTerraformer";

import * as EFF_RESEALEDBOX from "./items/active/upgraded/r/resealedBox";
import * as EFF_ROTTINGHEART from "./items/active/upgraded/r/rottingHeart";
import * as EFF_RUNICAMPLIFIER from "./items/active/upgraded/r/runicAmplifier";

import * as EFF_SACRIFICEREACTOR from "./items/active/upgraded/s/sacrificeReactor";
import * as EFF_SATANITYGENERATOR from "./items/active/upgraded/s/satanityGenerator";
import * as EFF_SCROLLOFAGGRESSION from "./items/active/upgraded/s/scrollOfAggression";
import * as EFF_SCROLLOFBLASTS from "./items/active/upgraded/s/scrollOfBlasts";
import * as EFF_SCROLLOFBLOOD from "./items/active/upgraded/s/scrollOfBlood";
import * as EFF_SCROLLOFUTILITY from "./items/active/upgraded/s/scrollOfUtility";
import * as EFF_SHADOWDEVICE from "./items/active/upgraded/s/shadowDevice";
import * as EFF_SHAPEDCHARGEVEST from "./items/active/upgraded/s/shapedChargeVest";
import * as EFF_SILVERNICKEL from "./items/active/upgraded/s/silverNickel";
import * as EFF_SOULGENERATOR from "./items/active/upgraded/s/soulGenerator";
import * as EFF_SOULREACTOR from "./items/active/upgraded/s/soulReactor";
import * as EFF_STEELRAZOR from "./items/active/upgraded/s/steelRazor";
import * as EFF_STRAIGHTENEDPENNY from "./items/active/upgraded/s/straightenedPenny";
import * as EFF_STRIKEDESIGNATOR from "./items/active/upgraded/s/strikeDesignator";
import * as EFF_SUMMARIZEDBIBLE from "./items/active/upgraded/s/summarizedBible";
import * as EFF_SYNTHETICSKIN from "./items/active/upgraded/s/syntheticSkin";

import * as EFF_TEARRESERVOIR from "./items/active/upgraded/t/tearReservoir";
import * as EFF_TELEPORT4 from "./items/active/upgraded/t/teleportFour";
import * as EFF_TEMPEREDGLASSCANNON from "./items/active/upgraded/t/temperedGlassCannon";
import * as EFF_TEMPEREDSHEARS from "./items/active/upgraded/t/temperedShears";
import * as EFF_TERRORVORTEX from "./items/active/upgraded/t/terrorVortex";
import * as EFF_TOXICVAT from "./items/active/upgraded/t/toxicVat";
import * as EFF_TRIPLOPIA from "./items/active/upgraded/t/triplopia";

import * as EFF_UNIVERSALKEY from "./items/active/upgraded/u/universalKey";

import * as EFF_VENDINGMACHINE from "./items/active/upgraded/v/vendingMachine";

import * as EFF_WAVECANNON from "./items/active/upgraded/w/waveCannon";
import * as EFF_WEBBEDVORTEX from "./items/active/upgraded/w/webbedVortex";
import * as EFF_WEEKLYGIFT from "./items/active/upgraded/w/weeklyGift";

import * as EFF_ZKEY from "./items/active/upgraded/z/zKey";
// --- Upgraded Starting Actives ---
import * as EFF_GOLDENNICKEL from "./items/active/specialized/goldenNickel";
import * as EFF_RECONSTRUCTIVEHEART from "./items/active/specialized/reconstructiveHeart";
import * as EFF_STABILIZEDETERNALD6 from "./items/active/specialized/stabilizedEternalDSix";
import * as EFF_ENERGIZEDD6 from "./items/active/specialized/energizedDSix";
import * as EFF_CRATEOFFRIENDS from "./items/active/specialized/crateOfFriends";
import * as EFF_CHAOSPOOP from "./items/active/specialized/chaosPoop";
import * as EFF_SIGILOFBELIAL from "./items/active/specialized/sigilOfBelial";
import * as EFF_TEMPEREDBLADE from "./items/active/specialized/temperedBlade";
// --- Utility Actives ---
import * as EFF_NONE from "./items/active/utility/noEffect";

// Register the mod
// (which will make it show up in the list of mods on the mod screen in the main menu)
const ABANDONED_LABORATORY = RegisterMod("Abandoned_Laboratory", 1);

// Define callback functions
function postGameStarted(isContinued:boolean) {
  if (ABANDONED_LABORATORY.HasData()) {
    SaveUtil.deserialize(ABANDONED_LABORATORY.LoadData(),isContinued);
  }

  if (EID !== null) {registerExternalItemDescriptions();}

  if (!isContinued && DEBUG_SPAWN) {
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

// Print flavorful logging messages
Isaac.DebugString("| Abandoned_Laboratory initializing.");
Isaac.DebugString("|===================================");
Isaac.DebugString(`| LABOS v${VERSION} startup initiated`);
const versionSplit = VERSION.split(".")
Isaac.DebugString(`|LABOS| Last maintenance visit: ${Math.floor(extMath.parseInt(versionSplit[0])*197 +
  extMath.parseInt(versionSplit[1])*53 +
  extMath.parseInt(versionSplit[2]))} days ago`);

// Register callbacks
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_PRE_GAME_EXIT, preGameExit);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, SaveUtil.wipePerFloor);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, SaveUtil.wipePerRoom);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, SaveUtil.initPlayer);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, PostRoomHandler.postRoom);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, PostLevelHandler.postLevel);

Isaac.DebugString("|LABOS| Boot initialization complete");

// --- Entities ---
Isaac.DebugString("|LABOS| Scanning facility automata...");
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_PRE_NPC_COLLISION, MachineEvents.preCollide, MachineEntityType.UPGRADEMACHINE);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_PRE_NPC_UPDATE, MachineEvents.update, MachineEntityType.UPGRADEMACHINE);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NPC_INIT, MachineEvents.onSpawn, MachineEntityType.UPGRADEMACHINE);
PostRoomHandler.addRoomListener(MachineEvents.trySpawn);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_PRE_NPC_UPDATE, SpiderEvents.update, SpiderEvents.SPIDER_ENTITYTYPE);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_ENTITY_TAKE_DMG, SpiderEvents.interceptDamage, SpiderEvents.SPIDER_ENTITYTYPE);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_PRE_NPC_UPDATE, MicrodroneEvents.update, MicrodroneEvents.MICRODRONE_ENTITYTYPE);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_ENTITY_TAKE_DMG, MicrodroneEvents.interceptDamage, MicrodroneEvents.MICRODRONE_ENTITYTYPE);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_EFFECT_UPDATE, EffectEvents.update, EffectEvents.LabEffectEntityVariant);

Isaac.DebugString("|LABOS| Automata scan complete — All units present");

// --- Normal Upgraded Actives ---
Isaac.DebugString("|LABOS| Running check on automated enhancement device...");
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
PostLevelHandler.addSlotListener(EFF_WEEKLYGIFT.postLevel, EFF_WEEKLYGIFT.ownType());
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
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_CORNYPOOP.use, EFF_CORNYPOOP.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_TRIPLOPIA.use, EFF_TRIPLOPIA.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_OMNIDETONATOR.use, EFF_OMNIDETONATOR.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_BOMB_INIT, EFF_OMNIDETONATOR.postBombInit);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_BOOSTEDBEAN.use, EFF_BOOSTEDBEAN.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_PLUMORGAN.use, EFF_PLUMORGAN.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_DECREMENTDICE.use, EFF_DECREMENTDICE.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_PILLDISPENSER.use, EFF_PILLDISPENSER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_AMPLIFIEDD4.use, EFF_AMPLIFIEDD4.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_STEELRAZOR.use, EFF_STEELRAZOR.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_CYBERGUPPYSPAW.use, EFF_CYBERGUPPYSPAW.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_CYBERGUPPYSHEAD.use, EFF_CYBERGUPPYSHEAD.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_CARDDISPENSER.use, EFF_CARDDISPENSER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_OVERCLOCKEDMETRONOME.use, EFF_OVERCLOCKEDMETRONOME.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_ROTTINGHEART.use, EFF_ROTTINGHEART.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_EYECANISTER.use, EFF_EYECANISTER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_BOXSHOP.use, EFF_BOXSHOP.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_ESSENCESPLITTER.use, EFF_ESSENCESPLITTER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_TELEPORT4.use, EFF_TELEPORT4.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SOULGENERATOR.use, EFF_SOULGENERATOR.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_PETROGLYPHOFBELIAL.use, EFF_PETROGLYPHOFBELIAL.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SHAPEDCHARGEVEST.use, EFF_SHAPEDCHARGEVEST.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SOULREACTOR.use, EFF_SOULREACTOR.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_PRE_PICKUP_COLLISION, EFF_SOULREACTOR.prePickupCollide, PickupVariant.PICKUP_HEART);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_RESEALEDBOX.use, EFF_RESEALEDBOX.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_UNIVERSALKEY.use, EFF_UNIVERSALKEY.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SCROLLOFAGGRESSION.use, EFF_SCROLLOFAGGRESSION.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SCROLLOFBLOOD.use, EFF_SCROLLOFBLOOD.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SCROLLOFBLASTS.use, EFF_SCROLLOFBLASTS.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SCROLLOFUTILITY.use, EFF_SCROLLOFUTILITY.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_INACTIONREPLAY.use, EFF_INACTIONREPLAY.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_MRYOU.use, EFF_MRYOU.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_TOXICVAT.use, EFF_TOXICVAT.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_LAZERBLAST.use, EFF_LAZERBLAST.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_ALARMTRIGGER.use, EFF_ALARMTRIGGER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_KINETICIMPACTOR.use, EFF_KINETICIMPACTOR.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_ITEMFABRICATOR.use, EFF_ITEMFABRICATOR.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_FRIENDSEARCHER.use, EFF_FRIENDSEARCHER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_DOUBLESIDEDERASER.use, EFF_DOUBLESIDEDERASER.ownType());
PostLevelHandler.addSlotListener(EFF_DOUBLESIDEDERASER.postLevel, EFF_DOUBLESIDEDERASER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_STRIKEDESIGNATOR.use, EFF_STRIKEDESIGNATOR.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_PLATEDRAZOR.use, EFF_PLATEDRAZOR.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SACRIFICEREACTOR.use, EFF_SACRIFICEREACTOR.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_CLONEVAT.use, EFF_CLONEVAT.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_DEMONICNAIL.use, EFF_DEMONICNAIL.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_AUGER.use, EFF_AUGER.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_TEMPEREDSHEARS.use, EFF_TEMPEREDSHEARS.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_BLADEDISC.use, EFF_BLADEDISC.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_GOLDENFLUSH.use, EFF_GOLDENFLUSH.ownType());

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

// --- Utility Items ---
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_NONE.use, CollectibleTypeLabUtility.COLLECTIBLE_DISCHARGEDBATTERY);

let itemsWithUpgrade = 0;
let items = 0;
const itemConfig = Isaac.GetItemConfig();
for (let i=1;i<CollectibleType.NUM_COLLECTIBLES;i++) {
  const testConfig = itemConfig.GetCollectible(i);
    if (testConfig != null && testConfig.Type === ItemType.ITEM_ACTIVE && !testConfig.HasTags(ItemConfigTag.QUEST) && !testConfig.Hidden) {
      items++;
    if (itemHasUpgrade(i)) {
      itemsWithUpgrade++;
    } else if (DUMP_NOUPGRADE) {
      Isaac.DebugString(`|LABOS| WARN- No registered output for input ${testConfig.Name}[${i}]`);
    }
  }
}
Isaac.DebugString("|LABOS| Automated enhancement device check complete."+
`  Availability: ${itemsWithUpgrade}/${items}`+
` (${Math.round((itemsWithUpgrade/items)*100*100)/100}%)`);
Isaac.DebugString(`|LABOS| Total registered items: ${Math.floor(Object.entries(CollectibleTypeLabUpgrade).length/2)}`);
Isaac.DebugString("|LABOS| Startup complete");
Isaac.DebugString("====================================");