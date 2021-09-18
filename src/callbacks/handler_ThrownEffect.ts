const queuedEffects = new Map<
  int,
  {
    itemID: number;
    slot: number;
    data: number;
    callback: (
      player: EntityPlayer,
      directionVector: Vector,
      direction: Direction,
      data: number,
    ) => void;
  }
>();

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
    const itemData = itemConfig.GetCollectible(thrownData.itemID);
    const maxCharge = itemData !== undefined ? itemData.MaxCharges : 0;
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

  let dirVec = Vector.Zero;
  let dir = Direction.NO_DIRECTION;
  if (
    Input.IsActionPressed(ButtonAction.ACTION_SHOOTDOWN, player.ControllerIndex)
  ) {
    dirVec = Vector(0, 1);
    dir = Direction.DOWN;
  } else if (
    Input.IsActionPressed(ButtonAction.ACTION_SHOOTLEFT, player.ControllerIndex)
  ) {
    dirVec = Vector(-1, 0);
    dir = Direction.LEFT;
  } else if (
    Input.IsActionPressed(
      ButtonAction.ACTION_SHOOTRIGHT,
      player.ControllerIndex,
    )
  ) {
    dirVec = Vector(1, 0);
    dir = Direction.RIGHT;
  } else if (
    Input.IsActionPressed(ButtonAction.ACTION_SHOOTUP, player.ControllerIndex)
  ) {
    dirVec = Vector(0, -1);
    dir = Direction.UP;
  } else {
    return;
  }
  thrownData.callback.call(undefined, player, dirVec, dir, thrownData.data);
  player.AnimateCollectible(thrownData.itemID, PlayerItemAnimation.HIDE_ITEM);
  queuedEffects.delete(playerHash);
}

export function queueThrowable(
  player: EntityPlayer,
  id: number,
  activeSlot: number,
  callback: (
    player: EntityPlayer,
    directionVector: Vector,
    direction: Direction,
    data: number,
  ) => void,
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
  player.AnimateCollectible(id, PlayerItemAnimation.LIFT_ITEM);
}
