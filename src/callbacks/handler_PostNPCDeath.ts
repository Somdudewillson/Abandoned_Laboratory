const perSlotListeners = new Map<
  number,
  (
    npc: EntityNPC,
    player: EntityPlayer,
    slot: ActiveSlot,
    room: Room,
    level: Level,
  ) => void
>();
const perPlayerListeners: Array<
  (npc: EntityNPC, player: EntityPlayer, room: Room, level: Level) => void
> = [];
const perDeathListeners: Array<
  (npc: EntityNPC, room: Room, level: Level) => void
> = [];

export function addSlotListener(
  callback: (
    npc: EntityNPC,
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
    npc: EntityNPC,
    player: EntityPlayer,
    room: Room,
    level: Level,
  ) => void,
): void {
  perPlayerListeners.push(callback);
}

export function addDeathListener(
  callback: (npc: EntityNPC, room: Room, level: Level) => void,
): void {
  perDeathListeners.push(callback);
}

export function postDeath(npc: EntityNPC): void {
  const room = Game().GetRoom();
  const level = Game().GetLevel();

  for (const callback of perDeathListeners) {
    callback.call(undefined, npc, room, level);
  }

  for (let p = 0; p < Game().GetNumPlayers(); p++) {
    const player = Isaac.GetPlayer(p);
    if (player === undefined) {
      continue;
    }

    for (const callback of perPlayerListeners) {
      callback.call(undefined, npc, player, room, level);
    }

    for (let s = 0; s < ActiveSlot.SLOT_POCKET2; s++) {
      if (perSlotListeners.has(player.GetActiveItem(s))) {
        perSlotListeners
          .get(player.GetActiveItem(s))!
          .call(undefined, npc, player, s, room, level);
      }
    }
  }
}
