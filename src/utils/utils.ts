import { lerp } from "./extMath";
import { expandVector, FlatGridVector } from "./flatGridVector";

export function getCoinVal(pickup: EntityPickup, useDevil = false): int {
  switch (pickup.Variant) {
    case PickupVariant.PICKUP_COIN:
      return pickup.GetCoinValue(); // Just return coin value
    case PickupVariant.PICKUP_COLLECTIBLE:
      if (useDevil) {
        // Calculate item value
        const collectibleConfig = Isaac.GetItemConfig().GetCollectible(
          pickup.SubType,
        );
        return (
          (collectibleConfig !== undefined ? collectibleConfig.DevilPrice : 1) *
          15
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
      undefined,
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
  let quadType;
  let doubleType;
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
    if (quadType !== undefined && h >= 4) {
      heartType = quadType;
      spawnedVal = 4;
    } else if (doubleType !== undefined && h >= 2) {
      heartType = doubleType;
      spawnedVal = 2;
    }

    Game().Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_HEART,
      position,
      velocity,
      undefined,
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
  const room = Game().GetRoom();
  let velocity = Vector(0, 0);

  for (let i = 0; i < amount; i++) {
    if (placeFree) {
      position = room.FindFreePickupSpawnPosition(position, 0, true);
    } else {
      velocity = Vector(rand.RandomFloat() * 4 - 2, rand.RandomFloat() * 4 - 2);
    }

    Game().Spawn(
      EntityType.ENTITY_PICKUP,
      variant,
      position,
      velocity,
      undefined,
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
    undefined,
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
    undefined,
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

export function rotateDirection(
  dir: Direction,
  rotateDir: Direction,
): Direction {
  if (dir === Direction.NO_DIRECTION) {
    return Direction.NO_DIRECTION;
  }

  let shift = 0;
  switch (rotateDir) {
    default:
    case Direction.NO_DIRECTION:
    case Direction.UP:
      return dir;
    case Direction.LEFT:
      shift = -1;
      break;
    case Direction.RIGHT:
      shift = 1;
      break;
    case Direction.DOWN:
      shift = -2;
      break;
  }

  let newDir = dir + shift;
  if (newDir < 0) {
    newDir += 4;
  } else if (newDir > 3) {
    newDir -= 4;
  }

  return newDir;
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
  includeInitial = false,
): Vector[] {
  const mirrorPos = [Vector(pos.X, pos.Y)];
  let start = 0;
  if (includeInitial) {
    start = 1;
  }

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
          mirrorPos[start] = mirrorHorizontal(pos, 3);
          break;
        case RoomShape.ROOMSHAPE_1x2:
        case RoomShape.ROOMSHAPE_IIV:
        case RoomShape.ROOMSHAPE_2x2:
        case RoomShape.ROOMSHAPE_LTL:
        case RoomShape.ROOMSHAPE_LTR:
        case RoomShape.ROOMSHAPE_LBL:
        case RoomShape.ROOMSHAPE_LBR:
          mirrorPos[start] = mirrorHorizontal(pos, 6.5);
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
          mirrorPos[start] = mirrorVertical(pos, 6);
          break;
        case RoomShape.ROOMSHAPE_2x1:
        case RoomShape.ROOMSHAPE_IIH:
        case RoomShape.ROOMSHAPE_2x2:
        case RoomShape.ROOMSHAPE_LTL:
        case RoomShape.ROOMSHAPE_LTR:
        case RoomShape.ROOMSHAPE_LBL:
        case RoomShape.ROOMSHAPE_LBR:
          mirrorPos[start] = mirrorVertical(pos, 12.5);
          break;
      }
      break;
    case SymmetryType.QUAD:
      switch (shape) {
        default:
        case RoomShape.ROOMSHAPE_1x1:
        case RoomShape.ROOMSHAPE_IH:
        case RoomShape.ROOMSHAPE_IV:
          mirrorPos[start] = mirrorHorizontal(pos, 3);
          mirrorPos[start + 1] = mirrorVertical(mirrorPos[start], 6);
          mirrorPos[start + 2] = mirrorVertical(pos, 6);
          break;
        case RoomShape.ROOMSHAPE_2x1:
        case RoomShape.ROOMSHAPE_IIH:
          mirrorPos[start] = mirrorHorizontal(pos, 3);
          mirrorPos[start + 1] = mirrorVertical(mirrorPos[start], 12.5);
          mirrorPos[start + 2] = mirrorVertical(pos, 12.5);
          break;
        case RoomShape.ROOMSHAPE_1x2:
        case RoomShape.ROOMSHAPE_IIV:
          mirrorPos[start] = mirrorHorizontal(pos, 6.5);
          mirrorPos[start + 1] = mirrorVertical(mirrorPos[start], 6);
          mirrorPos[start + 2] = mirrorVertical(pos, 6);
          break;
        case RoomShape.ROOMSHAPE_2x2:
        case RoomShape.ROOMSHAPE_LTL:
        case RoomShape.ROOMSHAPE_LTR:
        case RoomShape.ROOMSHAPE_LBL:
        case RoomShape.ROOMSHAPE_LBR:
          mirrorPos[start] = mirrorHorizontal(pos, 6.5);
          mirrorPos[start + 1] = mirrorVertical(mirrorPos[start], 12.5);
          mirrorPos[start + 2] = mirrorVertical(pos, 12.5);
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
          Isaac.DebugString(`Invalid DoorSlot [${slot}]!`);
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
          Isaac.DebugString(`Invalid DoorSlot [${slot}]!`);
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
          Isaac.DebugString(`Invalid DoorSlot [${slot}]!`);
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
          Isaac.DebugString(`Invalid DoorSlot [${slot}]!`);
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
          Isaac.DebugString(`Invalid DoorSlot [${slot}]!`);
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
          Isaac.DebugString(`Invalid DoorSlot [${slot}]!`);
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
          Isaac.DebugString(`Invalid DoorSlot [${slot}]!`);
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
          Isaac.DebugString(`Invalid DoorSlot [${slot}]!`);
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
          Isaac.DebugString(`Invalid DoorSlot [${slot}]!`);
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
          Isaac.DebugString(`Invalid DoorSlot [${slot}]!`);
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
          Isaac.DebugString(`Invalid DoorSlot [${slot}]!`);
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
          Isaac.DebugString(`Invalid DoorSlot [${slot}]!`);
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
/** Get the grid position of the grid square directly in front of a `DoorSlot` in a room of the given `RoomShape` */
export function getDoorEntryPos(slot: DoorSlot, shape: RoomShape): Vector {
  const doorPos = getSlotGridPos(slot, shape);

  let shiftX = 0;
  let shiftY = 0;
  switch (slot) {
    default:
    case DoorSlot.LEFT0:
    case DoorSlot.LEFT1:
      shiftX = 1;
      break;
    case DoorSlot.RIGHT0:
    case DoorSlot.RIGHT1:
      shiftX = -1;
      break;
    case DoorSlot.UP0:
    case DoorSlot.UP1:
      shiftY = 1;
      break;
    case DoorSlot.DOWN0:
    case DoorSlot.DOWN1:
      shiftY = -1;
      break;
  }

  return Vector(doorPos.X + shiftX, doorPos.Y + shiftY);
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
      if (pos.X >= 13 || pos.Y >= 7) {
        return false;
      }
      break;
    case RoomShape.ROOMSHAPE_IH:
      if (pos.X >= 13 || pos.Y <= 2 || pos.Y >= 4) {
        return false;
      }
      break;
    case RoomShape.ROOMSHAPE_IV:
      if (pos.X <= 3 || pos.X >= 9 || pos.Y >= 7) {
        return false;
      }
      break;
    case RoomShape.ROOMSHAPE_1x2:
      if (pos.X >= 13 || pos.Y >= 14) {
        return false;
      }
      break;
    case RoomShape.ROOMSHAPE_IIV:
      if (pos.X <= 3 || pos.X >= 9 || pos.Y >= 14) {
        return false;
      }
      break;
    case RoomShape.ROOMSHAPE_2x1:
      if (pos.X >= 26 || pos.Y >= 7) {
        return false;
      }
      break;
    case RoomShape.ROOMSHAPE_IIH:
      if (pos.X >= 26 || pos.Y <= 2 || pos.Y >= 4) {
        return false;
      }
      break;
    case RoomShape.ROOMSHAPE_2x2:
      if (pos.X >= 26 || pos.Y >= 14) {
        return false;
      }
      break;
    case RoomShape.ROOMSHAPE_LTL:
      if (pos.X >= 26 || pos.Y >= 14) {
        return false;
      }
      if (pos.X <= 12 && pos.Y <= 6) {
        return false;
      }
      break;
    case RoomShape.ROOMSHAPE_LTR:
      if (pos.X >= 26 || pos.Y >= 14) {
        return false;
      }
      if (pos.X >= 13 && pos.Y <= 6) {
        return false;
      }
      break;
    case RoomShape.ROOMSHAPE_LBL:
      if (pos.X >= 26 || pos.Y >= 14) {
        return false;
      }
      if (pos.X <= 12 && pos.Y >= 7) {
        return false;
      }
      break;
    case RoomShape.ROOMSHAPE_LBR:
      if (pos.X >= 26 || pos.Y >= 14) {
        return false;
      }
      if (pos.X >= 13 && pos.Y >= 7) {
        return false;
      }
      break;
  }

  return true;
}
/** Test if a flattened grid position is actually in the given `RoomShape` */
export function isValidFlatGridPos(
  pos: FlatGridVector,
  shape: RoomShape,
): boolean {
  return isValidGridPos(expandVector(pos), shape);
}
/** Get a `RoomShape`'s layout size. This is **NOT** the size of the `RoomShape`'s actual contents! */
export function getRoomShapeSize(shape: RoomShape): Vector {
  switch (shape) {
    default:
    case RoomShape.ROOMSHAPE_1x1:
    case RoomShape.ROOMSHAPE_IH:
    case RoomShape.ROOMSHAPE_IV:
      return Vector(13, 7);
    case RoomShape.ROOMSHAPE_1x2:
    case RoomShape.ROOMSHAPE_IIV:
      return Vector(13, 14);
    case RoomShape.ROOMSHAPE_2x1:
    case RoomShape.ROOMSHAPE_IIH:
      return Vector(26, 7);
    case RoomShape.ROOMSHAPE_2x2:
    case RoomShape.ROOMSHAPE_LTL:
    case RoomShape.ROOMSHAPE_LTR:
    case RoomShape.ROOMSHAPE_LBL:
    case RoomShape.ROOMSHAPE_LBR:
      return Vector(26, 14);
  }
}
/** Get the size of a `RoomShape`'s internal space.  Note that this is a bounding box. */
export function getRoomShapeBounds(shape: RoomShape): Vector {
  switch (shape) {
    default:
    case RoomShape.ROOMSHAPE_1x1:
      return Vector(13, 7);
    case RoomShape.ROOMSHAPE_IH:
      return Vector(13, 3);
    case RoomShape.ROOMSHAPE_IV:
      return Vector(5, 7);
    case RoomShape.ROOMSHAPE_1x2:
      return Vector(13, 14);
    case RoomShape.ROOMSHAPE_IIV:
      return Vector(5, 14);
    case RoomShape.ROOMSHAPE_2x1:
      return Vector(26, 7);
    case RoomShape.ROOMSHAPE_IIH:
      return Vector(26, 3);
    case RoomShape.ROOMSHAPE_2x2:
    case RoomShape.ROOMSHAPE_LTL:
    case RoomShape.ROOMSHAPE_LTR:
    case RoomShape.ROOMSHAPE_LBL:
    case RoomShape.ROOMSHAPE_LBR:
      return Vector(26, 14);
  }
}
/** Get the volume of a `RoomShape`'s internal space. */
export function getRoomShapeVolume(shape: RoomShape): int {
  switch (shape) {
    default:
    case RoomShape.ROOMSHAPE_1x1:
      return 13 * 7;
    case RoomShape.ROOMSHAPE_IH:
      return 13 * 3;
    case RoomShape.ROOMSHAPE_IV:
      return 5 * 7;
    case RoomShape.ROOMSHAPE_1x2:
      return 13 * 14;
    case RoomShape.ROOMSHAPE_IIV:
      return 5 * 14;
    case RoomShape.ROOMSHAPE_2x1:
      return 26 * 7;
    case RoomShape.ROOMSHAPE_IIH:
      return 26 * 3;
    case RoomShape.ROOMSHAPE_2x2:
      return 26 * 14;
    case RoomShape.ROOMSHAPE_LTL:
    case RoomShape.ROOMSHAPE_LTR:
    case RoomShape.ROOMSHAPE_LBL:
    case RoomShape.ROOMSHAPE_LBR:
      return 26 * 7 + 13 * 7;
  }
}
/** Get the top left pos of a given `RoomShape`. */
export function getTopLeftPos(shape: RoomShape): Vector {
  switch (shape) {
    default:
    case RoomShape.ROOMSHAPE_1x1:
    case RoomShape.ROOMSHAPE_1x2:
    case RoomShape.ROOMSHAPE_2x1:
    case RoomShape.ROOMSHAPE_2x2:
    case RoomShape.ROOMSHAPE_LTR:
    case RoomShape.ROOMSHAPE_LBL:
    case RoomShape.ROOMSHAPE_LBR:
      return Vector(0, 0);
    case RoomShape.ROOMSHAPE_IH:
    case RoomShape.ROOMSHAPE_IIH:
      return Vector(0, 2);
    case RoomShape.ROOMSHAPE_IIV:
    case RoomShape.ROOMSHAPE_IV:
      return Vector(4, 0);
    case RoomShape.ROOMSHAPE_LTL:
      return Vector(13, 0);
  }
}

export function isFriendly(self: Entity): boolean {
  return (
    self.HasEntityFlags(EntityFlag.FLAG_CHARM) ||
    self.HasEntityFlags(EntityFlag.FLAG_FRIENDLY)
  );
}

export function rgbLerp(c1: Color, c2: Color, pos: float): Color {
  return Color(
    lerp(c1.R, c2.R, pos),
    lerp(c1.G, c2.G, pos),
    lerp(c1.B, c2.B, pos),
  );
}

export function hasGridCollision(
  ent: EntityProjectile,
  room = Game().GetRoom(),
): boolean {
  const halfSize = math.ceil(ent.Size / 2);
  return (
    ent.Height + ent.FallingSpeed + ent.FallingAccel >= -halfSize ||
    !room.CheckLine(
      ent.Position,
      ent.Position.add(ent.Velocity),
      LineCheckMode.PROJECTILE,
      halfSize,
    )[0]
  );
}
