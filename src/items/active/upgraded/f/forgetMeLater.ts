import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { playSound } from "../../../../utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_FORGETMELATER as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_FORGET_ME_NOW,
    UseFlag.USE_NOANIM,
  );

  return true;
}

export function preClean(
  _rand: RNG,
  _spawnPosition: Vector,
  player: EntityPlayer,
  slot: ActiveSlot,
  room: Room,
  _level: Level,
): void {
  let charges = 1;
  if (
    room.GetRoomShape() === RoomShape.ROOMSHAPE_2x2 ||
    room.GetRoomShape() === RoomShape.ROOMSHAPE_LTL ||
    room.GetRoomShape() === RoomShape.ROOMSHAPE_LTR ||
    room.GetRoomShape() === RoomShape.ROOMSHAPE_LBL ||
    room.GetRoomShape() === RoomShape.ROOMSHAPE_LBR
  ) {
    charges = 2;
  }
  while (charges > 0) {
    if (player.GetActiveCharge(slot) < 30) {
      player.SetActiveCharge(player.GetActiveCharge(slot) + 1, slot);
      charges--;
      playSound(SoundEffect.SOUND_BATTERYCHARGE);
    } else {
      break;
    }
  }
}
