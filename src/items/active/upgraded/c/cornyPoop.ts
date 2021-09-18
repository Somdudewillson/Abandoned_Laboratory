import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_CORNYPOOP as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_BUTTER_BEAN,
    UseFlag.USE_NOANNOUNCER,
  );

  Isaac.GridSpawn(
    GridEntityType.GRID_POOP,
    PoopVariant.NORMAL,
    player.Position,
    true,
  )
    .ToPoop()!
    .ReduceSpawnRate();

  if (rand.RandomFloat() < 0.5) {
    player.AddBlueFlies(1, player.Position, undefined);
  }

  return true;
}
