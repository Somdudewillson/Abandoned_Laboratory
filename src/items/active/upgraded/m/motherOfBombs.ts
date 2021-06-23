import { CollectibleTypeLabUpgrade } from "../../../../constants";
import * as extMath from "../../../../utils/extMath";
import { spawnPickupCluster } from "../../../../utils/utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_MOTHEROFBOMBS as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  player.UseActiveItem(CollectibleType.COLLECTIBLE_MAMA_MEGA);
  spawnPickupCluster(
    extMath.randomInt(rand, 10, 25),
    player.Position,
    rand,
    PickupVariant.PICKUP_BOMB,
    BombSubType.BOMB_NORMAL,
    true,
  );

  player.RemoveCollectible(ownType(), false, ActiveSlot);
  player.AddCollectible(
    CollectibleType.COLLECTIBLE_MAMA_MEGA,
    0,
    false,
    ActiveSlot,
  );
  return true;
}
