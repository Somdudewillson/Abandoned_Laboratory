import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_STEELRAZOR as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  let cost: int = player.HasCollectible(CollectibleType.COLLECTIBLE_WAFER)
    ? 1
    : 2;
  while (cost > 0) {
    if (player.GetRottenHearts() > 0) {
      player.AddRottenHearts(-1);
    } else if (player.GetHearts() > 0) {
      player.AddHearts(-1);
    } else if (player.GetSoulHearts() > 0) {
      player.AddSoulHearts(-1);
    } else if (player.GetBoneHearts() > 0) {
      player.AddBoneHearts(-1);
    }
    cost--;
  }
  player.TakeDamage(2, DamageFlag.DAMAGE_FAKE, EntityRef(player), 0);

  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_BOOK_OF_BELIAL,
    UseFlag.USE_NOANIM | UseFlag.USE_NOANNOUNCER | UseFlag.USE_NOCOSTUME,
  );

  return true;
}
