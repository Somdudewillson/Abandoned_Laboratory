const perSlotListeners = new Map<
  number,
  (player: EntityPlayer, slot: ActiveSlot) => void
>();
const perPlayerListeners: Array<(player: EntityPlayer) => void> = [];

export function addSlotListener(
  callback: (player: EntityPlayer, slot: ActiveSlot) => void,
  item: number,
): void {
  perSlotListeners.set(item, callback);
}

export function addPlayerListener(
  callback: (player: EntityPlayer) => void,
): void {
  perPlayerListeners.push(callback);
}

export function postRoom(): void {
  for (let p = 0; p < Game().GetNumPlayers(); p++) {
    const player = Isaac.GetPlayer(p);
    if (player == null) {
      continue;
    }

    for (const callback of perPlayerListeners) {
      callback.call(null, player);
    }

    for (let s = 0; s < ActiveSlot.SLOT_POCKET2; s++) {
      if (perSlotListeners.has(player.GetActiveItem(s))) {
        perSlotListeners.get(player.GetActiveItem(s))!.call(null, player, s);
      }
    }
  }
}
