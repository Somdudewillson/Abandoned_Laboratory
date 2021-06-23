export function getCoinVal(pickup: EntityPickup, useDevil = false): int {
  switch (pickup.Variant) {
    case PickupVariant.PICKUP_COIN:
      return pickup.GetCoinValue(); // Just return coin value
    case PickupVariant.PICKUP_COLLECTIBLE:
      if (useDevil) {
        // Calculate item value
        return (
          Isaac.GetItemConfig().GetCollectible(pickup.SubType).DevilPrice * 15
        );
      }
      return 15;

    case PickupVariant.PICKUP_HEART:
      // Calculate value based on type
      switch (pickup.SubType) {
        case HeartSubType.HEART_FULL:
        default:
          return 3;
        case HeartSubType.HEART_HALF:
          return 1;
        case HeartSubType.HEART_DOUBLEPACK:
          return 6;
        case HeartSubType.HEART_SOUL:
          return 5;
        case HeartSubType.HEART_HALF_SOUL:
          return 3;
      }
    case PickupVariant.PICKUP_KEY:
      if (pickup.SubType === KeySubType.KEY_NORMAL) {
        return 5;
      }
      if (pickup.SubType === KeySubType.KEY_DOUBLEPACK) {
        return 10;
      }
      break;
    case PickupVariant.PICKUP_BOMB:
      if (pickup.SubType === BombSubType.BOMB_NORMAL) {
        return 5;
      }
      if (pickup.SubType === BombSubType.BOMB_DOUBLEPACK) {
        return 10;
      }
      break;
    case PickupVariant.PICKUP_LIL_BATTERY:
      if (pickup.SubType === BatterySubType.BATTERY_NORMAL) {
        return 5;
      }
      if (pickup.SubType === BatterySubType.BATTERY_MICRO) {
        return 2;
      }
      break;
    case PickupVariant.PICKUP_TAROTCARD:
    case PickupVariant.PICKUP_PILL:
      return 5;
    case PickupVariant.PICKUP_GRAB_BAG:
      return 7;
    default:
      return 0;
  }

  return 0;
}

export function spawnCoins(
  amount: int,
  position: Vector,
  rand: RNG,
  consolidate = false,
  placeFree = false,
): void {
  if (!consolidate) {
    spawnPickupCluster(
      amount,
      position,
      rand,
      PickupVariant.PICKUP_COIN,
      CoinSubType.COIN_PENNY,
      placeFree,
    );
    return;
  }
  let velocity = Vector(0, 0);

  for (let c = amount; c > 0; ) {
    if (placeFree) {
      position = Isaac.GetFreeNearPosition(position, 1);
    } else {
      velocity = Vector(rand.RandomFloat() * 4 - 2, rand.RandomFloat() * 4 - 2);
    }

    let coinType: CoinSubType = CoinSubType.COIN_PENNY;
    let spawnedVal = 1;
    if (c >= 10) {
      coinType = CoinSubType.COIN_DIME;
      spawnedVal = 10;
    } else if (c >= 5) {
      coinType = CoinSubType.COIN_NICKEL;
      spawnedVal = 5;
    }

    Isaac.Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_COIN,
      coinType,
      position,
      velocity,
      null,
    );
    c -= spawnedVal;
  }
}

