import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { getGlobalData, saveGlobalData, SaveType } from "../../../../saveData";

const SAVE_KEY = "teleport4_ultra";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_TELEPORT4 as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const teleportedToUltra = getGlobalData(SaveType.PER_FLOOR, SAVE_KEY) as
    | boolean
    | undefined;

  if (teleportedToUltra === undefined || !teleportedToUltra) {
    player.UseCard(
      Card.CARD_REVERSE_MOON,
      UseFlag.USE_NOANIM | UseFlag.USE_NOANNOUNCER,
    );
    saveGlobalData(SaveType.PER_FLOOR, SAVE_KEY, true);
  } else {
    Game().GetLevel().LeaveDoor = -1;
    Game().StartRoomTransition(
      -2,
      Direction.NO_DIRECTION,
      RoomTransitionAnim.TELEPORT,
      player,
    );
  }

  return true;
}
