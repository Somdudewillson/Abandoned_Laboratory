export type ContextHash = string;
export interface EntityData {
  Type: int;
  Variant: int;
  Subtype: int;
}
export function newEntityData(
  newType: int,
  newVariant: int,
  newSubtype: int,
): EntityData {
  return {
    Type: newType,
    Variant: newVariant,
    Subtype: newSubtype,
  } as EntityData;
}

export const enum EntityToken {
  AIR = 0,
  WALL = 1,
  DOOR = 2,
  PASSABLE = 3,
  IMPASSABLE_GROUND = 4,
  IMPASSABLE_ALL = 5,
  ROCK = 6,
  ROCK_ALT = 7,
  ROCK_SPIKE = 8,
  BLOCK_KEY = 9,
  BLOCK_METAL = 10,
  PIT = 11,
  PITFALL = 12,
  TNT = 13,
  TNT_PUSHABLE = 14,
  SPIKES = 15,
  SPIKES_ON_OFF = 16,
  COBWEB = 17,
  POOP = 18,
  POOP_CORNY = 19,
  POOP_RED = 20,
  POOP_GOLD = 21,
  POOP_RAINBOW = 22,
  POOP_BLACK = 23,
  PROP = 24,
  PICKUP = 25,
  PICKUP_NOT_ITEM = 26,
  PICKUP_NOT_CHEST_ITEM = 27,
  PICKUP_NOT_CHEST_ITEM_COIN = 28,
  PICKUP_NOT_CHEST_ITEM_TRINKET = 29,
  PICKUP_HEART = 30,
  PICKUP_COIN = 31,
  PICKUP_KEY = 32,
  PICKUP_BOMB = 33,
  PICKUP_PILL = 34,
  PICKUP_CARD = 35,
  PICKUP_RUNE = 36,
  PICKUP_TRINKET = 37,
  PICKUP_BATTERY = 38,
  PICKUP_SACK = 39,
}
/** "Decays" a token into a more generic form.
 * @returns The decayed `EntityToken`, or `null` if the given `EntityToken` cannot decay.
 */
export function decayToken(original: EntityToken): EntityToken | null {
  switch (original) {
    default:
      return null;
    case EntityToken.TNT_PUSHABLE:
      return EntityToken.TNT;
    case EntityToken.PROP:
    case EntityToken.PICKUP:
      return EntityToken.AIR;
    case EntityToken.PICKUP_HEART:
    case EntityToken.PICKUP_COIN:
    case EntityToken.PICKUP_KEY:
    case EntityToken.PICKUP_BOMB:
    case EntityToken.PICKUP_PILL:
    case EntityToken.PICKUP_CARD:
    case EntityToken.PICKUP_BATTERY:
    case EntityToken.PICKUP_SACK:
      return EntityToken.PICKUP_NOT_CHEST_ITEM_TRINKET;
    case EntityToken.ROCK_ALT:
    case EntityToken.ROCK_SPIKE:
    case EntityToken.BLOCK_METAL:
      return EntityToken.ROCK;
    case EntityToken.TNT:
    case EntityToken.SPIKES_ON_OFF:
    case EntityToken.COBWEB:
    case EntityToken.POOP:
      return EntityToken.PASSABLE;
    case EntityToken.PICKUP_TRINKET:
      return EntityToken.PICKUP_NOT_CHEST_ITEM_COIN;
    case EntityToken.PICKUP_NOT_ITEM:
      return EntityToken.PICKUP;
    case EntityToken.IMPASSABLE_ALL:
    case EntityToken.ROCK:
    case EntityToken.PIT:
    case EntityToken.SPIKES:
      return EntityToken.IMPASSABLE_GROUND;
    case EntityToken.POOP_CORNY:
    case EntityToken.POOP_RED:
    case EntityToken.POOP_GOLD:
    case EntityToken.POOP_RAINBOW:
    case EntityToken.POOP_BLACK:
      return EntityToken.POOP;
    case EntityToken.PICKUP_NOT_CHEST_ITEM:
      return EntityToken.PICKUP_NOT_ITEM;
    case EntityToken.PICKUP_NOT_CHEST_ITEM_COIN:
    case EntityToken.PICKUP_NOT_CHEST_ITEM_TRINKET:
      return EntityToken.PICKUP_NOT_CHEST_ITEM;
    case EntityToken.BLOCK_KEY:
      return EntityToken.IMPASSABLE_ALL;
    case EntityToken.PITFALL:
      return EntityToken.PIT;
    case EntityToken.PICKUP_RUNE:
      return EntityToken.PICKUP_CARD;
  }
}
/** "Decays" a set of tokens into every possible set of more generic forms. */
export function decayTokens(originals: EntityToken[]): EntityToken[][] | null {
  const options: EntityToken[][] = [];

  // Get decay products of each original
  let nullCount = 0;
  for (let i = 0; i < originals.length; i++) {
    const decayed = decayToken(originals[i]);

    if (decayed != null) {
      options.push([originals[i], decayed]);
    } else {
      options.push([originals[i]]);
      nullCount++;
    }
  }

  // If none of the original tokens can decay, short-circuit
  if (nullCount === originals.length) {
    return null;
  }

  const out: EntityToken[][] = [];
  const indexes: int[] = [];
  let canContinue = true;
  for (let i = 0; i < options.length; i++) {
    indexes.push(0);
  }
  while (canContinue) {
    canContinue = false;

    // Increment our index array
    for (let i = 0; i < options.length; i++) {
      if (indexes[i] < options[i].length) {
        indexes[i]++;
        canContinue = true;
        break;
      } else {
        indexes[i] = 0;
      }
    }

    // Store the output of the current index array
    if (canContinue) {
      const newEntrySet: EntityToken[] = [];

      for (let i = 0; i < options.length; i++) {
        newEntrySet.push(options[i][indexes[i]]);
      }

      out.push(newEntrySet);
    }
  }

  return null;
}
/** Converts a set of `EntityToken`s into a `ContextHash`. */
export function hashContext(
  up: EntityToken,
  left: EntityToken,
  right: EntityToken,
  down: EntityToken,
): ContextHash {
  return `${up} ${left} ${right} ${down}`;
}

