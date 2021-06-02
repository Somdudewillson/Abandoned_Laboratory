import { CollectibleTypeLab } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_PETROGLYPHOFBELIAL as number;
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
    CollectibleType.COLLECTIBLE_BOOK_OF_BELIAL,
    UseFlag.USE_NOANIM,
  );
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_BOOK_OF_BELIAL,
    UseFlag.USE_NOANIM,
  );

  const totalHealth = player.GetHearts() + player.GetSoulHearts();
  if (totalHealth < 4) {
    player.AddBlackHearts(math.min(2, 4 - totalHealth));
  }

  return true;
}
