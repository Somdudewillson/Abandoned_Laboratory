import { CollectibleTypeLabUpgrade } from "../../../../constants";
import * as extMath from "../../../../utils/extMath";
import {
  getCoinVal,
  spawnCoins,
  spawnHearts,
  spawnPickupCluster,
} from "../../../../utils/utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_DIGITALCARD as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  const room: Room = Game().GetRoom();
  const level: Level = Game().GetLevel();

  const currentCard: Card = player.GetCard(0);
  if (currentCard == null || currentCard === 0) {
    return false;
  }
  const hasTarot: boolean = player.HasCollectible(
    CollectibleType.COLLECTIBLE_TAROT_CLOTH,
  );

  switch (currentCard as number) {
    // -----Cards with no amp-----
    case Card.CARD_RULES: // Rules Card
    case Card.CARD_HIGH_PRIESTESS: // The High Priestess
    case Card.CARD_REVERSE_WORLD: // The World?
    case Card.CARD_CHARIOT: // The Chariot
    case Card.CARD_REVERSE_TOWER: // The Tower?
    case Card.CARD_ERA_WALK: // Era Walk
    case Card.CARD_REVERSE_DEVIL: // The Devil?
    case Card.CARD_REVERSE_DEATH: // Death?
    case Card.CARD_REVERSE_LOVERS: // The Lovers?
    case Card.CARD_REVERSE_EMPRESS: // The Empress?
    case Card.CARD_REVERSE_MAGICIAN: // The Magician?
    case Card.CARD_WILD: // Wild Card
    case Card.CARD_REVERSE_TEMPERANCE: // Temperance?
    case Card.CARD_WHEEL_OF_FORTUNE: // Wheel of Fortune
    case Card.CARD_TEMPERANCE: // Temperance
    case Card.CARD_JUDGEMENT: // Judgement
    case Card.CARD_JUSTICE: // Justice
    case Card.CARD_SUN: // The Sun
    case Card.CARD_ANCIENT_RECALL: // Ancient Recall
    case Card.CARD_REVERSE_FOOL: // The Fool?
    case Card.CARD_REVERSE_JUSTICE: // Justice?
    case Card.CARD_REVERSE_STARS: // The Stars?
    case Card.CARD_REVERSE_JUDGEMENT: // Judgement?
      player.UseCard(currentCard);
      if (hasTarot) {
        player.UseCard(currentCard);
      }
      break;

    // -----Cards which shouldn't be doubled by tarot cloth & have no amp-----
    case Card.CARD_SUICIDE_KING: // Suicide King
    case Card.CARD_REVERSE_WHEEL_OF_FORTUNE: // Wheel of Fortune?
    case Card.CARD_HOLY: // Holy Card
    case Card.CARD_FOOL: // The Fool
    case Card.CARD_JOKER: // Joker
    case Card.CARD_GET_OUT_OF_JAIL: // Get Out of Jail Free
    case Card.CARD_HERMIT: // The Hermit
    case Card.CARD_MOON: // The Moon
    case Card.CARD_STARS: // The Stars
    case Card.CARD_REVERSE_MOON: // The Moon?
    case Card.CARD_REVERSE_EMPEROR: // The Emperor?
    case Card.CARD_REVERSE_HIGH_PRIESTESS: // The High Priestess?
    case Card.CARD_EMPEROR: // The Emperor
    case Card.CARD_HANGED_MAN: // The Hanged Man
    case Card.CARD_REVERSE_SUN: // The Sun?
    case Card.CARD_REVERSE_HANGED_MAN: // The Hanged Man?
    case Card.CARD_HUMANITY: // A Card Against Humanity
    case Card.CARD_CREDIT: // Credit Card
    case Card.CARD_CHAOS: // Chaos Card
    default:
      player.UseCard(currentCard);
      break;

    // -----Amped cards-----
    case Card.CARD_REVERSE_HERMIT: // The Hermit?
      doReversedHermit(player, room, hasTarot, rand);
      break;
    case Card.CARD_MAGICIAN: // The Magician
    case Card.CARD_REVERSE_CHARIOT: // The Chariot?
    case Card.CARD_DEVIL: // The Devil
    case Card.CARD_EMPRESS: // The Empress
    case Card.CARD_HUGE_GROWTH: // Huge Growth
      player.UseCard(currentCard);
      doSilentGoldenRazor(player);

      if (hasTarot) {
        player.UseCard(currentCard);
        doSilentGoldenRazor(player);
      }
      break;
    case Card.CARD_STRENGTH: // Strength
    case Card.CARD_REVERSE_STRENGTH: // Strength?
      player.UseCard(Card.CARD_STRENGTH);
      player.UseCard(Card.CARD_REVERSE_STRENGTH);
      if (hasTarot) {
        player.UseCard(Card.CARD_STRENGTH);
        player.UseCard(Card.CARD_REVERSE_STRENGTH);
      }
      break;
    case Card.CARD_WORLD: // The World
      if (hasTarot) {
        level.RemoveCurses(LevelCurse.CURSE_OF_THE_LOST);
      }
      player.UseCard(currentCard);
      break;
    case Card.CARD_TOWER: // The Tower
      if (hasTarot) {
        doTower(player, rand, 0.6, 14, 50);
      } else {
        doTower(player, rand, 0.8, 7, 50);
      }
      break;
    case Card.CARD_DEATH: // Death
      doDeath(player, room, hasTarot);
      break;
    case Card.CARD_LOVERS: // The Lovers
      doLovers(player, hasTarot, rand);
      break;
    case Card.CARD_ACE_OF_CLUBS: // Ace of Clubs
    case Card.CARD_ACE_OF_SPADES: // Ace of Spades
    case Card.CARD_ACE_OF_DIAMONDS: // Ace of Diamonds
      doGenericAce(currentCard, room, hasTarot, rand, 0.25);
      break;
    case Card.CARD_ACE_OF_HEARTS: // Ace of Hearts
      doAceHearts(room, hasTarot, rand, 0.15, 0.4, 0.15);
      break;
    case Card.CARD_HIEROPHANT: // The Hierophant
      spawnHearts(
        hasTarot ? 5 : 2.5,
        player.Position,
        rand,
        HeartSubType.HEART_SOUL,
        true,
        true,
      );
      break;
    case Card.CARD_REVERSE_HIEROPHANT: // The Hierophant?
      spawnHearts(
        hasTarot ? 5 : 2,
        player.Position,
        rand,
        HeartSubType.HEART_BONE,
        false,
        true,
      );
      break;
    case Card.CARD_CLUBS_2: // Two of Clubs
      doTwoClubs(player, rand, 1.75);
      if (hasTarot) {
        doTwoClubs(player, rand, 1.75);
      }
      break;
    case Card.CARD_SPADES_2: // Two of Spades
      doTwoSpades(player, rand, 1.75);
      if (hasTarot) {
        doTwoSpades(player, rand, 1.75);
      }
      break;
    case Card.CARD_DIAMONDS_2: // Two of Diamonds
      doTwoDiamonds(player, rand, 1.5);
      if (hasTarot) {
        doTwoDiamonds(player, rand, 1.5);
      }
      break;
    case Card.CARD_HEARTS_2: // Two of Hearts
      doTwoHearts(player, rand, 2.5, hasTarot);
      break;
    case Card.CARD_QUEEN_OF_HEARTS: // Queen of Hearts
      spawnHearts(
        Math.floor(rand.RandomFloat() * 14 + 1) * (hasTarot ? 2 : 1),
        player.Position,
        rand,
        HeartSubType.HEART_FULL,
        true,
        true,
      );
      break;
  }

  return true;
}

