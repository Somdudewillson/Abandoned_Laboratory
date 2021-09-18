import {
  CollectibleTypeLabUpgrade,
  FireplaceVariant,
} from "../../../../constants";
import * as extMath from "../../../../utils/extMath";
import {
  spawnCoins,
  spawnHearts,
  spawnPickupCluster,
} from "../../../../utils/utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_RUNICAMPLIFIER as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  const currentCard: Card = player.GetCard(0);
  if (currentCard === undefined || currentCard === 0) {
    return false;
  }
  const hasTarot: boolean = player.HasCollectible(
    CollectibleType.COLLECTIBLE_TAROT_CLOTH,
  );

  switch (currentCard as number) {
    // -----Runes with no amp-----
    case Card.RUNE_BLANK: // Blank Rune
    case Card.CARD_SOUL_EVE: // Soul of Eve
    case Card.CARD_SOUL_ISAAC: // Soul of Isaac
    case Card.CARD_SOUL_APOLLYON: // Soul of Apollyon
    case Card.RUNE_SHARD: // Rune Shard
      player.UseCard(currentCard);
      if (hasTarot) {
        player.UseCard(currentCard);
      }
      break;

    // -----Runes which shouldn't be doubled by tarot cloth & have no amp-----
    case Card.RUNE_ANSUZ: // Ansuz
    case Card.CARD_SOUL_CAIN: // Soul of Cain
    case Card.CARD_SOUL_BLUEBABY: // Soul of ???
    case Card.CARD_SOUL_JUDAS: // Soul of Judas
    case Card.CARD_SOUL_LOST: // Soul of the Lost
    case Card.RUNE_BLACK: // Black Rune
    case Card.RUNE_EHWAZ: // Ehwaz
    case Card.RUNE_PERTHRO: // Perthro
    case Card.CARD_SOUL_EDEN: // Soul of Eden
    case Card.CARD_SOUL_JACOB: // Soul of Jacob and Esau
      player.UseCard(currentCard);
      break;

    // -----Amped runes-----
    case Card.CARD_SOUL_LAZARUS: // Soul of Lazarus
      player.UseCard(Card.CARD_SOUL_LAZARUS);
      spawnHearts(
        hasTarot ? 2 : 1,
        player.Position,
        rand,
        HeartSubType.HEART_SOUL,
        true,
        true,
      );
      break;
    case Card.RUNE_BERKANO: // Berkano
    case Card.RUNE_DAGAZ: // Dagaz
      player.UseCard(currentCard);
      player.UseCard(currentCard);
      if (hasTarot) {
        player.UseCard(currentCard);
        player.UseCard(currentCard);
      }
      break;
    case Card.RUNE_HAGALAZ: // Hagalaz
      doHagalaz(player);
      break;
    case Card.RUNE_ALGIZ: // Algiz
      player.UseCard(Card.RUNE_ALGIZ);
      player.AddSoulHearts(1);
      if (hasTarot) {
        player.UseCard(Card.RUNE_ALGIZ);
        player.AddSoulHearts(1);
      }
      break;
    case Card.CARD_SOUL_MAGDALENE: // Soul of Magdalene
      player.UseCard(Card.CARD_SOUL_MAGDALENE);
      player.AddHearts(2);
      if (hasTarot) {
        player.AddHearts(2);
      }
      break;
    case Card.CARD_SOUL_FORGOTTEN: // Soul of the Forgotten
      player.UseCard(Card.CARD_SOUL_FORGOTTEN);
      if (rand.RandomFloat() < 0.25) {
        spawnHearts(
          1,
          player.Position,
          rand,
          HeartSubType.HEART_BONE,
          true,
          true,
        );
      }
      if (hasTarot) {
        player.UseCard(Card.CARD_SOUL_FORGOTTEN);
        spawnHearts(
          1,
          player.Position,
          rand,
          HeartSubType.HEART_BONE,
          true,
          true,
        );
      }
      break;
    case Card.CARD_SOUL_AZAZEL: // Soul of Azazel
      player.UseCard(Card.CARD_SOUL_AZAZEL);
      player.AddBlackHearts(2);
      if (hasTarot) {
        player.UseCard(Card.CARD_SOUL_AZAZEL);
        player.AddBlackHearts(2);
      }
      break;
    case Card.CARD_SOUL_BETHANY: // Soul of Bethany
      player.UseCard(Card.CARD_SOUL_BETHANY);
      if (hasTarot) {
        player.UseCard(Card.CARD_SOUL_BETHANY);
      }
      spawnPickupCluster(
        extMath.randRound(hasTarot ? 1.25 : 0.4, rand),
        player.Position,
        rand,
        PickupVariant.PICKUP_LIL_BATTERY,
        BatterySubType.BATTERY_MICRO,
      );
      break;
    case Card.CARD_SOUL_SAMSON: // Soul of Samson
      player.UseCard(Card.CARD_SOUL_SAMSON);
      if (hasTarot) {
        player.UseCard(Card.CARD_SOUL_SAMSON);
      }
      doSilentGoldenRazor(player, hasTarot ? 2 : 1);
      break;
    case Card.RUNE_JERA: // Jera
      doJera(player, rand, hasTarot);
      break;
    case Card.CARD_SOUL_KEEPER: // Soul of the Keeper
      spawnCoins(
        extMath.randomInt(rand, hasTarot ? 20 : 10, hasTarot ? 50 : 25),
        player.Position,
        rand,
        true,
        true,
      );
      break;
    case Card.CARD_SOUL_LILITH: // Soul of Lilith
      player.UseCard(Card.CARD_SOUL_LILITH);
      if (hasTarot) {
        player.UseCard(Card.CARD_SOUL_LILITH);
      }

      if (
        !player.HasCollectible(CollectibleType.COLLECTIBLE_BFFS) &&
        (rand.RandomFloat() < (hasTarot ? 0.1 : 0.05) ||
          player.GetPlayerType() ===
            Isaac.GetPlayerTypeByName("Lilith", false) ||
          player.GetPlayerType() === Isaac.GetPlayerTypeByName("Lilith", true))
      ) {
        player.AddCollectible(CollectibleType.COLLECTIBLE_BFFS);
      }
      break;

    default:
      return false;
  }

  return true;
}

