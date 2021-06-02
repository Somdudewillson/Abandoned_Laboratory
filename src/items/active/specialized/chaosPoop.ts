import { CollectibleTypeLabUpgrade } from "../../../constants";
import { randomInt } from "../../../extMath";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_CHAOSPOOP as number;
}

const POOP_TABLE = [
  PoopVariant.NORMAL,
  PoopVariant.NORMAL,
  PoopVariant.NORMAL,
  PoopVariant.NORMAL,
  PoopVariant.NORMAL,
  PoopVariant.NORMAL,
  PoopVariant.BLACK,
  PoopVariant.BLACK,
  PoopVariant.BLACK,
  PoopVariant.BLACK,
  PoopVariant.GOLDEN,
  PoopVariant.GOLDEN,
  PoopVariant.WHITE,
];

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  Isaac.GridSpawn(
    GridEntityType.GRID_POOP,
    POOP_TABLE[randomInt(rand, 0, POOP_TABLE.length - 1)],
    player.Position,
    false,
  );

  return true;
}