function doSilentGoldenRazor(player: EntityPlayer, repeat: int = 1): void {
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

function doReversedHermit(
  player: EntityPlayer,
  room: Room,
  hasTarot: boolean,
  rand: RNG,
): void {
  let sold = false;

  const entities = room.GetEntities();
  for (let i = 0; i < entities.Size; i++) {
    const entity = entities.Get(i);

    if (entity == null) {
      continue;
    }
    if (entity.Type !== EntityType.ENTITY_PICKUP) {
      continue;
    }

    const testSell = entity.ToPickup()!;
    if (testSell.Variant === PickupVariant.PICKUP_COIN) {
      continue;
    } // You can't sell coins
    const val = getCoinVal(testSell);
    if (val > 0) {
      sold = true;
    } else {
      continue;
    } // Don't sell worthless things

    spawnCoins(Math.floor(val * 1.19), testSell.Position, rand, true);
    testSell.Remove();
  }

  if (!sold || hasTarot) {
    let looseCoins = 2;
    if (!sold && hasTarot) {
      looseCoins = 4;
    }
    spawnCoins(looseCoins, player.Position, rand, true, true);
  }
}

function doTower(
  player: EntityPlayer,
  rand: RNG,
  oddsTroll: float,
  count: int,
  avgDist: float,
): void {
  for (let i = 0; i < count; i++) {
    let subType = BombSubType.BOMB_NORMAL;
    if (rand.RandomFloat() < oddsTroll) {
      subType = BombSubType.BOMB_TROLL;
    }

    let shiftX = avgDist;
    let shiftY = avgDist;
    shiftX *= rand.RandomFloat() / 4 + 0.875;
    shiftY *= rand.RandomFloat() / 4 + 0.875;
    shiftX *= extMath.randomSign(rand);
    shiftY *= extMath.randomSign(rand);

    const shift = Vector(shiftX, shiftY);
    let position = player.Position.__add(shift);
    if (subType === BombSubType.BOMB_TROLL) {
      position = position.__add(shift);
    }
    position = Isaac.GetFreeNearPosition(position, 5);

    const velocity = Vector(
      rand.RandomFloat() * 4 - 2,
      rand.RandomFloat() * 4 - 2,
    );

    Game().Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_BOMB,
      position,
      velocity,
      null,
      subType,
      rand.GetSeed(),
    );
  }
}