function doSilentGoldenRazor(player: EntityPlayer, repeat: int = 1) {
  const coins = player.GetNumCoins();
  for (let i = 0; i < repeat; i++) {
    player.UseActiveItem(
      CollectibleType.COLLECTIBLE_GOLDEN_RAZOR,
      false,
      true,
      true,
      false,
    );
  }
  player.AddCoins(coins - player.GetNumCoins());
}

function doHagalaz(player: EntityPlayer) {
  player.UseCard(Card.RUNE_HAGALAZ);

  const entities = Isaac.GetRoomEntities();
  for (const entity of entities) {
    if (entity === undefined) {
      continue;
    }

    if (entity.Type !== EntityType.ENTITY_FIREPLACE) {
      continue;
    }
    if (
      entity.Variant === FireplaceVariant.FIREPLACE_WHITE ||
      entity.Variant === FireplaceVariant.COAL ||
      entity.Variant === FireplaceVariant.FIREPLACE_MOVEABLE ||
      entity.Variant === FireplaceVariant.FIREPLACE_MOVEABLE_BLUE ||
      entity.Variant === FireplaceVariant.FIREPLACE_MOVEABLE_PURPLE
    ) {
      continue;
    }

    entity.Kill();
  }
}

function doJera(player: EntityPlayer, rand: RNG, hasTarot: boolean) {
  player.UseCard(Card.RUNE_JERA);
  if (hasTarot) {
    player.UseCard(Card.RUNE_JERA);
  }

  const entities = Isaac.GetRoomEntities();
  let pickupPresent = false;
  for (const entity of entities) {
    if (entity.Type !== EntityType.ENTITY_PICKUP) {
      continue;
    }
    if (
      entity.Variant === PickupVariant.PICKUP_BED ||
      entity.Variant === PickupVariant.PICKUP_BIGCHEST ||
      entity.Variant === PickupVariant.PICKUP_COLLECTIBLE ||
      entity.Variant === PickupVariant.PICKUP_MOMSCHEST ||
      entity.Variant === PickupVariant.PICKUP_TROPHY ||
      entity.Variant === PickupVariant.PICKUP_NULL
    ) {
      continue;
    }

    pickupPresent = true;
    break;
  }

  const justiceOdds = (hasTarot ? 1.25 : 0.5) + (pickupPresent ? 0 : 0.5);
  for (let j = 0; j < extMath.randRound(justiceOdds, rand); j++) {
    player.UseCard(
      Card.CARD_JUSTICE,
      UseFlag.USE_NOANIM | UseFlag.USE_NOANNOUNCER,
    );
  }
}
