const queuedEffects = new Map<
  int,
  {
    itemID: number;
    slot: number;
    data: number;
    callback: (player: EntityPlayer, direction: Vector, data: number) => void;
  }
>();

const enum HeldCollectibleAnimKeys {
  LIFTITEM = "LiftItem",
  HIDEITEM = "HideItem",
}

export function postUpdate(
  player: EntityPlayer,
  _room: Room,
  _level: Level,
): void {
  const playerHash = GetPtrHash(player);
  if (!queuedEffects.has(playerHash)) {
    return;
  }

  const thrownData = queuedEffects.get(playerHash)!;
  const itemConfig = Isaac.GetItemConfig();
  if (!player.IsHoldingItem()) {
    const maxCharge = itemConfig.GetCollectible(thrownData.itemID).MaxCharges;
    const newCharge = player.GetActiveCharge(thrownData.slot) + maxCharge;

    player.SetActiveCharge(
      Math.min(
        newCharge,
        player.HasCollectible(CollectibleType.COLLECTIBLE_BATTERY)
          ? maxCharge * 2
          : maxCharge,
      ),
      thrownData.slot,
    );
    queuedEffects.delete(playerHash);
  }

  let dir = Vector.Zero;
  if (
    Input.IsActionPressed(ButtonAction.ACTION_SHOOTDOWN, player.ControllerIndex)
  ) {
    dir = Vector(0, 1);
  } else if (
    Input.IsActionPressed(ButtonAction.ACTION_SHOOTLEFT, player.ControllerIndex)
  ) {
    dir = Vector(-1, 0);
  } else if (
    Input.IsActionPressed(
      ButtonAction.ACTION_SHOOTRIGHT,
      player.ControllerIndex,
    )
  ) {
    dir = Vector(1, 0);
  } else if (
    Input.IsActionPressed(ButtonAction.ACTION_SHOOTUP, player.ControllerIndex)
  ) {
    dir = Vector(0, -1);
  } else {
    return;
  }
  thrownData.callback.call(null, player, dir, thrownData.data);
  player.AnimateCollectible(
    thrownData.itemID,
    HeldCollectibleAnimKeys.HIDEITEM,
  );
  queuedEffects.delete(playerHash);
}

export function queueThrowable(
  player: EntityPlayer,
  id: number,
  activeSlot: number,
  callback: (player: EntityPlayer, direction: Vector, data: number) => void,
  throwableData = 0,
): void {
  const playerHash = GetPtrHash(player);

  if (queuedEffects.has(playerHash)) {
    Isaac.DebugString("[Abandoned Lab] WARN | Overwriting queued throwable!");
  }
  queuedEffects.set(playerHash, {
    itemID: id,
    slot: activeSlot,
    data: throwableData,
    callback,
  });
  player.AnimateCollectible(id, HeldCollectibleAnimKeys.LIFTITEM);
}
