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
  healPlayer(player, rand, HEALTH_POINTS, SOUL_COST);

  let i = 0;
  let otherPlayer = Isaac.GetPlayer(i);
  while (otherPlayer != null && i < 5) {
    if (i !== player.Index) {
      healPlayer(otherPlayer, rand, Math.ceil(HEALTH_POINTS / 2), SOUL_COST);
    }
    otherPlayer = Isaac.GetPlayer(++i);
  }
  return true;
}

export function healPlayer(
  player: EntityPlayer,
  rand: RNG,
  amount: int,
  soulCost: int,
): void {
  if (
    player.GetPlayerType() === Isaac.GetPlayerTypeByName("Keeper") ||
    player.GetPlayerType() === Isaac.GetPlayerTypeByName("Keeper", true)
  ) {
    spawnCoins(Math.ceil(amount / 2), player.Position, rand, false, true);
    return;
  }

  let healAmount = amount;
  while (healAmount > 0) {
    if (player.HasFullHearts()) {
      if (player.Type === PlayerType.PLAYER_BETHANY) {
        if (healAmount > soulCost) {
          player.AddSoulCharge(1);
        }
        healAmount -= soulCost;
      } else if (player.Type === PlayerType.PLAYER_BETHANY_B) {
        player.AddBloodCharge(1);
        healAmount--;
      } else {
        if (healAmount > soulCost) {
          player.AddSoulHearts(1);
        }
        healAmount -= soulCost;
      }
    } else {
      player.AddHearts(1);
      healAmount--;
    }
  }
}
