import { CollectibleTypeLabUpgrade } from "../../../constants";
import { playSound } from "../../../utils";
import { healPlayer } from "../upgraded/g/glowingHeart";

const HEALTH_POINTS: int = 7;
const SOUL_COST: int = 3;

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_RECONSTRUCTIVEHEART as number;
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

  for (let p = 0; p < Game().GetNumPlayers(); p++) {
    const otherPlayer = Isaac.GetPlayer(p);
    if (otherPlayer == null) {
      continue;
    }

    if (p !== player.Index) {
      healPlayer(otherPlayer, rand, Math.ceil(HEALTH_POINTS / 2), SOUL_COST);
    }
  }
  return true;
}

export function preClean(
  rand: RNG,
  _spawnPosition: Vector,
  player: EntityPlayer,
  _slot: ActiveSlot,
  _room: Room,
  _level: Level,
): boolean | null {
  if (rand.RandomFloat() < 0.2) {
    for (let p = 0; p < Game().GetNumPlayers(); p++) {
      const otherPlayer = Isaac.GetPlayer(p);
      if (otherPlayer == null) {
        continue;
      }

      playSound(SoundEffect.SOUND_HEARTIN);

      if (p === player.Index) {
        healPlayer(otherPlayer, rand, Math.ceil(HEALTH_POINTS / 4), SOUL_COST);
      } else {
        healPlayer(otherPlayer, rand, Math.ceil(HEALTH_POINTS / 8), SOUL_COST);
      }
    }
  }
  return null;
}
