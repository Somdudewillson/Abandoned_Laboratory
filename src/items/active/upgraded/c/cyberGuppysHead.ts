import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { randomInt } from "../../../../utils/extMath";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_CYBERGUPPYSHEAD as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const entities = Isaac.GetRoomEntities();
  let hadEnemies = false;
  for (const entity of entities) {
    if (entity == null) {
      continue;
    }
    if (!entity.IsActiveEnemy(false)) {
      continue;
    }
    hadEnemies = true;

    if (entity.IsBoss()) {
      player.AddBlueFlies(randomInt(rand, 4, 6), player.Position, entity);
    } else {
      player.AddBlueFlies(randomInt(rand, 0, 2), player.Position, entity);
    }
  }
  if (!hadEnemies) {
    player.AddBlueFlies(randomInt(rand, 4, 6), player.Position, null);
  }

  return true;
}
