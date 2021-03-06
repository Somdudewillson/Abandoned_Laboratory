import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { playSound } from "../../../../utils/utils";

const DAMAGE_AMOUNT = 999999999;

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_PLAND as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const entities = Isaac.GetRoomEntities();
  for (const entity of entities) {
    if (entity === undefined) {
      continue;
    }

    if (!entity.IsActiveEnemy(false)) {
      continue;
    }

    entity.TakeDamage(
      DAMAGE_AMOUNT,
      DamageFlag.DAMAGE_IGNORE_ARMOR | DamageFlag.DAMAGE_INVINCIBLE,
      EntityRef(player),
      0,
    );
    entity.HitPoints -= DAMAGE_AMOUNT;
  }

  if (player.GetMaxHearts() > 0) {
    player.AddSoulHearts(-player.GetSoulHearts());
    player.AddHearts(-player.GetHearts() + 1);
  } else {
    player.AddSoulHearts(-player.GetSoulHearts() + 1);
  }
  player.TakeDamage(
    DAMAGE_AMOUNT,
    DamageFlag.DAMAGE_NOKILL,
    EntityRef(player),
    0,
  );
  playSound(SoundEffect.SOUND_MEGA_BLAST_START, 1.2);

  return { Discharge: true, Remove: true, ShowAnim: true };
}
