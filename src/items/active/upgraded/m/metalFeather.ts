import { CollectibleTypeLabUpgrade } from "../../../../constants";
import * as extMath from "../../../../utils/extMath";

const BEAM_COUNT: int = 7;

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_METALFEATHER as number;
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
  const entities = Isaac.GetRoomEntities();
  for (const entity of entities) {
    if (entity === undefined) {
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
        entity.Position.add(
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
    extMath.shuffleArray(targets, rand);
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
