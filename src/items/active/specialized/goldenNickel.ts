import {
  EffectEntitySubtype,
  LabEffectEntityVariant,
} from "../../../callbacks/handler_EffectEvents";
import { CollectibleTypeLabUpgrade } from "../../../constants";
import * as SaveUtil from "../../../saveData";
import { SaveType } from "../../../saveData";
import * as extMath from "../../../utils/extMath";
import { spawnCoins } from "../../../utils/utils";

export const KEY_COIN_SHIELDS = "coin_shields";
const COIN_SHIELD_CAP: int = 3;

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_GOLDENNICKEL as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  let coinShields: int | null = SaveUtil.getPlayerData(
    EntityRef(player),
    SaveType.PER_RUN,
    KEY_COIN_SHIELDS,
  ) as number | null;
  if (coinShields === null) {
    coinShields = 0;
  }

  spawnCoins(extMath.randomInt(rand, 1, 3), player.Position, rand, false, true);
  if (coinShields < COIN_SHIELD_CAP) {
    SaveUtil.savePlayerData(
      EntityRef(player),
      SaveType.PER_RUN,
      KEY_COIN_SHIELDS,
      coinShields + 1,
    );

    const newGraphic = Isaac.Spawn(
      EntityType.ENTITY_EFFECT,
      LabEffectEntityVariant,
      EffectEntitySubtype.COINSHIELD,
      player.Position,
      Vector.Zero,
      player,
    ).ToEffect()!;

    newGraphic.FollowParent(player);
    updateEffectStates(coinShields + 1);
  }

  return true;
}

export function interceptDamage(
  TookDamage: Entity,
  DamageAmount: float,
  DamageFlags: int,
  DamageSource: EntityRef,
  _DamageCountdownFrames: int,
): boolean | void {
  if (
    DamageAmount <= 0 ||
    (DamageFlags & DamageFlag.DAMAGE_FAKE) === DamageFlag.DAMAGE_FAKE
  ) {
    return;
  }

  const player = TookDamage.ToPlayer();
  if (player === null) {
    return;
  }

  const coinShields: int | null = SaveUtil.getPlayerData(
    EntityRef(player),
    SaveType.PER_RUN,
    KEY_COIN_SHIELDS,
  ) as number | null;
  if (coinShields === null || coinShields <= 0) {
    return;
  }

  SaveUtil.savePlayerData(
    EntityRef(player),
    SaveType.PER_RUN,
    KEY_COIN_SHIELDS,
    coinShields - 1,
  );
  player.TakeDamage(DamageAmount, DamageFlag.DAMAGE_FAKE, DamageSource, 0);

  updateEffectStates(coinShields - 1, true);

  return false;
}

function updateEffectStates(coinShields: int, remove = false): void {
  const shieldEntities = Isaac.FindByType(
    EntityType.ENTITY_EFFECT,
    LabEffectEntityVariant,
    EffectEntitySubtype.COINSHIELD,
    false,
    false,
  );

  const newRotOffset = 360 / coinShields;
  let count = 1;
  for (const shield of shieldEntities) {
    if (remove) {
      const rand = shield.GetDropRNG();
      for (let i = 0; i < 6 * (coinShields + 1); i++) {
        Isaac.Spawn(
          EntityType.ENTITY_EFFECT,
          EffectVariant.GOLD_PARTICLE,
          0,
          shield.Position,
          extMath.randomOnCircle(rand, rand.RandomFloat() * 9 + 1),
          shield,
        );
      }

      shield.Remove();

      remove = false;
    } else {
      shield.ToEffect()!.State = newRotOffset * count++;
    }
  }
}