function doDeath(player: EntityPlayer, room: Room, hasTarot: boolean): void {
  player.UseCard(Card.CARD_DEATH);
  if (hasTarot) {
    player.UseCard(Card.CARD_DEATH);
  }

  const entities = room.GetEntities();
  for (let i = 0; i < entities.Size; i++) {
    const entity = entities.Get(i);

    if (entity == null) {
      continue;
    }
    if (!entity.IsActiveEnemy(false)) {
      continue;
    }
    if (
      (entity.GetEntityFlags() & EntityFlag.FLAG_FRIENDLY) ===
      EntityFlag.FLAG_FRIENDLY
    ) {
      continue;
    }
    if (
      (entity.GetEntityFlags() & EntityFlag.FLAG_CHARM) ===
      EntityFlag.FLAG_CHARM
    ) {
      continue;
    }

    if (hasTarot) {
      entity.AddFear(EntityRef(player), 60);
    } else {
      entity.AddFear(EntityRef(player), 30);
    }
  }
}

function doLovers(player: EntityPlayer, hasTarot: boolean, rand: RNG): void {
  let points = 5;
  if (hasTarot) {
    points *= 2;
  }

  if (
    player.GetPlayerType() === Isaac.GetPlayerTypeByName("Keeper") ||
    player.GetPlayerType() === Isaac.GetPlayerTypeByName("Keeper", true)
  ) {
    spawnCoins(points / 2, player.Position, rand, false, true);
    return;
  }

  let spawnAmount = points;
  let spawnType = HeartSubType.HEART_HALF;
  if (player.HasFullHearts()) {
    spawnAmount /= 2;
    spawnType = HeartSubType.HEART_HALF_SOUL;
  }

  for (let i = 0; i < spawnAmount; i++) {
    const position = Isaac.GetFreeNearPosition(player.Position, 5);
    const velocity = Vector(
      rand.RandomFloat() * 4 - 2,
      rand.RandomFloat() * 4 - 2,
    );

    Game().Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_HEART,
      position,
      velocity,
      null,
      spawnType,
      rand.GetSeed(),
    );
  }
}

function validAceTarget(entity: Entity, variant: number): boolean {
  if (entity == null) {
    return false;
  }

  if (!entity.IsActiveEnemy(false)) {
    if (entity.Type !== EntityType.ENTITY_PICKUP) {
      return false;
    }
    const pickup = entity.ToPickup()!;

    if (pickup.IsShopItem()) {
      return false;
    }
    if (pickup.Variant === PickupVariant.PICKUP_TROPHY) {
      return false;
    }
    if (pickup.Variant === PickupVariant.PICKUP_COLLECTIBLE) {
      return false;
    }
    if (pickup.Variant === PickupVariant.PICKUP_BED) {
      return false;
    }
    if (pickup.Variant === PickupVariant.PICKUP_BIGCHEST) {
      return false;
    }
    if (pickup.Variant === variant) {
      return false;
    }

    return true;
  }
  if (
    (entity.GetEntityFlags() & EntityFlag.FLAG_FRIENDLY) ===
    EntityFlag.FLAG_FRIENDLY
  ) {
    return false;
  }
  if (entity.IsBoss()) {
    return false;
  }

  return true;
}

