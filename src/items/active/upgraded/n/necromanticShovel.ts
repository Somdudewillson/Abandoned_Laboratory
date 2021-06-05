import {
  EffectEntitySubtype,
  LabEffectEntityVariant,
} from "../../../../callbacks/handler_EffectEvents";
import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_NECROMANTICSHOVEL as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    LabEffectEntityVariant,
    EffectEntitySubtype.NECROGRAVE,
    Game().GetRoom().GetClampedPosition(player.Position, 20),
    Vector.Zero,
    player,
  );

  return true;
}

export function postDeath(
  npc: EntityNPC,
  player: EntityPlayer,
  _room: Room,
  _level: Level,
): void {
  if (!player.HasCollectible(ownType())) {
    return;
  }
  if (!npc.IsEnemy()) {
    return;
  }

  const entities = Isaac.GetRoomEntities();
  for (const entity of entities) {
    if (entity.Type !== EntityType.ENTITY_EFFECT) {
      continue;
    }
    if (entity.Variant !== LabEffectEntityVariant) {
      continue;
    }
    if (entity.SubType !== EffectEntitySubtype.NECROGRAVE) {
      continue;
    }

    if (
      entity.SpawnerEntity == null ||
      GetPtrHash(player) !== GetPtrHash(entity.SpawnerEntity)
    ) {
      continue;
    }

    const newSoul = Isaac.Spawn(
      EntityType.ENTITY_EFFECT,
      LabEffectEntityVariant,
      EffectEntitySubtype.NECROSOUL,
      npc.Position,
      Vector.Zero,
      player,
    ).ToEffect()!;
    newSoul.Target = entity;
    newSoul.MaxRadius = newSoul.Position.Distance(entity.Position);
    newSoul.CollisionDamage = npc.MaxHitPoints * (npc.IsChampion() ? 2.5 : 1);
    newSoul.RenderZOffset += 25;

    const scale = Math.max(Math.min(npc.MaxHitPoints / 100, 5), 1);
    newSoul.SpriteScale = Vector(scale, scale);
  }
}
