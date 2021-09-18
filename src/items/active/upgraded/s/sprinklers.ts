import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { getPlayerData, savePlayerData, SaveType } from "../../../../saveData";
import { chargeEffect } from "../../../../utils/utils";

const SAVE_KEY_USES = "sprinklers_use_count";
const USES = 3;

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_SPRINKLERS as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  player.UseActiveItem(CollectibleType.COLLECTIBLE_SPRINKLER);

  const uses = getPlayerData(
    EntityRef(player),
    SaveType.PER_ROOM,
    SAVE_KEY_USES,
  ) as undefined | int;
  if (uses === undefined) {
    savePlayerData(
      EntityRef(player),
      SaveType.PER_ROOM,
      SAVE_KEY_USES,
      USES - 1,
    );
  } else {
    savePlayerData(
      EntityRef(player),
      SaveType.PER_ROOM,
      SAVE_KEY_USES,
      uses - 1,
    );
  }

  return true;
}

export function tick(
  player: EntityPlayer,
  slot: ActiveSlot,
  room: Room,
  _level: Level,
): void {
  if (Isaac.GetFrameCount() % 90 !== 0) {
    return;
  }
  const uses = getPlayerData(
    EntityRef(player),
    SaveType.PER_ROOM,
    SAVE_KEY_USES,
  ) as undefined | int;

  if (uses === undefined || uses <= 0 || room.IsClear()) {
    return;
  }

  if (player.GetActiveCharge(slot) < 3) {
    if (player.GetActiveCharge(slot) === 2) {
      chargeEffect(player.Position);
    }
    player.SetActiveCharge(player.GetActiveCharge(slot) + 1, slot);
  }
}

export function preClean(
  _rand: RNG,
  _spawnPosition: Vector,
  player: EntityPlayer,
  slot: ActiveSlot,
  _room: Room,
  _level: Level,
): void {
  const uses = getPlayerData(
    EntityRef(player),
    SaveType.PER_ROOM,
    SAVE_KEY_USES,
  ) as undefined | int;
  if (uses !== undefined) {
    player.SetActiveCharge(0, slot);
  }
}
