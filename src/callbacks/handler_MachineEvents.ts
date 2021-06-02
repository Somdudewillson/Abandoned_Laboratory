import {
  CollectibleTypeLabUtility,
  getItemUpgrade,
  itemHasUpgrade,
  LabMachineVariant,
  UNBALANCED,
} from "../constants";
import { getGlobalData, saveGlobalData, SaveType } from "../saveData";
import { playSound, spawnPickup } from "../utils";

export const enum MachineEntityType {
  UPGRADEMACHINE = 60,
}

export const enum MachineEntityVariant {
  UPGRADEMACHINE = 56,
}

const UPGRADE_SELECTION_ORDER = [
  ActiveSlot.SLOT_PRIMARY,
  ActiveSlot.SLOT_POCKET,
  ActiveSlot.SLOT_SECONDARY,
  ActiveSlot.SLOT_POCKET2,
];
const enum UpgradeAnimKey {
  IDLE = "Idle",
  INITIATE = "Initiate",
  WIGGLE = "Wiggle",
  PRIZE = "Prize",
  READY = "Ready",
}
const CHARGE_SAVE_KEY = "upgrade_machine_charged";
const BATT_SAVE_KEY = "upgrade_machine_batt";

export function preCollide(
  self: EntityNPC,
  collider: Entity,
  _low: boolean,
): boolean | null {
  if (collider.Type !== EntityType.ENTITY_PLAYER) {
    return null;
  }
  if (self.Variant !== LabMachineVariant.UPGRADE_MACHINE) {
    return null;
  }
  const timeout = self.GetData().timeout as number | null;
  if (timeout != null && timeout > 0) {
    return null;
  }

  const isCharged = getGlobalData(SaveType.PER_FLOOR, CHARGE_SAVE_KEY) as
    | boolean
    | null;
  const hasBatt = getGlobalData(SaveType.PER_FLOOR, BATT_SAVE_KEY) as
    | boolean
    | null;
  const player = collider.ToPlayer()!;
  if (isCharged) {
    return tryAcceptItem(player, self);
  }

  if (tryAcceptBattery(player)) {
    saveGlobalData(SaveType.PER_FLOOR, BATT_SAVE_KEY, true);
    saveGlobalData(SaveType.PER_FLOOR, CHARGE_SAVE_KEY, true);
    self.GetSprite().Play(UpgradeAnimKey.READY, true);
    self.GetData().timeout = 15;

    return null;
  }
  if (hasBatt == null || hasBatt) {
    saveGlobalData(SaveType.PER_FLOOR, BATT_SAVE_KEY, false);
    spawnPickup(
      self.Position.add(Vector(0, 25)),
      self.GetDropRNG(),
      PickupVariant.PICKUP_COLLECTIBLE,
      CollectibleTypeLabUtility.COLLECTIBLE_DISCHARGEDBATTERY,
      true,
    );
    self.PlaySound(SoundEffect.SOUND_BATTERYDISCHARGE, 1, 0, false, 1);
    self.GetData().timeout = 15;
  }

  return null;
}

function tryAcceptItem(player: EntityPlayer, self: EntityNPC): boolean | null {
  for (const slot of UPGRADE_SELECTION_ORDER) {
    if (itemHasUpgrade(player.GetActiveItem(slot), player.GetPlayerType())) {
      const upgradingItem = player.GetActiveItem(slot);

      self.GetData().upgrading = upgradingItem;
      self.GetData().upgradingPlayer = player.GetPlayerType();
      self.GetSprite().Play(UpgradeAnimKey.INITIATE, false);
      player.RemoveCollectible(upgradingItem, true, slot, false);

      playSound(SoundEffect.SOUND_COIN_INSERT, 1.1, 0, false, 1.3);
      self.GetData().timeout = 2 * 30;

      return null;
    }
  }

  // If the player has no valid items to upgrade
  playSound(SoundEffect.SOUND_THUMBS_DOWN, 1.1, 0, false, 0.7);
  self.GetData().timeout = 2 * 30;

  return null;
}

function tryAcceptBattery(player: EntityPlayer): boolean {
  if (
    !player.HasCollectible(
      CollectibleTypeLabUtility.COLLECTIBLE_DISCHARGEDBATTERY,
    )
  ) {
    return false;
  }

  for (const slot of UPGRADE_SELECTION_ORDER) {
    if (
      player.GetActiveItem(slot) ===
        CollectibleTypeLabUtility.COLLECTIBLE_DISCHARGEDBATTERY &&
      player.GetActiveCharge(slot) >= 5
    ) {
      player.RemoveCollectible(
        CollectibleTypeLabUtility.COLLECTIBLE_DISCHARGEDBATTERY,
        true,
        slot,
      );

      return true;
    }
  }

  return false;
}

