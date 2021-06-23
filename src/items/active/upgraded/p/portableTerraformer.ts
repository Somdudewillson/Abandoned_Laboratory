import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { randomInt } from "../../../../utils/extMath";
import {
  spawnCoins,
  spawnPickup,
  spawnPickupCluster,
} from "../../../../utils/utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_PORTABLETERRAFORMER as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  _player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const room = Game().GetRoom();

  for (let i = 0; i < room.GetGridSize(); i++) {
    const gridEntity = room.GetGridEntity(i);
    if (gridEntity == null) {
      continue;
    }
    if (gridEntity.CollisionClass === GridCollisionClass.COLLISION_NONE) {
      continue;
    }

    switch (gridEntity.GetType()) {
      case GridEntityType.GRID_ROCK_ALT:
      case GridEntityType.GRID_ROCK_ALT2:
      case GridEntityType.GRID_SPIDERWEB:
      case GridEntityType.GRID_ROCK_GOLD:
        gridEntity.Destroy(false);
        break;
      case GridEntityType.GRID_ROCKT:
        gridEntity.Destroy(false);
        if (rand.RandomFloat() < 0.334) {
          spawnPickup(
            gridEntity.Position,
            rand,
            PickupVariant.PICKUP_HEART,
            HeartSubType.HEART_SOUL,
          );
        }
        if (rand.RandomFloat() < 0.4) {
          spawnPickup(
            gridEntity.Position,
            rand,
            PickupVariant.PICKUP_BOMB,
            BombSubType.BOMB_NORMAL,
          );
        }
        break;
      case GridEntityType.GRID_ROCK_SS:
        gridEntity.Destroy(false);
        if (rand.RandomFloat() < 0.667) {
          spawnPickup(
            gridEntity.Position,
            rand,
            PickupVariant.PICKUP_HEART,
            HeartSubType.HEART_SOUL,
          );
        }
        break;
      case GridEntityType.GRID_ROCK_BOMB:
      case GridEntityType.GRID_TNT:
        gridEntity.Destroy(false);
        if (rand.RandomFloat() < 0.25) {
          spawnPickup(
            gridEntity.Position,
            rand,
            PickupVariant.PICKUP_BOMB,
            BombSubType.BOMB_NORMAL,
          );
        }
        break;
      case GridEntityType.GRID_LOCK:
        gridEntity.Destroy(false);
        if (rand.RandomFloat() < 0.2) {
          spawnPickup(
            gridEntity.Position,
            rand,
            PickupVariant.PICKUP_KEY,
            KeySubType.KEY_NORMAL,
          );
        }
        break;
      case GridEntityType.GRID_ROCKB:
        if (rand.RandomFloat() < 0.45) {
          break;
        }
      // Falls through
      case GridEntityType.GRID_ROCK_SPIKED:
        replaceGridEntity(gridEntity, GridEntityType.GRID_ROCK);
        break;
      case GridEntityType.GRID_PIT: {
        const pit: GridEntityPit = gridEntity.ToPit();
        pit.MakeBridge(null);
        break;
      }
      case GridEntityType.GRID_ROCK:
        if (rand.RandomFloat() < 0.4) {
          gridEntity.Destroy(false);

          if (rand.RandomFloat() < 0.2) {
            spawnPickupCluster(
              randomInt(rand, 1, 3),
              gridEntity.Position,
              rand,
              PickupVariant.PICKUP_COIN,
              CoinSubType.COIN_PENNY,
            );
          }
          if (rand.RandomFloat() < 0.075) {
            spawnPickupCluster(
              randomInt(rand, 1, 2),
              gridEntity.Position,
              rand,
              PickupVariant.PICKUP_BOMB,
              BombSubType.BOMB_NORMAL,
            );
          }

          if (rand.RandomFloat() < 0.02) {
            spawnPickup(
              gridEntity.Position,
              rand,
              PickupVariant.PICKUP_BOMBCHEST,
              ChestSubType.CHEST_CLOSED,
            );
          }
        } else if (rand.RandomFloat() < 0.1) {
          replaceGridEntity(gridEntity, GridEntityType.GRID_ROCKT);
        }
        break;
      case GridEntityType.GRID_POOP: {
        switch (gridEntity.GetVariant()) {
          case PoopVariant.RED:
            replaceGridEntity(
              gridEntity,
              GridEntityType.GRID_POOP,
              PoopVariant.NORMAL,
            );
            break;
          case PoopVariant.NORMAL:
            if (rand.RandomFloat() < 0.45) {
              switch (randomInt(rand, 1, 5)) {
                default:
                case 1:
                case 2:
                  replaceGridEntity(
                    gridEntity,
                    GridEntityType.GRID_POOP,
                    PoopVariant.RAINBOW,
                  );

                  if (rand.RandomFloat() < 0.2) {
                    spawnPickupCluster(
                      randomInt(rand, 1, 3),
                      gridEntity.Position,
                      rand,
                      PickupVariant.PICKUP_HEART,
                      HeartSubType.HEART_HALF,
                    );
                  }
                  break;
                case 3:
                  replaceGridEntity(
                    gridEntity,
                    GridEntityType.GRID_POOP,
                    PoopVariant.BLACK,
                  );

                  if (rand.RandomFloat() < 0.05) {
                    spawnPickup(
                      gridEntity.Position,
                      rand,
                      PickupVariant.PICKUP_HEART,
                      HeartSubType.HEART_BLACK,
                    );
                  }
                  break;
                case 4:
                case 5:
                  replaceGridEntity(
                    gridEntity,
                    GridEntityType.GRID_POOP,
                    PoopVariant.GOLDEN,
                  );

                  if (rand.RandomFloat() < 0.2) {
                    spawnCoins(
                      randomInt(rand, 1, 10),
                      gridEntity.Position,
                      rand,
                      true,
                    );
                  }
                  break;
              }
            }
            break;
          default:
            break;
        }
        break;
      }
      default:
        break;
    }
  }

  return true;
}

function replaceGridEntity(
  original: GridEntity,
  newType: int,
  newVariant: int = 0,
): void {
  original.Destroy(true);
  Isaac.GridSpawn(newType, newVariant, original.Position, true);
}
