import { CollectibleTypeLab } from "../../../constants";
import { playSound } from "../../../utils";
import { healPlayer } from "../upgraded/glowingHeart";

const HEALTH_POINTS: int = 7;
const SOUL_COST: int = 3;

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_RECONSTRUCTIVEHEART as number;
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

export function preClean(rand: RNG, _SpawnPosition: Vector): boolean | null {
  if (rand.RandomFloat() < 0.2) {
    let i = 0;
    let player = Isaac.GetPlayer(i);
    while (player != null && i < 5) {
      playSound(SoundEffect.SOUND_HEARTIN);

      if (player.HasCollectible(ownType())) {
        healPlayer(player, rand, Math.ceil(HEALTH_POINTS / 4), SOUL_COST);
      } else {
        healPlayer(player, rand, Math.ceil(HEALTH_POINTS / 8), SOUL_COST);
      }
      player = Isaac.GetPlayer(++i);
    }
  }
  return null;
}