/** Converts an entity with `type` to an `EntityToken`. */
export function tokenize(entity: EntityData): EntityToken {
  switch (entity.Type) {
    default:
      return EntityToken.AIR;
    case -1:
      return EntityToken.WALL;
    case 1002:
    case 1008:
      return EntityToken.ROCK_ALT;
    case 1300:
      return EntityToken.TNT;
    case 1496:
      return EntityToken.POOP_GOLD;
    case -2:
      return EntityToken.DOOR;
    case 1495:
      return EntityToken.POOP_CORNY;
    case 291:
      return EntityToken.PITFALL;
    case 1000:
    case 1001:
    case 1011:
      return EntityToken.ROCK;
    case 1931:
      return EntityToken.SPIKES_ON_OFF;
    case 4500:
    case 10000:
      return EntityToken.PASSABLE;
    case 1930:
      return EntityToken.SPIKES;
    case 1500:
    case 1498:
    case 1501:
      return EntityToken.POOP;
    case 1940:
      return EntityToken.COBWEB;
    case 4000:
      return EntityToken.BLOCK_KEY;
    case 1497:
      return EntityToken.POOP_BLACK;
    case 1490:
      return EntityToken.POOP_RED;
    case 292:
      return EntityToken.TNT_PUSHABLE;
    case 1494:
      return EntityToken.POOP_RAINBOW;
    case 1901:
    case 1999:
      return EntityToken.IMPASSABLE_ALL;
    case 3000:
      return EntityToken.PIT;
    case 1900:
      return EntityToken.BLOCK_METAL;
    case 1010:
      return EntityToken.ROCK_SPIKE;
    case 0:
      switch (entity.Variant) {
        default:
        case 0:
          return EntityToken.AIR;
        case 10:
          return EntityToken.PROP;
        case 20:
          return EntityToken.PROP;
        case 30:
          return EntityToken.PROP;
      }
    case 5:
      switch (entity.Variant) {
        default:
        case 0:
          return EntityToken.PICKUP;
        case 1:
          return EntityToken.PICKUP_NOT_CHEST_ITEM;
        case 2:
          return EntityToken.PICKUP_NOT_ITEM;
        case 3:
          return EntityToken.PICKUP_NOT_CHEST_ITEM_COIN;
        case 4:
          return EntityToken.PICKUP_NOT_CHEST_ITEM_TRINKET;
        case 10:
          return EntityToken.PICKUP_HEART;
        case 20:
          return EntityToken.PICKUP_COIN;
        case 30:
          return EntityToken.PICKUP_KEY;
        case 40:
          return EntityToken.PICKUP_BOMB;
        case 69:
          return EntityToken.PICKUP_SACK;
        case 70:
          return EntityToken.PICKUP_PILL;
        case 90:
          return EntityToken.PICKUP_BATTERY;
        case 300:
          return EntityToken.PICKUP_CARD;
        case 301:
          return EntityToken.PICKUP_RUNE;
        case 350:
          return EntityToken.PICKUP_TRINKET;
      }
  }
}

