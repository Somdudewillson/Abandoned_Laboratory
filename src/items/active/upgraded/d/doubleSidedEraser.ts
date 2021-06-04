import { queueThrowable } from "../../../../callbacks/handler_ThrownEffect";
import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { getPlayerData, savePlayerData, SaveType } from "../../../../saveData";
import { chargeEffect } from "../../../../utils";

const ERASER_SAVE_KEY = "eraser_uses_";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_DOUBLESIDEDERASER as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  /* player.UseActiveItem(
    CollectibleType.COLLECTIBLE_ERASER,
    UseFlag.USE_NOANIM | UseFlag.USE_NOANNOUNCER,
  ); */
  /* Isaac.Spawn(
    EntityType.ENTITY_TEAR,
    TearVariant.ERASER,
    0,
    player.Position,
    player.GetLastDirection().Resized(5),
    player,
  ); */

  const uses = getPlayerData(
    EntityRef(player),
    SaveType.PER_FLOOR,
    ERASER_SAVE_KEY + ActiveSlot.toString(),
  ) as number | null;
  Isaac.DebugString(`uses: ${uses}`);

  if (uses == null || uses > 1) {
    queueThrowable(player, ownType(), ActiveSlot, doThrow, 1);
    Isaac.DebugString("Recharging...");

    savePlayerData(
      EntityRef(player),
      SaveType.PER_FLOOR,
      ERASER_SAVE_KEY + ActiveSlot.toString(),
      1,
    );
    return { Discharge: false, Remove: false, ShowAnim: false };
  }

  queueThrowable(player, ownType(), ActiveSlot, doThrow, 2);
  Isaac.DebugString("Discharging...");
  savePlayerData(
    EntityRef(player),
    SaveType.PER_FLOOR,
    ERASER_SAVE_KEY + ActiveSlot.toString(),
    0,
  );
  return { Discharge: true, Remove: false, ShowAnim: false };
}

export function postLevel(
  player: EntityPlayer,
  slot: ActiveSlot,
  _level: Level,
): void {
  player.SetActiveCharge(1, slot);
  chargeEffect(player.Position);
}

export function doThrow(
  player: EntityPlayer,
  direction: Vector,
  data: number,
): void {
  const eraser = Isaac.Spawn(
    EntityType.ENTITY_TEAR,
    TearVariant.ERASER,
    0,
    player.Position,
    direction.Resized(15),
    player,
  );
  if (data === 1) {
    eraser.SetColor(Color(0.189, 0.415, 0.762), -1, 1);
  }
}
