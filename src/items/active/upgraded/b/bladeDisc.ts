import {
  EffectEntitySubtype,
  LabEffectEntityVariant,
} from "../../../../callbacks/handler_EffectEvents";
import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { directionToVector } from "../../../../utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_BLADEDISC as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  let fireDir = player.GetLastDirection();
  if (fireDir.LengthSquared() < 1) {
    fireDir = directionToVector(player.GetHeadDirection());
  }

  const newDisc = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    LabEffectEntityVariant,
    EffectEntitySubtype.BLADEDISC,
    player.Position,
    fireDir.Resized(25),
    player,
  );

  newDisc.Parent = player;
  newDisc.CollisionDamage = player.Damage * 3;
  newDisc.DepthOffset = 25;

  return true;
}
