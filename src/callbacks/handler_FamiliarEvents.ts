import { CollectibleTypeLabPassive } from "../constants";
import * as FAMILIAR_CYBOB from "../entities/familiars/familiar_Cybob";

export const LabFamiliarEntityVariant = 5045;

export const enum FamiliarEntitySubtype {
  CYBOB = 23,
}

export function update(familiar: EntityFamiliar): void {
  switch (familiar.SubType) {
    default:
      break;
    case FamiliarEntitySubtype.CYBOB:
      FAMILIAR_CYBOB.update(familiar);
      break;
  }
}

export function collide(
  familiar: EntityFamiliar,
  _collider: Entity,
  _low: boolean,
): boolean | void {
  switch (familiar.SubType) {
    default:
    case FamiliarEntitySubtype.CYBOB:
  }
}

export function evalCache(player: EntityPlayer, cacheFlags: CacheFlag): void {
  if ((cacheFlags & CacheFlag.CACHE_FAMILIARS) <= 0) {
    return;
  }

  // update familiars
  if (player.HasCollectible(CollectibleTypeLabPassive.COLLECTIBLE_CYBERBOB)) {
    // do stuff
  }
}
