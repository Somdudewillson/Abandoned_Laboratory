import { CollectibleTypeLab } from "../../../constants";
import * as extMath from "../../../extMath";
import * as SaveUtil from "../../../saveData";
import { SaveType } from "../../../saveData";
import { spawnCoins } from "../../../utils";

const DATA_KEY = "nickel_hearts";
const NICKEL_HEALTH_CAP: int = 3;

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_GOLDENNICKEL as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  let nickelHearts: int = 0;
  if (
    SaveUtil.getPlayerData(player.Index, SaveType.PER_RUN, DATA_KEY) != null
  ) {
    nickelHearts = SaveUtil.getPlayerData(
      player.Index,
      SaveType.PER_RUN,
      DATA_KEY,
    ) as number;
  }

  if (rand.RandomFloat() < 0.75) {
    let amt: int = extMath.randomInt(rand, 1, 5);
    if (rand.RandomFloat() < 0.2) {
      amt = extMath.randomInt(rand, 5, 10);
      if (rand.RandomFloat() < 0.2) {
        amt = extMath.randomInt(rand, 10, 15);
      }
    }
    spawnCoins(amt, player.Position, rand, false, true);

    if (
      nickelHearts < NICKEL_HEALTH_CAP &&
      rand.RandomFloat() < 0.75 - nickelHearts * 0.25
    ) {
      SaveUtil.savePlayerData(
        player.Index,
        SaveType.PER_RUN,
        DATA_KEY,
        nickelHearts + 1,
      );
    }
  }

  return true;
}

export function interceptDamage(
  TookDamage: Entity,
  DamageAmount: float,
  DamageFlags: int,
  DamageSource: EntityRef,
  _DamageCountdownFrames: int,
): boolean | null {
  if (
    DamageAmount <= 0 ||
    (DamageFlags & DamageFlag.DAMAGE_FAKE) === DamageFlag.DAMAGE_FAKE
  ) {
    return null;
  }

  const player = TookDamage.ToPlayer();
  if (player == null) {
    return null;
  }

  if (
    SaveUtil.getPlayerData(player.Index, SaveType.PER_RUN, DATA_KEY) == null
  ) {
    return null;
  }
  const nickelHearts: int = SaveUtil.getPlayerData(
    player.Index,
    SaveType.PER_RUN,
    DATA_KEY,
  ) as number;
  if (nickelHearts <= 0) {
    return null;
  }

  SaveUtil.savePlayerData(
    player.Index,
    SaveType.PER_RUN,
    DATA_KEY,
    nickelHearts - 1,
  );
  player.TakeDamage(DamageAmount, DamageFlag.DAMAGE_FAKE, DamageSource, 0);

  const rand: RNG = player.GetCollectibleRNG(ownType());
  for (let i = 0; i < 6 * nickelHearts; i++) {
    Isaac.Spawn(
      EntityType.ENTITY_EFFECT,
      EffectVariant.GOLD_PARTICLE,
      0,
      player.Position,
      extMath.randomOnCircle(rand, rand.RandomFloat() * 9 + 1),
      player,
    );
  }

  if (rand.RandomFloat() < nickelHearts * 0.133) {
    Isaac.Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_COIN,
      CoinSubType.COIN_PENNY,
      player.Position,
      extMath.randomOnCircle(rand, rand.RandomFloat() * 10 + 10),
      player,
    );
  }

  return false;
}