export function spawnHearts(
  amount: int,
  position: Vector,
  rand: RNG,
  subtype: number,
  consolidate = false,
  placeFree = false,
): void {
  if (!consolidate) {
    spawnPickupCluster(
      amount,
      position,
      rand,
      PickupVariant.PICKUP_HEART,
      subtype,
      placeFree,
    );
    return;
  }
  let quadType = null;
  let doubleType = null;
  let singleType = HeartSubType.HEART_HALF;
  switch (subtype) {
    case HeartSubType.HEART_BLACK:
    case HeartSubType.HEART_BLENDED:
    case HeartSubType.HEART_BONE:
    case HeartSubType.HEART_ETERNAL:
    case HeartSubType.HEART_GOLDEN:
    case HeartSubType.HEART_SCARED:
    default:
      spawnPickupCluster(
        amount,
        position,
        rand,
        PickupVariant.PICKUP_HEART,
        subtype,
        placeFree,
      );
      return;
    case HeartSubType.HEART_DOUBLEPACK:
      amount *= 4;

      quadType = HeartSubType.HEART_DOUBLEPACK;
      doubleType = HeartSubType.HEART_FULL;
      singleType = HeartSubType.HEART_HALF;
      break;
    case HeartSubType.HEART_FULL:
      amount *= 2;

      quadType = HeartSubType.HEART_DOUBLEPACK;
      doubleType = HeartSubType.HEART_FULL;
      singleType = HeartSubType.HEART_HALF;
      break;
    case HeartSubType.HEART_HALF:
      quadType = HeartSubType.HEART_DOUBLEPACK;
      doubleType = HeartSubType.HEART_FULL;
      singleType = HeartSubType.HEART_HALF;
      break;
    case HeartSubType.HEART_SOUL:
      amount *= 2;

      doubleType = HeartSubType.HEART_SOUL;
      singleType = HeartSubType.HEART_HALF_SOUL;
      break;
    case HeartSubType.HEART_HALF_SOUL:
      doubleType = HeartSubType.HEART_SOUL;
      singleType = HeartSubType.HEART_HALF_SOUL;
      break;
  }
  let velocity = Vector(0, 0);

  for (let h = amount; h > 0; ) {
    if (placeFree) {
      position = Isaac.GetFreeNearPosition(position, 5);
    } else {
      velocity = Vector(rand.RandomFloat() * 4 - 2, rand.RandomFloat() * 4 - 2);
    }

    let heartType: HeartSubType = singleType;
    let spawnedVal = 1;
    if (quadType != null && h >= 4) {
      heartType = quadType;
      spawnedVal = 4;
    } else if (doubleType != null && h >= 2) {
      heartType = doubleType;
      spawnedVal = 2;
    }

    Game().Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_HEART,
      position,
      velocity,
      null,
      heartType,
      rand.GetSeed(),
    );
    h -= spawnedVal;
  }
}

export function spawnPickupCluster(
  amount: int,
  position: Vector,
  rand: RNG,
  variant: number,
  subType: number,
  placeFree = false,
): void {
  let velocity = Vector(0, 0);

  for (let i = 0; i < amount; i++) {
    if (placeFree) {
      position = Isaac.GetFreeNearPosition(position, 5);
    } else {
      velocity = Vector(rand.RandomFloat() * 4 - 2, rand.RandomFloat() * 4 - 2);
    }

    Game().Spawn(
      EntityType.ENTITY_PICKUP,
      variant,
      position,
      velocity,
      null,
      subType,
      rand.GetSeed(),
    );
  }
}

export function spawnPickup(
  position: Vector,
  rand: RNG,
  variant: number,
  subType: number,
  placeFree = false,
): void {
  spawnPickupCluster(1, position, rand, variant, subType, placeFree);
}

export function playSound(
  sound: SoundEffect,
  volume: int = 1,
  frameDelay: int = 0,
  loop = false,
  pitch: int = 1,
): void {
  const effEntity = Isaac.Spawn(
    EntityType.ENTITY_FLY,
    0,
    0,
    Vector.Zero,
    Vector.Zero,
    null,
  );
  effEntity.ToNPC()!.PlaySound(sound, volume, frameDelay, loop, pitch);
  effEntity.Remove();
}

export function hasFlag(flags: int, testFlag: int): boolean {
  return (flags & testFlag) === testFlag;
}

export function toTearFlag(x: int): BitSet128 {
  if (x >= 64) {
    return BitSet128(0, 1 << (x - 64));
  }
  return BitSet128(1 << x, 0);
}

export function chargeEffect(position: Vector): void {
  Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    EffectVariant.BATTERY,
    0,
    position,
    Vector.Zero,
    null,
  );
  playSound(SoundEffect.SOUND_BATTERYCHARGE);
}

export function directionToVector(dir: Direction): Vector {
  switch (dir) {
    default:
    case Direction.NO_DIRECTION:
      return Vector.Zero;
    case Direction.RIGHT:
      return Vector(1, 0);
    case Direction.DOWN:
      return Vector(0, 1);
    case Direction.LEFT:
      return Vector(-1, 0);
    case Direction.UP:
      return Vector(0, -1);
  }
}

export function directionToDegrees(dir: Direction): number {
  switch (dir) {
    default:
    case Direction.NO_DIRECTION:
    // Falls through
    case Direction.RIGHT:
      return 0;
    case Direction.DOWN:
      return 90;
    case Direction.LEFT:
      return 180;
    case Direction.UP:
      return 270;
  }
}

