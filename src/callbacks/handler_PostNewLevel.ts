const perSlotListeners = new Map<
  number,
  (player: EntityPlayer, slot: ActiveSlot, level: Level) => void
>();
const perPlayerListeners: Array<(player: EntityPlayer, level: Level) => void> =
  [];
const perLevelListeners: Array<(level: Level) => void> = [];

export function addSlotListener(
  callback: (player: EntityPlayer, slot: ActiveSlot, level: Level) => void,
  item: number,
): void {
  perSlotListeners.set(item, callback);
}

export function addPlayerListener(
  callback: (player: EntityPlayer, level: Level) => void,
): void {
  perPlayerListeners.push(callback);
}

export function addLevelListener(callback: (level: Level) => void): void {
  perLevelListeners.push(callback);
}

export function postLevel(): void {
  const level = Game().GetLevel();

  for (const callback of perLevelListeners) {
    callback.call(null, level);
  }

  for (let p = 0; p < Game().GetNumPlayers(); p++) {
    const player = Isaac.GetPlayer(p);
    if (player == null) {
      continue;
    }

    for (const callback of perPlayerListeners) {
      callback.call(null, player, level);
    }

    for (let s = 0; s < ActiveSlot.SLOT_POCKET2; s++) {
      if (perSlotListeners.has(player.GetActiveItem(s))) {
        perSlotListeners
          .get(player.GetActiveItem(s))!
          .call(null, player, s, level);
      }
    }
  }
}