function doGenericAce(
  currentCard: Card,
  room: Room,
  hasTarot: boolean,
  rand: RNG,
  doubleOdds: float,
): void {
  if (hasTarot) {
    doubleOdds *= 2;
  }

  let variant = PickupVariant.PICKUP_NULL;
  let subtype = 0;
  switch (currentCard) {
    case Card.CARD_ACE_OF_DIAMONDS:
      variant = PickupVariant.PICKUP_COIN;
      subtype = CoinSubType.COIN_PENNY;
      break;
    case Card.CARD_ACE_OF_SPADES:
      variant = PickupVariant.PICKUP_KEY;
      subtype = KeySubType.KEY_NORMAL;
      break;
    case Card.CARD_ACE_OF_CLUBS:
      variant = PickupVariant.PICKUP_BOMB;
      subtype = BombSubType.BOMB_NORMAL;
      break;
    default:
      return;
  }

  const entities = room.GetEntities();
  for (let i = 0; i < entities.Size; i++) {
    const entity = entities.Get(i);

    if (entity == null) {
      continue;
    }
    let amount = 1;
    if (rand.RandomFloat() < doubleOdds) {
      amount++;
    }

    if (validAceTarget(entity, variant)) {
      spawnPickupCluster(amount, entity.Position, rand, variant, subtype);
      entity.Remove();
    }
  }
}

function doAceHearts(
  room: Room,
  hasTarot: boolean,
  rand: RNG,
  doubleOdds: float,
  soulOdds: float,
  evilOdds: float,
): void {
  if (hasTarot) {
    doubleOdds *= 2;
  }

  const entities = room.GetEntities();
  for (let i = 0; i < entities.Size; i++) {
    const entity = entities.Get(i);

    if (entity == null) {
      continue;
    }
    let amount = 1;
    if (rand.RandomFloat() < doubleOdds) {
      amount++;
    }

    if (validAceTarget(entity, PickupVariant.PICKUP_HEART)) {
      let subtype = HeartSubType.HEART_FULL;
      if (rand.RandomFloat() < soulOdds) {
        subtype = HeartSubType.HEART_SOUL;
        if (rand.RandomFloat() < evilOdds) {
          subtype = HeartSubType.HEART_BLACK;
        }
      }

      spawnPickupCluster(
        amount,
        entity.Position,
        rand,
        PickupVariant.PICKUP_HEART,
        subtype,
      );
      entity.Remove();
    }
  }
}

function doTwoClubs(player: EntityPlayer, rand: RNG, mult: float): void {
  let count = player.GetNumBombs();
  if (count < 1) {
    count = 1;
  }

  player.AddBombs(extMath.randRound(count * (mult - 1), rand));
}

function doTwoSpades(player: EntityPlayer, rand: RNG, mult: float): void {
  let count = player.GetNumKeys();
  if (count < 1) {
    count = 1;
  }

  player.AddKeys(extMath.randRound(count * (mult - 1), rand));
}

function doTwoDiamonds(player: EntityPlayer, rand: RNG, mult: float): void {
  let count = player.GetNumCoins();
  if (count < 1) {
    count = 1;
  }

  player.AddCoins(extMath.randRound(count * (mult - 1), rand));
}

function doTwoHearts(
  player: EntityPlayer,
  rand: RNG,
  mult: float,
  hasTarot: boolean,
): void {
  if (hasTarot) {
    mult *= mult;
  }

  const count = player.GetHearts();
  let addCount = extMath.randRound(count * (mult - 1), rand);

  let redCount = Math.min(player.GetEffectiveMaxHearts() - count, addCount);
  if (redCount <= 0) {
    redCount = 1;
  }
  player.AddHearts(redCount);
  addCount -= redCount;

  if (addCount <= 0) {
    return;
  }
  player.AddSoulHearts(Math.floor(addCount / 6));
}
