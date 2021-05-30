import { CollectibleTypeLab } from "../../../../constants";
import * as extMath from "../../../../extMath";

const BEAM_COUNT: int = 7;

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_METALFEATHER as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  const room: Room = Game().GetRoom();

  const targets: Vector[] = [];

  // Add all enemies as targets
  const entities = room.GetEntities();
  for (let i = 0; i < entities.Size; i++) {
    const entity = entities.Get(i);
    if (entity == null) {
      continue;
    }

    if (!entity.IsVulnerableEnemy()) {
      continue;
    }
    // If this is an enemy entity, assign beams proportional to health
    const attackRadius: int = Math.floor(entity.Size * 0.75);
    for (
      let l = 0;
      l < Math.ceil(entity.HitPoints / 30 + Math.round(rand.RandomFloat()));
      l++
    ) {
      targets.push(
        entity.Position.__add(
          Vector(
            extMath.randomInt(rand, 0, attackRadius * 2) - attackRadius,
            extMath.randomInt(rand, 0, attackRadius * 2) - attackRadius,
          ),
        ),
      );
    }
  }

  // Shuffle all targets
  if (targets.length > 0) {
    extMath.shuffleArray(targets);
  }

  for (let s = 0; s < BEAM_COUNT; s++) {
    let targetPos: Vector = Vector.Zero;
    if (targets.length > 0) {
      targetPos = targets.pop()!;
    } else {
      targetPos = room.GetRandomPosition(25);
    }
    Isaac.Spawn(
      EntityType.ENTITY_EFFECT,
      EffectVariant.CRACK_THE_SKY,
      0,
      targetPos,
      Vector.Zero,
      player,
    );
  }

  return true;
}