/** Converts an `EntityToken` to an entity type. */
export function detokenize(token: EntityToken): EntityData | null {
  switch (token) {
    default:
    case EntityToken.AIR:
      return null;
    case EntityToken.WALL:
      return null;
    case EntityToken.DOOR:
      return null;
    case EntityToken.PASSABLE:
      return newEntityData(LayoutGridType.POOP, 0, 0);
    case EntityToken.IMPASSABLE_GROUND:
      return newEntityData(LayoutGridType.ROCK, 0, 0);
    case EntityToken.IMPASSABLE_ALL:
      return newEntityData(LayoutGridType.BLOCK_METAL, 0, 0);
    case EntityToken.ROCK:
      return newEntityData(LayoutGridType.ROCK, 0, 0);
    case EntityToken.ROCK_ALT:
      return newEntityData(LayoutGridType.ROCK_ALT, 0, 0);
    case EntityToken.ROCK_SPIKE:
      return newEntityData(LayoutGridType.ROCK_SPIKE, 0, 0);
    case EntityToken.BLOCK_KEY:
      return newEntityData(LayoutGridType.BLOCK_KEY, 0, 0);
    case EntityToken.BLOCK_METAL:
      return newEntityData(LayoutGridType.BLOCK_METAL, 0, 0);
    case EntityToken.PIT:
      return newEntityData(LayoutGridType.PIT, 0, 0);
    case EntityToken.PITFALL:
      return newEntityData(LayoutGridType.PITFALL, 0, 0);
    case EntityToken.TNT:
      return newEntityData(LayoutGridType.TNT, 0, 0);
    case EntityToken.TNT_PUSHABLE:
      return newEntityData(LayoutGridType.TNT_PUSHABLE, 0, 0);
    case EntityToken.SPIKES:
      return newEntityData(LayoutGridType.SPIKES, 0, 0);
    case EntityToken.SPIKES_ON_OFF:
      return newEntityData(LayoutGridType.SPIKES_ON_OFF, 0, 0);
    case EntityToken.COBWEB:
      return newEntityData(LayoutGridType.COBWEB, 0, 0);
    case EntityToken.POOP:
      return newEntityData(LayoutGridType.POOP, 0, 0);
    case EntityToken.POOP_CORNY:
      return newEntityData(LayoutGridType.POOP_CORNY, 0, 0);
    case EntityToken.POOP_RED:
      return newEntityData(LayoutGridType.POOP_RED, 0, 0);
    case EntityToken.POOP_GOLD:
      return newEntityData(LayoutGridType.POOP_GOLD, 0, 0);
    case EntityToken.POOP_RAINBOW:
      return newEntityData(LayoutGridType.POOP_RAINBOW, 0, 0);
    case EntityToken.POOP_BLACK:
      return newEntityData(LayoutGridType.POOP_BLACK, 0, 0);
    case EntityToken.PROP:
      return newEntityData(LayoutGridType.PROP_A, 0, 0);
    case EntityToken.PICKUP:
      return newEntityData(EntityType.ENTITY_PICKUP, PickupRandomGroupVariant.ANY, 0);
    case EntityToken.PICKUP_NOT_ITEM:
      return newEntityData(EntityType.ENTITY_PICKUP, PickupRandomGroupVariant.NOT_ITEM, 0);
    case EntityToken.PICKUP_NOT_CHEST_ITEM:
      return newEntityData(EntityType.ENTITY_PICKUP, PickupRandomGroupVariant.NOT_CHEST_ITEM, 0);
    case EntityToken.PICKUP_NOT_CHEST_ITEM_COIN:
      return newEntityData(EntityType.ENTITY_PICKUP, PickupRandomGroupVariant.NOT_CHEST_ITEM_COIN, 0);
    case EntityToken.PICKUP_NOT_CHEST_ITEM_TRINKET:
      return newEntityData(EntityType.ENTITY_PICKUP, PickupRandomGroupVariant.NOT_CHEST_ITEM_TRINKET, 0);
    case EntityToken.PICKUP_HEART:
      return newEntityData(EntityType.ENTITY_PICKUP, 10, 0);
    case EntityToken.PICKUP_COIN:
      return newEntityData(EntityType.ENTITY_PICKUP, 20, 0);
    case EntityToken.PICKUP_KEY:
      return newEntityData(EntityType.ENTITY_PICKUP, 30, 0);
    case EntityToken.PICKUP_BOMB:
      return newEntityData(EntityType.ENTITY_PICKUP, 40, 0);
    case EntityToken.PICKUP_PILL:
      return newEntityData(EntityType.ENTITY_PICKUP, 70, 0);
    case EntityToken.PICKUP_CARD:
      return newEntityData(EntityType.ENTITY_PICKUP, 300, 0);
    case EntityToken.PICKUP_RUNE:
      return newEntityData(EntityType.ENTITY_PICKUP, 301, 0);
    case EntityToken.PICKUP_TRINKET:
      return newEntityData(EntityType.ENTITY_PICKUP, 350, 0);
    case EntityToken.PICKUP_BATTERY:
      return newEntityData(EntityType.ENTITY_PICKUP, 90, 0);
    case EntityToken.PICKUP_SACK:
      return newEntityData(EntityType.ENTITY_PICKUP, 69, 0);
  }
}
