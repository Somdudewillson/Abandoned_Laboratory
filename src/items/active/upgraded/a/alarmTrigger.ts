import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_ALARMTRIGGER as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  _player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const room = Game().GetRoom();

  if (!room.IsClear()) {
    return false;
  }

  switch (room.GetType()) {
    case RoomType.ROOM_MINIBOSS:
      if (rand.RandomFloat() < 0.2) {
        room.RespawnEnemies();
      }
      break;
    case RoomType.ROOM_BOSS:
    case RoomType.ROOM_BOSSRUSH:
      if (rand.RandomFloat() < 0.1) {
        room.RespawnEnemies();
      }
      break;
    default:
      room.RespawnEnemies();
      break;
  }

  return true;
}
