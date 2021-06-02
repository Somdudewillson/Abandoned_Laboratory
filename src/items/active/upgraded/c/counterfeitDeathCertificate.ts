import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_COUNTERFEITDEATHCERTIFICATE as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.RemoveCollectible(ownType(), true, ActiveSlot);
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_DEATH_CERTIFICATE,
    UseFlag.USE_NOANIM | UseFlag.USE_NOCOSTUME,
  );
  player.AddCollectible(
    CollectibleType.COLLECTIBLE_DEATH_CERTIFICATE,
    0,
    true,
    ActiveSlot,
  );

  return true;
}
