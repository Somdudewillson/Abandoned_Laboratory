import { CollectibleTypeLab } from "../../../constants";
import { spawnCoins } from "../../../utils";

const HEALTH_POINTS: int = 5;
const SOUL_COST: int = 3;

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_GLOWINGHEART as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  if (
    player.GetPlayerType() === Isaac.GetPlayerTypeByName("Keeper") ||
    player.GetPlayerType() === Isaac.GetPlayerTypeByName("Keeper", true)
  ) {
    spawnCoins(
      Math.ceil(HEALTH_POINTS / 2),
      player.Position,
      rand,
      false,
      true,
    );
    return true;
  }

  let healAmount = HEALTH_POINTS;
  while (healAmount > 0) {
    if (player.HasFullHearts()) {
      if (player.Type === PlayerType.PLAYER_BETHANY) {
        player.AddSoulCharge(1);
        healAmount -= SOUL_COST;
      } else if (player.Type === PlayerType.PLAYER_BETHANY_B) {
        player.AddBloodCharge(1);
        healAmount--;
      } else {
        player.AddSoulHearts(1);
        healAmount -= SOUL_COST;
      }
    } else {
      player.AddHearts(1);
      healAmount--;
    }
  }

  return true;
}
