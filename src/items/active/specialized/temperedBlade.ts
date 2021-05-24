import { CollectibleTypeLab } from "../../../constants";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_TEMPEREDBLADE as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  if (player.GetRottenHearts() > 0) {
    player.AddRottenHearts(-1);
  } else if (player.GetHearts() > 0) {
    player.AddHearts(-1);
  } else if (player.GetSoulHearts() > 0) {
    player.AddSoulHearts(-1);
  } else if (player.GetBoneHearts() > 0) {
    player.AddBoneHearts(-1);
  }
  player.TakeDamage(1, DamageFlag.DAMAGE_FAKE, EntityRef(player), 0);

  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_BOOK_OF_BELIAL,
    UseFlag.USE_NOANIM | UseFlag.USE_NOANNOUNCER | UseFlag.USE_NOCOSTUME,
  );
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_NECRONOMICON,
    UseFlag.USE_NOANIM | UseFlag.USE_NOANNOUNCER,
  );

  return true;
}
