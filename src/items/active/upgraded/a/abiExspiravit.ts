import {
  EffectEntitySubtype,
  LabEffectEntityVariant,
} from "../../../../callbacks/handler_EffectEvents";
import { CollectibleTypeLabUpgrade } from "../../../../constants";

const enum CyberGhostAnimKey {
  IDLE = "Idle",
  EXPLODE = "Explode",
}

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_ABIEXSPIRAVIT as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  _player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  const entities = Isaac.FindByType(
    EntityType.ENTITY_EFFECT,
    LabEffectEntityVariant,
    EffectEntitySubtype.CYBERGHOST,
    false,
    false,
  );
  for (const ghost of entities) {
    const sprite = ghost.GetSprite();
    if (sprite.IsPlaying(CyberGhostAnimKey.IDLE)) {
      sprite.Play(CyberGhostAnimKey.EXPLODE, true);
    }
  }

  return true;
}

export function postDeath(
  npc: EntityNPC,
  player: EntityPlayer,
  _slot: ActiveSlot,
  _room: Room,
  _level: Level,
): void {
  if (!npc.IsEnemy() || npc.HasEntityFlags(EntityFlag.FLAG_NO_TARGET)) {
    return;
  }

  const newGhost = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    LabEffectEntityVariant,
    EffectEntitySubtype.CYBERGHOST,
    npc.Position,
    Vector.Zero,
    player,
  ).ToEffect()!;
  newGhost.Parent = player;
  newGhost.CollisionDamage = npc.MaxHitPoints;
  newGhost.Size = Math.min(Math.max(0.6, npc.MaxHitPoints / 100), 5);
  newGhost.SpriteScale = Vector(newGhost.Size, newGhost.Size);
}
