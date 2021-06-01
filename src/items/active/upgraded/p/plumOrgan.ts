import { CollectibleTypeLab } from "../../../../constants";
import { playSound } from "../../../../utils";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_PLUMORGAN as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const isCarBatt = (UseFlags & UseFlag.USE_CARBATTERY) > 0;
  if (!isCarBatt) {
    playSound(SoundEffect.SOUND_FLUTE, 1.2, 0, false, 0.5);
  }

  const xShift = isCarBatt ? 150 : 75;
  const yShift = isCarBatt ? 25 : -25;

  Isaac.Spawn(
    EntityType.ENTITY_FAMILIAR,
    FamiliarVariant.BABY_PLUM,
    0,
    player.Position.add(Vector(-xShift, yShift)),
    Vector.Zero,
    player,
  );
  Isaac.Spawn(
    EntityType.ENTITY_FAMILIAR,
    FamiliarVariant.BABY_PLUM,
    0,
    player.Position.add(Vector(xShift, yShift)),
    Vector.Zero,
    player,
  );

  return true;
}