export function isBetter(
  rand: RNG,
  current: Readonly<ItemConfigItem>,
  other: Readonly<ItemConfigItem>,
): boolean {
  if (current.IsNull()) {
    return true;
  }
  if (other.IsNull()) {
    return false;
  }

  let curPoints: int = 0;
  let otherPoints: int = 0;

  curPoints += current.Quality * 10;
  otherPoints += other.Quality * 10;

  if (current.Special) {
    curPoints += 1000;
  }
  if (other.Special) {
    otherPoints += 1000;
  }

  curPoints += current.DevilPrice * 5;
  otherPoints += other.DevilPrice * 5;

  otherPoints += rand.RandomFloat() * 15;

  if (otherPoints > curPoints) {
    return true;
  }

  return false;
}

export function checkLine(
  room: Room,
  position1: Vector,
  position2: Vector,
  lineCheckMode: LineCheckMode,
  gridPathThreshold?: number | undefined,
  ignoreWalls?: boolean | undefined,
  ignoreCrushable?: boolean | undefined,
): { clear: boolean; collidePos: Vector } {
  const [isClear, endPos] = room.CheckLine(
    position1,
    position2,
    lineCheckMode,
    gridPathThreshold,
    ignoreWalls,
    ignoreCrushable,
  );

  return { clear: isClear, collidePos: endPos };
}

export const enum SymmetryType {
  NONE,
  /** Mirrored over a horizontal line */
  HORIZONTAL,
  /** Mirrored over a vertical line */
  VERTICAL,
  /** Both vertical and horizontal symmetry */
  QUAD,
  /** Diagonal top-left to bottom-right */
  DIAGONAl_LR,
  /** Diagonal top-right to bottom-left */
  DIAGONAl_RL,
}

export function getMirroredPos(
  shape: RoomShape,
  symmetry: SymmetryType,
  pos: Vector,
): Vector[] {
  const mirrorPos = [Vector(pos.X, pos.Y)];

  switch (symmetry) {
    default:
    case SymmetryType.NONE:
      return mirrorPos;
    case SymmetryType.HORIZONTAL:
      switch (shape) {
        default:
        case RoomShape.ROOMSHAPE_1x1:
        case RoomShape.ROOMSHAPE_IH:
        case RoomShape.ROOMSHAPE_IV:
        case RoomShape.ROOMSHAPE_2x1:
        case RoomShape.ROOMSHAPE_IIH:
          mirrorPos[0] = mirrorHorizontal(pos, 3);
          break;
        case RoomShape.ROOMSHAPE_1x2:
        case RoomShape.ROOMSHAPE_IIV:
        case RoomShape.ROOMSHAPE_2x2:
        case RoomShape.ROOMSHAPE_LTL:
        case RoomShape.ROOMSHAPE_LTR:
        case RoomShape.ROOMSHAPE_LBL:
        case RoomShape.ROOMSHAPE_LBR:
          mirrorPos[0] = mirrorHorizontal(pos, 6.5);
          break;
      }
      break;
    case SymmetryType.VERTICAL:
      switch (shape) {
        default:
        case RoomShape.ROOMSHAPE_1x1:
        case RoomShape.ROOMSHAPE_IH:
        case RoomShape.ROOMSHAPE_IV:
        case RoomShape.ROOMSHAPE_1x2:
        case RoomShape.ROOMSHAPE_IIV:
          mirrorPos[0] = mirrorVertical(pos, 6);
          break;
        case RoomShape.ROOMSHAPE_2x1:
        case RoomShape.ROOMSHAPE_IIH:
        case RoomShape.ROOMSHAPE_2x2:
        case RoomShape.ROOMSHAPE_LTL:
        case RoomShape.ROOMSHAPE_LTR:
        case RoomShape.ROOMSHAPE_LBL:
        case RoomShape.ROOMSHAPE_LBR:
          mirrorPos[0] = mirrorVertical(pos, 12.5);
          break;
      }
      break;
    case SymmetryType.QUAD:
      switch (shape) {
        default:
        case RoomShape.ROOMSHAPE_1x1:
        case RoomShape.ROOMSHAPE_IH:
        case RoomShape.ROOMSHAPE_IV:
        case RoomShape.ROOMSHAPE_2x1:
        case RoomShape.ROOMSHAPE_IIH:
          mirrorPos[0] = mirrorHorizontal(pos, 3);
          mirrorPos[1] = mirrorVertical(mirrorPos[0], 6);
          mirrorPos[2] = mirrorVertical(pos, 6);
          break;
        case RoomShape.ROOMSHAPE_1x2:
        case RoomShape.ROOMSHAPE_IIV:
        case RoomShape.ROOMSHAPE_2x2:
        case RoomShape.ROOMSHAPE_LTL:
        case RoomShape.ROOMSHAPE_LTR:
        case RoomShape.ROOMSHAPE_LBL:
        case RoomShape.ROOMSHAPE_LBR:
          mirrorPos[0] = mirrorHorizontal(pos, 6.5);
          mirrorPos[1] = mirrorVertical(mirrorPos[0], 12.5);
          mirrorPos[2] = mirrorVertical(pos, 12.5);
          break;
      }
      break;
  }

  return mirrorPos;
}
/** Mirror a `Vector` over a horizontal line */
export function mirrorHorizontal(origin: Vector, lineY: float): Vector {
  return Vector(origin.X, -(origin.Y - lineY) + lineY);
}
/** Mirror a `Vector` over a vertical line */
export function mirrorVertical(origin: Vector, lineX: float): Vector {
  return Vector(-(origin.X - lineX) + lineX, origin.Y);
}
/** Mirror a `Vector` over both a horizontal and a vertical line */
export function mirrorQuad(origin: Vector, lineX: float, lineY: float): Vector {
  return Vector(-(origin.X - lineX) + lineX, -(origin.Y - lineY) + lineY);
}

