import { CollectibleTypeLab } from "../../../constants";
import { playSound } from "../../../utils";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_FORGETMELATER as number;
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

export function preClean(_rand: RNG, _SpawnPosition: Vector): boolean | null {
  const room: Room = Game().GetRoom();

  let player = Isaac.GetPlayer(0);
  let p = 0;
  while (player != null && p < 4) {
    if (player.HasCollectible(ownType(), true)) {
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

      for (let s = 0; s < ActiveSlot.SLOT_POCKET2; s++) {
        if (player.GetActiveItem(s) !== ownType()) {
          continue;
        }
        while (charges > 0) {
          if (player.GetActiveCharge(s) < 30) {
            player.SetActiveCharge(player.GetActiveCharge(s) + 1, s);
            charges--;
            playSound(SoundEffect.SOUND_BATTERYCHARGE);
          } else {
            break;
          }
        }
      }
    }
    player = Isaac.GetPlayer(++p);
  }
  return null;
}
