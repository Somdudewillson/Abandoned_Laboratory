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
  Isaac.Spawn(
    EntityType.ENTITY_TEAR,
    TearVariant.ERASER,
    0,
    player.Position,
    player.GetLastDirection().Resized(5),
    player,
  );

  const uses = getPlayerData(
    EntityRef(player),
    SaveType.PER_FLOOR,
    ERASER_SAVE_KEY + ActiveSlot.toString(),
  ) as number | null;
  Isaac.DebugString(`uses: ${uses}`);

  if (uses == null || uses > 1) {
    Isaac.DebugString("Recharging...");

    savePlayerData(
      EntityRef(player),
      SaveType.PER_FLOOR,
      ERASER_SAVE_KEY + ActiveSlot.toString(),
      1,
    );
    return { Discharge: false, Remove: false, ShowAnim: true };
  }

  Isaac.DebugString("Discharging...");
  savePlayerData(
    EntityRef(player),
    SaveType.PER_FLOOR,
    ERASER_SAVE_KEY + ActiveSlot.toString(),
    0,
  );
  return true;
}

export function postLevel(
  player: EntityPlayer,
  slot: ActiveSlot,
  _level: Level,
): void {
  player.SetActiveCharge(1, slot);
  chargeEffect(player.Position);
}
