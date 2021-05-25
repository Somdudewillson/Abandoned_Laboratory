/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
// Define imports
import { randomCollectible } from "./utils";
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
// --- Upgraded Starting Actives ---
import * as EFF_GOLDENNICKEL from "./items/active/specialized/goldenNickel";
import * as EFF_RECONSTRUCTIVEHEART from "./items/active/specialized/reconstructiveHeart";
import * as EFF_STABILIZEDETERNALD6 from "./items/active/specialized/stabilizedEternalDSix";
import * as EFF_ENERGIZEDD6 from "./items/active/specialized/energizedDSix";
import * as EFF_CRATEOFFRIENDS from "./items/active/specialized/crateOfFriends";
import * as EFF_CHAOSPOOP from "./items/active/specialized/chaosPoop";
import * as EFF_SIGILOFBELIAL from "./items/active/specialized/sigilOfBelial";
import * as EFF_TEMPEREDBLADE from "./items/active/specialized/temperedBlade";

// Register the mod
// (which will make it show up in the list of mods on the mod screen in the main menu)
const ABANDONED_LABORATORY = RegisterMod("Abandoned_Laboratory", 1);

const USER_TEST = true;

// Define callback functions
function postGameStarted(isContinued:boolean) {
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
  }
}

// Register callbacks
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted);

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
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, EFF_ZKEY.postRoom);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_SYNTHETICSKIN.use, EFF_SYNTHETICSKIN.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_PAUSE2.use, EFF_PAUSE2.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_BLOODSIPHON.use, EFF_BLOODSIPHON.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_ARTIFICIALSOUL.use, EFF_ARTIFICIALSOUL.ownType());
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, EFF_ARTIFICIALSOUL.postRoom);
ABANDONED_LABORATORY.AddCallback(ModCallbacks.MC_USE_ITEM, EFF_D2.use, EFF_D2.ownType());

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
