import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_SHAPEDCHARGEVEST as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  Game().BombExplosionEffects(
    player.Position,
    185,
    TearFlags.TEAR_NORMAL,
    Color(0.878, 0.518, 0.11),
    player,
    1.25,
  );

  return true;
}