export function update(self: EntityNPC): boolean | null {
  if (self.Variant !== LabMachineVariant.UPGRADE_MACHINE) {
    return null;
  }

  // State toggle from INITIATING to PROCESSING
  if (self.GetSprite().IsFinished(UpgradeAnimKey.INITIATE)) {
    // Isaac.DebugString("INITIATING -> PROCESSING");

    self.GetSprite().Play(UpgradeAnimKey.WIGGLE, false);
    self.GetData().processTime =
      60 +
      Isaac.GetItemConfig().GetCollectible(self.GetData().upgrading as number)
        .Quality *
        15;
    self.GetData().timeout = (self.GetData().processTime as number) + 30;

    self.PlaySound(SoundEffect.SOUND_LASERRING, 1, 0, false, 0.45);
  }

  // State toggle from PROCESSING to DISPENSE
  const curProcessTime = self.GetData().processTime as number | null;
  if (
    self.GetSprite().IsPlaying(UpgradeAnimKey.WIGGLE) &&
    curProcessTime != null &&
    curProcessTime <= 0
  ) {
    // Isaac.DebugString("PROCESSING -> DISPENSE");

    self.GetSprite().Play(UpgradeAnimKey.PRIZE, false);
    self.GetData().timeout = 30;

    self.PlaySound(SoundEffect.SOUND_LASERRING, 0, 0, false, 1);
  }

  // State toggle from DISPENSE to IDLE
  if (self.GetSprite().IsFinished(UpgradeAnimKey.PRIZE)) {
    // Isaac.DebugString("DISPENSE -> IDLE");

    self.GetSprite().Play(UpgradeAnimKey.IDLE, false);
    self.GetData().timeout = 30;
  }

  // Dispense product
  if (self.GetSprite().IsEventTriggered(UpgradeAnimKey.PRIZE)) {
    spawnPickup(
      self.Position.add(Vector(0, 25)),
      self.GetDropRNG(),
      PickupVariant.PICKUP_COLLECTIBLE,
      getItemUpgrade(
        self.GetDropRNG(),
        self.GetData().upgrading as number,
        self.GetData().upgradingPlayer as number,
        true,
      ),
      true,
    );

    playSound(SoundEffect.SOUND_SLOTSPAWN);

    saveGlobalData(SaveType.PER_FLOOR, CHARGE_SAVE_KEY, false);
    self.GetData().upgrading = null;
    self.GetData().upgradingPlayer = null;
  }

  // Update timeout
  const curTimeout = self.GetData().timeout as number | null;
  if (curTimeout != null && curTimeout > 0) {
    self.GetData().timeout = curTimeout - 1;
  }

  // Update processTime
  if (curProcessTime != null && curProcessTime > 0) {
    self.GetData().processTime = curProcessTime - 1;

    if (curProcessTime % 25 === 0) {
      self.PlaySound(SoundEffect.SOUND_LASERRING, 1, 0, false, 0.45);
    }
  }

  return true;
}

export function trySpawn(room: Room, floor: Level): void {
  if (room.GetType() !== RoomType.ROOM_SHOP) {
    return;
  }

  switch (floor.GetStage()) {
    default:
      if (!UNBALANCED) {
        return;
      }
    // Falls through
    case LevelStage.STAGE3_1:
    case LevelStage.STAGE3_2:
    case LevelStage.STAGE4_1:
    case LevelStage.STAGE4_2:
    case LevelStage.STAGE5:
    case LevelStage.STAGE6:
    case LevelStage.STAGE6_GREED:
      {
        const pos = Vector(
          room.GetBottomRightPos().X * 0.75,
          room.GetTopLeftPos().Y + 10,
        );
        const machineEnt = Isaac.Spawn(
          MachineEntityType.UPGRADEMACHINE,
          MachineEntityVariant.UPGRADEMACHINE,
          0,
          pos,
          Vector.Zero,
          null,
        );

        const isCharged = getGlobalData(SaveType.PER_FLOOR, CHARGE_SAVE_KEY) as
          | boolean
          | null;
        if (isCharged == null) {
          saveGlobalData(SaveType.PER_FLOOR, CHARGE_SAVE_KEY, false);
        } else if (isCharged) {
          machineEnt.GetSprite().Play(UpgradeAnimKey.READY, true);
        }

        const hasBatt = getGlobalData(SaveType.PER_FLOOR, BATT_SAVE_KEY) as
          | boolean
          | null;
        if (hasBatt == null) {
          saveGlobalData(SaveType.PER_FLOOR, BATT_SAVE_KEY, true);
        }
      }
      break;
  }
}

export function onSpawn(self: EntityNPC): void {
  if (self.Variant !== LabMachineVariant.UPGRADE_MACHINE) {
    return;
  }

  self.AddEntityFlags(EntityFlag.FLAG_NO_STATUS_EFFECTS);
  self.AddEntityFlags(EntityFlag.FLAG_NO_TARGET);
}
