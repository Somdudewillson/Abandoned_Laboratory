import {
  FamiliarEntitySubtype,
  LabFamiliarEntityVariant,
} from "../../callbacks/handler_FamiliarEvents";
import { CollectibleTypeLabPassive } from "../../constants";

export function ownType(): number {
  return CollectibleTypeLabPassive.COLLECTIBLE_CYBERBOB as number;
}

export function ownCache(): CacheFlag {
  return CacheFlag.CACHE_FAMILIARS;
}

export function evalCache(player: EntityPlayer, _cache: CacheFlag): void {
  if (!player.HasCollectible(ownType())) {
    return;
  }

  const newFamiliar = Isaac.Spawn(
    EntityType.ENTITY_FAMILIAR,
    LabFamiliarEntityVariant,
    FamiliarEntitySubtype.CYBOB,
    player.Position,
    player.Velocity,
    player,
  );
  newFamiliar.Parent = player;
}
