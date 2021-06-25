export type ContextHash = string;

export const enum EntityToken {
  AIR = 0,
  WALL = 1,
  DOOR = 2,
  PASSABLE = 3,
  IMPASSABLE_GROUND = 4,
  IMPASSABLE_ALL = 5,
}
/** "Decays" a token into a more generic form.
 * @returns The decayed `EntityToken`, or `null` if the given `EntityToken` cannot decay.
 */
export function decayToken(original: EntityToken): EntityToken | null {
  switch (original) {
    default:
      return null;
    case EntityToken.IMPASSABLE_ALL:
      return EntityToken.IMPASSABLE_GROUND;
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
export function tokenize(type: int): EntityToken {
  switch (type) {
    default:
      return EntityToken.AIR;
    case 10:
    case 20:
    case 30:
    case 292:
    case 1300:
    case 1490:
    case 1494:
    case 1495:
    case 1496:
    case 1497:
    case 1498:
    case 1500:
    case 1501:
    case 1931:
    case 1940:
    case 4500:
    case 10000:
      return EntityToken.PASSABLE;
    case 1901:
    case 1999:
    case 4000:
      return EntityToken.IMPASSABLE_ALL;
    case 291:
    case 1000:
    case 1001:
    case 1002:
    case 1008:
    case 1010:
    case 1011:
    case 1930:
    case 3000:
      return EntityToken.IMPASSABLE_GROUND;
    case -1:
      return EntityToken.WALL;
    case -2:
      return EntityToken.DOOR;
  }
}

/** Converts an `EntityToken` to an entity type. */
export function detokenize(token: EntityToken): int | null {
  switch (token) {
    default:
    case EntityToken.AIR:
      return null;
    case EntityToken.WALL:
      return null;
    case EntityToken.DOOR:
      return null;
    case EntityToken.PASSABLE:
      return LayoutGridType.POOP;
    case EntityToken.IMPASSABLE_GROUND:
      return LayoutGridType.ROCK;
    case EntityToken.IMPASSABLE_ALL:
      return LayoutGridType.BLOCK_METAL;
  }
}
