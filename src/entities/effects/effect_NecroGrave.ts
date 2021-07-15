const spawnWeights = [
  SpawnTypes.BONY,
  SpawnTypes.BONY,
  SpawnTypes.BONY,
  SpawnTypes.BONY,
  SpawnTypes.BONY,
  SpawnTypes.BONY,
  SpawnTypes.BONY,
  SpawnTypes.BONY,
  SpawnTypes.BONY,
  SpawnTypes.BONY,
  SpawnTypes.BONY,
  SpawnTypes.BONY,

  SpawnTypes.BONEFLY,
  SpawnTypes.BONEFLY,
  SpawnTypes.BONEFLY,
  SpawnTypes.BONEFLY,
  SpawnTypes.BONEFLY,
  SpawnTypes.BONEFLY,

  SpawnTypes.BLACKBONY,
  SpawnTypes.BLACKBONY,

  SpawnTypes.REVENANT,
];

const enum SpawnTypes {
  BONY = 0,
  BONEFLY = 1,
  BLACKBONY = 2,
  REVENANT = 3,
}

const SPAWN_DELAY = Math.round(30 * 15);
const SPAWN_MAX = 5;

const CHAMPION_THRESHOLD = 150;

export function update(self: EntityEffect): void {
  self.RenderZOffset = -5;
  const sprite = self.GetSprite();
  sprite.PlaybackSpeed = 0;

  if (self.Timeout <= 0) {
    if (countSpawned() < SPAWN_MAX) {
      self.Timeout = SPAWN_DELAY;
      doSpawn(self);
    } else {
      self.Timeout = 4;
    }
  } else {
    const adjChampionCost = CHAMPION_THRESHOLD * 1.05 ** self.MinRadius;

    if (self.State >= adjChampionCost) {
      self.State -= adjChampionCost;
      self.MinRadius++;
      doSpawn(self, true);
    }
  }

  sprite.SetFrame(Math.round((1 - self.Timeout / SPAWN_DELAY) * 9));
}

function doSpawn(self: EntityEffect, champion = false): void {
  let type = 0;
  let variant = 0;

  switch (spawnWeights[self.GetDropRNG().RandomInt(spawnWeights.length)]) {
    default:
    case SpawnTypes.BONY:
      type = EntityType.ENTITY_BONY;
      break;
    case SpawnTypes.BONEFLY:
      type = EntityType.ENTITY_BOOMFLY;
      variant = 4;
      break;
    case SpawnTypes.BLACKBONY:
      type = EntityType.ENTITY_BLACK_BONY;
      break;
    case SpawnTypes.REVENANT:
      type = EntityType.ENTITY_REVENANT;
      break;
  }

  const newMinion = Isaac.Spawn(
    type,
    variant,
    0,
    self.Position,
    Vector.Zero,
    self,
  ).ToNPC()!;
  newMinion.AddCharmed(EntityRef(self.SpawnerEntity), -1);
  newMinion.Parent = self.SpawnerEntity;
  if (champion) {
    newMinion.MakeChampion(self.GetDropRNG().Next());
  }
}

function countSpawned(): int {
  const entities = Isaac.GetRoomEntities();
  let count = 0;
  for (const entity of entities) {
    if (!entity.HasEntityFlags(EntityFlag.FLAG_FRIENDLY)) {
      continue;
    }
    if (
      entity.SpawnerEntity !== null &&
      entity.SpawnerEntity.Type === EntityType.ENTITY_EFFECT &&
      entity.SpawnerEntity.Variant === 579 &&
      entity.SpawnerEntity.SubType === 18
    ) {
      count++;
    }
  }

  return count;
}
