import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_POWEREDD100 as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UseActiveItem(
    CollectibleTypeLabUpgrade.COLLECTIBLE_D2,
    UseFlag.USE_NOANIM,
  );
  player.UseActiveItem(CollectibleType.COLLECTIBLE_D6, UseFlag.USE_NOANIM);
  player.UseActiveItem(
    CollectibleTypeLabUpgrade.COLLECTIBLE_ALARMTRIGGER,
    UseFlag.USE_NOANIM,
  );
  player.UseActiveItem(
    CollectibleTypeLabUpgrade.COLLECTIBLE_AMPLIFIEDD8,
    UseFlag.USE_NOANIM,
  );
  player.UseActiveItem(CollectibleType.COLLECTIBLE_D10, UseFlag.USE_NOANIM);
  player.UseActiveItem(
    CollectibleTypeLabUpgrade.COLLECTIBLE_PORTABLETERRAFORMER,
    UseFlag.USE_NOANIM,
  );
  player.UseActiveItem(
    CollectibleTypeLabUpgrade.COLLECTIBLE_MATTERREARRANGER,
    UseFlag.USE_NOANIM,
  );

  return true;
}
