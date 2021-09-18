const perSlotListeners = new Map<
  number,
  (
    rand: RNG,
    spawnPosition: Vector,
    player: EntityPlayer,
    slot: ActiveSlot,
    room: Room,
    level: Level,
  ) => void
>();
const perPlayerListeners: Array<
  (
    rand: RNG,
    spawnPosition: Vector,
    player: EntityPlayer,
    room: Room,
    level: Level,
  ) => void
> = [];
const perCleanListeners: Array<
  (rand: RNG, spawnPosition: Vector, room: Room, level: Level) => void
> = [];

export function addSlotListener(
  callback: (
    rand: RNG,
    spawnPosition: Vector,
    player: EntityPlayer,
    slot: ActiveSlot,
    room: Room,
    level: Level,
  ) => void,
  item: number,
): void {
  perSlotListeners.set(item, callback);
}

export function addPlayerListener(
  callback: (
    rand: RNG,
    spawnPosition: Vector,
    player: EntityPlayer,
    room: Room,
    level: Level,
  ) => void,
): void {
  perPlayerListeners.push(callback);
}

export function addCleanListener(
  callback: (
    rand: RNG,
    spawnPosition: Vector,
    room: Room,
    level: Level,
  ) => void,
): void {
  perCleanListeners.push(callback);
}

export function preClean(rand: RNG, SpawnPosition: Vector): boolean | void {
  const room = Game().GetRoom();
  const level = Game().GetLevel();

  for (const callback of perCleanListeners) {
    callback.call(undefined, rand, SpawnPosition, room, level);
  }

  for (let p = 0; p < Game().GetNumPlayers(); p++) {
    const player = Isaac.GetPlayer(p);
    if (player === undefined) {
      continue;
    }

    for (const callback of perPlayerListeners) {
      callback.call(undefined, rand, SpawnPosition, player, room, level);
    }

    for (let s = 0; s < ActiveSlot.SLOT_POCKET2; s++) {
      if (perSlotListeners.has(player.GetActiveItem(s))) {
        perSlotListeners
          .get(player.GetActiveItem(s))!
          .call(undefined, rand, SpawnPosition, player, s, room, level);
      }
    }
  }
}