/** Convert world position `Vector` to grid position. */
export function worldToGridPos(worldPos: Vector): Vector {
  return Vector(worldPos.X / 40 - 2, worldPos.Y / 40 - 4);
}
/** Get the grid position of a `DoorSlot` in a room of the given `RoomShape` */
export function getSlotGridPos(slot: DoorSlot, shape: RoomShape): Vector {
  switch (shape) {
    default:
    case RoomShape.ROOMSHAPE_1x1:
      switch (slot) {
        default:
          Isaac.DebugString("Invalid DoorSlot!");
          return Vector.Zero;

        case DoorSlot.LEFT0:
          return Vector(-1, 3);
        case DoorSlot.UP0:
          return Vector(6, -1);
        case DoorSlot.RIGHT0:
          return Vector(13, 3);
        case DoorSlot.DOWN0:
          return Vector(6, 7);
        case DoorSlot.LEFT1:
          return Vector(-1, 10);
        case DoorSlot.UP1:
          return Vector(4, 0);
        case DoorSlot.RIGHT1:
          return Vector(13, 10);
        case DoorSlot.DOWN1:
          return Vector(4, 8);
      }
    case RoomShape.ROOMSHAPE_IH:
      switch (slot) {
        default:
          Isaac.DebugString("Invalid DoorSlot!");
          return Vector.Zero;

        case DoorSlot.LEFT0:
          return Vector(-1, 3);
        case DoorSlot.UP0:
          return Vector(6, 2);
        case DoorSlot.RIGHT0:
          return Vector(13, 3);
        case DoorSlot.DOWN0:
          return Vector(6, 4);
        case DoorSlot.LEFT1:
          return Vector(-1, 10);
        case DoorSlot.UP1:
          return Vector(4, 3);
        case DoorSlot.RIGHT1:
          return Vector(13, 10);
        case DoorSlot.DOWN1:
          return Vector(4, 5);
      }
    case RoomShape.ROOMSHAPE_IV:
      switch (slot) {
        default:
          Isaac.DebugString("Invalid DoorSlot!");
          return Vector.Zero;

        case DoorSlot.LEFT0:
          return Vector(3, 3);
        case DoorSlot.UP0:
          return Vector(6, -1);
        case DoorSlot.RIGHT0:
          return Vector(9, 3);
        case DoorSlot.DOWN0:
          return Vector(6, 7);
        case DoorSlot.LEFT1:
          return Vector(3, 10);
        case DoorSlot.UP1:
          return Vector(4, 0);
        case DoorSlot.RIGHT1:
          return Vector(9, 10);
        case DoorSlot.DOWN1:
          return Vector(4, 8);
      }
    case RoomShape.ROOMSHAPE_1x2:
      switch (slot) {
        default:
          Isaac.DebugString("Invalid DoorSlot!");
          return Vector.Zero;

        case DoorSlot.LEFT0:
          return Vector(-1, 3);
        case DoorSlot.UP0:
          return Vector(6, -1);
        case DoorSlot.RIGHT0:
          return Vector(13, 3);
        case DoorSlot.DOWN0:
          return Vector(6, 14);
        case DoorSlot.LEFT1:
          return Vector(-1, 10);
        case DoorSlot.UP1:
          return Vector(4, 0);
        case DoorSlot.RIGHT1:
          return Vector(13, 10);
        case DoorSlot.DOWN1:
          return Vector(4, 15);
      }
    case RoomShape.ROOMSHAPE_IIV:
      switch (slot) {
        default:
          Isaac.DebugString("Invalid DoorSlot!");
          return Vector.Zero;

        case DoorSlot.LEFT0:
          return Vector(3, 3);
        case DoorSlot.UP0:
          return Vector(6, -1);
        case DoorSlot.RIGHT0:
          return Vector(9, 3);
        case DoorSlot.DOWN0:
          return Vector(6, 14);
        case DoorSlot.LEFT1:
          return Vector(3, 10);
        case DoorSlot.UP1:
          return Vector(4, 0);
        case DoorSlot.RIGHT1:
          return Vector(9, 10);
        case DoorSlot.DOWN1:
          return Vector(4, 15);
      }
    case RoomShape.ROOMSHAPE_2x1:
      switch (slot) {
        default:
          Isaac.DebugString("Invalid DoorSlot!");
          return Vector.Zero;

        case DoorSlot.LEFT0:
          return Vector(-1, 3);
        case DoorSlot.UP0:
          return Vector(6, -1);
        case DoorSlot.RIGHT0:
          return Vector(26, 3);
        case DoorSlot.DOWN0:
          return Vector(6, 7);
        case DoorSlot.LEFT1:
          return Vector(-1, 10);
        case DoorSlot.UP1:
          return Vector(19, -1);
        case DoorSlot.RIGHT1:
          return Vector(26, 10);
        case DoorSlot.DOWN1:
          return Vector(19, 7);
      }
    case RoomShape.ROOMSHAPE_IIH:
      switch (slot) {
        default:
          Isaac.DebugString("Invalid DoorSlot!");
          return Vector.Zero;

        case DoorSlot.LEFT0:
          return Vector(-1, 3);
        case DoorSlot.UP0:
          return Vector(6, 2);
        case DoorSlot.RIGHT0:
          return Vector(26, 3);
        case DoorSlot.DOWN0:
          return Vector(6, 4);
        case DoorSlot.LEFT1:
          return Vector(-1, 10);
        case DoorSlot.UP1:
          return Vector(19, 2);
        case DoorSlot.RIGHT1:
          return Vector(26, 10);
        case DoorSlot.DOWN1:
          return Vector(19, 4);
      }
    case RoomShape.ROOMSHAPE_2x2:
      switch (slot) {
        default:
          Isaac.DebugString("Invalid DoorSlot!");
          return Vector.Zero;

        case DoorSlot.LEFT0:
          return Vector(-1, 3);
        case DoorSlot.UP0:
          return Vector(6, -1);
        case DoorSlot.RIGHT0:
          return Vector(26, 3);
        case DoorSlot.DOWN0:
          return Vector(6, 14);
        case DoorSlot.LEFT1:
          return Vector(-1, 10);
        case DoorSlot.UP1:
          return Vector(19, -1);
        case DoorSlot.RIGHT1:
          return Vector(26, 10);
        case DoorSlot.DOWN1:
          return Vector(19, 14);
      }
    case RoomShape.ROOMSHAPE_LTL:
      switch (slot) {
        default:
          Isaac.DebugString("Invalid DoorSlot!");
          return Vector.Zero;

        case DoorSlot.LEFT0:
          return Vector(12, 3);
        case DoorSlot.UP0:
          return Vector(6, 6);
        case DoorSlot.RIGHT0:
          return Vector(26, 3);
        case DoorSlot.DOWN0:
          return Vector(6, 14);
        case DoorSlot.LEFT1:
          return Vector(-1, 10);
        case DoorSlot.UP1:
          return Vector(19, -1);
        case DoorSlot.RIGHT1:
          return Vector(26, 10);
        case DoorSlot.DOWN1:
          return Vector(19, 14);
      }
    case RoomShape.ROOMSHAPE_LTR:
      switch (slot) {
        default:
          Isaac.DebugString("Invalid DoorSlot!");
          return Vector.Zero;

        case DoorSlot.LEFT0:
          return Vector(-1, 3);
        case DoorSlot.UP0:
          return Vector(6, -1);
        case DoorSlot.RIGHT0:
          return Vector(13, 3);
        case DoorSlot.DOWN0:
          return Vector(6, 14);
        case DoorSlot.LEFT1:
          return Vector(-1, 10);
        case DoorSlot.UP1:
          return Vector(19, 6);
        case DoorSlot.RIGHT1:
          return Vector(26, 10);
        case DoorSlot.DOWN1:
          return Vector(19, 14);
      }
    case RoomShape.ROOMSHAPE_LBL:
      switch (slot) {
        default:
          Isaac.DebugString("Invalid DoorSlot!");
          return Vector.Zero;

        case DoorSlot.LEFT0:
          return Vector(-1, 3);
        case DoorSlot.UP0:
          return Vector(6, -1);
        case DoorSlot.RIGHT0:
          return Vector(26, 3);
        case DoorSlot.DOWN0:
          return Vector(6, 7);
        case DoorSlot.LEFT1:
          return Vector(12, 10);
        case DoorSlot.UP1:
          return Vector(19, -1);
        case DoorSlot.RIGHT1:
          return Vector(26, 10);
        case DoorSlot.DOWN1:
          return Vector(19, 14);
      }
    case RoomShape.ROOMSHAPE_LBR:
      switch (slot) {
        default:
          Isaac.DebugString("Invalid DoorSlot!");
          return Vector.Zero;

        case DoorSlot.LEFT0:
          return Vector(-1, 3);
        case DoorSlot.UP0:
          return Vector(6, -1);
        case DoorSlot.RIGHT0:
          return Vector(26, 3);
        case DoorSlot.DOWN0:
          return Vector(6, 14);
        case DoorSlot.LEFT1:
          return Vector(-1, 10);
        case DoorSlot.UP1:
          return Vector(19, -1);
        case DoorSlot.RIGHT1:
          return Vector(13, 10);
        case DoorSlot.DOWN1:
          return Vector(19, 7);
      }
  }
}
/** Get all `DoorSlot`s that are valid for a given `RoomShape` */
export function getValidSlots(shape: RoomShape): DoorSlot[] {
  switch (shape) {
    default:
    case RoomShape.ROOMSHAPE_1x1:
      return [DoorSlot.LEFT0, DoorSlot.UP0, DoorSlot.RIGHT0, DoorSlot.DOWN0];
    case RoomShape.ROOMSHAPE_IH:
    case RoomShape.ROOMSHAPE_IIH:
      return [DoorSlot.LEFT0, DoorSlot.RIGHT0];
    case RoomShape.ROOMSHAPE_IV:
    case RoomShape.ROOMSHAPE_IIV:
      return [DoorSlot.UP0, DoorSlot.DOWN0];
    case RoomShape.ROOMSHAPE_1x2:
      return [
        DoorSlot.LEFT0,
        DoorSlot.UP0,
        DoorSlot.RIGHT0,
        DoorSlot.DOWN0,
        DoorSlot.LEFT1,
        DoorSlot.RIGHT1,
      ];
    case RoomShape.ROOMSHAPE_2x1:
      return [
        DoorSlot.LEFT0,
        DoorSlot.UP0,
        DoorSlot.RIGHT0,
        DoorSlot.DOWN0,
        DoorSlot.UP1,
        DoorSlot.DOWN1,
      ];
    case RoomShape.ROOMSHAPE_2x2:
    case RoomShape.ROOMSHAPE_LTL:
    case RoomShape.ROOMSHAPE_LTR:
    case RoomShape.ROOMSHAPE_LBL:
    case RoomShape.ROOMSHAPE_LBR:
      return [
        DoorSlot.LEFT0,
        DoorSlot.UP0,
        DoorSlot.RIGHT0,
        DoorSlot.DOWN0,
        DoorSlot.LEFT1,
        DoorSlot.UP1,
        DoorSlot.RIGHT1,
        DoorSlot.DOWN1,
      ];
  }
}
/** Test if a grid position is actually in the given `RoomShape` */
export function isValidGridPos(pos: Vector, shape: RoomShape): boolean {
  if (pos.X < 0 || pos.Y < 0) {
    return false;
  }

  switch (shape) {
    default:
    case RoomShape.ROOMSHAPE_1x1:
      if (pos.X > 12) {
        return false;
      }
  }

  return true;
}
