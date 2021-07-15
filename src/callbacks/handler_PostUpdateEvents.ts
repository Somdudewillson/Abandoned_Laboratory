const perSlotListeners = new Map<
  number,
  (player: EntityPlayer, slot: ActiveSlot, room: Room, level: Level) => void
>();
const perPlayerListeners: Array<
  (player: EntityPlayer, room: Room, level: Level) => void
> = [];
const perTickListeners: Array<(room: Room, level: Level) => void> = [];

export function addSlotListener(
  callback: (
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
  callback: (player: EntityPlayer, room: Room, level: Level) => void,
): void {
  perPlayerListeners.push(callback);
}

export function addTickListener(
  callback: (room: Room, level: Level) => void,
): void {
  perTickListeners.push(callback);
}

export function postUpdate(): void {
  const room = Game().GetRoom();
  const level = Game().GetLevel();

  for (const callback of perTickListeners) {
    callback.call(null, room, level);
  }

  for (let p = 0; p < Game().GetNumPlayers(); p++) {
    const player = Isaac.GetPlayer(p);
    if (player === null) {
      continue;
    }

    for (const callback of perPlayerListeners) {
      callback.call(null, player, room, level);
    }

    for (let s = 0; s < ActiveSlot.SLOT_POCKET2; s++) {
      if (perSlotListeners.has(player.GetActiveItem(s))) {
        perSlotListeners
          .get(player.GetActiveItem(s))!
          .call(null, player, s, room, level);
      }
    }
  }
}
