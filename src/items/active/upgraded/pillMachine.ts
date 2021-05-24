import { CollectibleTypeLab } from "../../../constants";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_PILLMACHINE as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  const currentPillColor: PillColor = player.GetPill(0);
  if (currentPillColor == null || currentPillColor === PillColor.PILL_NULL) {
    return false;
  }
  const currentPillEffect: PillEffect = Game()
    .GetItemPool()
    .GetPillEffect(currentPillColor);

  const isGiant = (currentPillColor & PillColor.PILL_GIANT_FLAG) > 0;

  switch (currentPillEffect as number) {
    case PillEffect.PILLEFFECT_QUESTIONMARK: // ???
      break;
    // -----Pills with no amp-----
    case PillEffect.PILLEFFECT_PHEROMONES: // Pheromones
    case PillEffect.PILLEFFECT_AMNESIA: // Amnesia
    case PillEffect.PILLEFFECT_PERCS: // Percs!
    case PillEffect.PILLEFFECT_ADDICTED: // Addicted!
    case PillEffect.PILLEFFECT_GULP: // Gulp!
      player.UsePill(currentPillEffect, currentPillColor);
      break;

    // -----Amped pills-----
    case PillEffect.PILLEFFECT_BAD_GAS: // Bad Gas
    case PillEffect.PILLEFFECT_BAD_TRIP: // Bad Trip
    case PillEffect.PILLEFFECT_BALLS_OF_STEEL: // Balls of Steel
    case PillEffect.PILLEFFECT_EXPLOSIVE_DIARRHEA: // Explosive Diarrhea
    case PillEffect.PILLEFFECT_FULL_HEALTH: // Full Health
    case PillEffect.PILLEFFECT_HEALTH_DOWN: // Health Down
    case PillEffect.PILLEFFECT_HEALTH_UP: // Health Up
    case PillEffect.PILLEFFECT_I_FOUND_PILLS: // I Found Pills
    case PillEffect.PILLEFFECT_PUBERTY: // Puberty
    case PillEffect.PILLEFFECT_PRETTY_FLY: // Pretty Fly
    case PillEffect.PILLEFFECT_RANGE_DOWN: // Range Down
    case PillEffect.PILLEFFECT_RANGE_UP: // Range Up
    case PillEffect.PILLEFFECT_SPEED_DOWN: // Speed Down
    case PillEffect.PILLEFFECT_SPEED_UP: // Speed Up
    case PillEffect.PILLEFFECT_TEARS_DOWN: // Tears Down
    case PillEffect.PILLEFFECT_TEARS_UP: // Tears Up
    case PillEffect.PILLEFFECT_LUCK_DOWN: // Luck Down
    case PillEffect.PILLEFFECT_LUCK_UP: // Luck Up
    case PillEffect.PILLEFFECT_TELEPILLS: // Telepills
    case PillEffect.PILLEFFECT_48HOUR_ENERGY: // 48 Hour Energy
    case PillEffect.PILLEFFECT_HEMATEMESIS: // Hematemesis
    case PillEffect.PILLEFFECT_PARALYSIS: // Paralysis
    case PillEffect.PILLEFFECT_SEE_FOREVER: // I Can See Forever!
    case PillEffect.PILLEFFECT_LEMON_PARTY: // Lemon Party
    case PillEffect.PILLEFFECT_WIZARD: // R U a Wizard?
    case PillEffect.PILLEFFECT_RELAX: // Re-Lax
    case PillEffect.PILLEFFECT_LARGER: // One makes you larger
    case PillEffect.PILLEFFECT_SMALLER: // One makes you small
    case PillEffect.PILLEFFECT_INFESTED_EXCLAMATION: // Infested!
    case PillEffect.PILLEFFECT_INFESTED_QUESTION: // Infested?
    case PillEffect.PILLEFFECT_POWER: // Power Pill!
    case PillEffect.PILLEFFECT_RETRO_VISION: // Retro Vision
    case PillEffect.PILLEFFECT_FRIENDS_TILL_THE_END: // Friends Till The End!
    case PillEffect.PILLEFFECT_X_LAX: // X-Lax
    case PillEffect.PILLEFFECT_SOMETHINGS_WRONG: // Something's wrong...
    case PillEffect.PILLEFFECT_IM_DROWSY: // I'm Drowsy...
    case PillEffect.PILLEFFECT_IM_EXCITED: // I'm Excited!!!
    case PillEffect.PILLEFFECT_HORF: // Horf!
    case PillEffect.PILLEFFECT_SUNSHINE: // Feels like I'm walking on sunshine!
    case PillEffect.PILLEFFECT_VURP: // Vurp!
    case PillEffect.PILLEFFECT_SHOT_SPEED_DOWN: // Shot Speed Down
    case PillEffect.PILLEFFECT_SHOT_SPEED_UP: // Shot Speed Up
    case PillEffect.PILLEFFECT_EXPERIMENTAL: // Experimental Pill
      player.UsePill(currentPillEffect, currentPillColor);
      player.UsePill(currentPillEffect, currentPillColor);
      break;
    case PillEffect.PILLEFFECT_BOMBS_ARE_KEYS: // Bombs are Key
      player.UsePill(currentPillEffect, currentPillColor);
      if (isGiant) {
        player.UsePill(currentPillEffect, currentPillColor);
      } else {
        player.AddBombs(1);
        player.AddKeys(1);
      }
      break;
    default:
      return false;
  }

  return true;
}
