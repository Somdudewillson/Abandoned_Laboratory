import * as EFFECT_BLADEDISC from "../entities/effects/effect_BladeDisc";
import * as EFFECT_CAPTUREBALL from "../entities/effects/effect_CaptureBall";
import * as EFFECT_COINSHIELD from "../entities/effects/effect_CoinShield";
import * as EFFECT_CYBERGHOST from "../entities/effects/effect_CyberGhost";
import * as EFFECT_KINETICIMPACTOR from "../entities/effects/effect_KineticImpactor";
import * as EFFECT_NECROGRAVE from "../entities/effects/effect_NecroGrave";
import * as EFFECT_NECROSOUL from "../entities/effects/effect_NecroSoul";
import * as EFFECT_SINGULARITYGENERATOR from "../entities/effects/effect_SingularityGenerator";

export const LabEffectEntityVariant = 579;

export const enum EffectEntitySubtype {
  KINETICIMPACTOR = 12,
  BLADEDISC = 13,
  SINGULARITYGENERATOR = 14,
  CYBERGHOST = 15,
  HEALTHYBALL = 16,
  SUPERBALL = 17,
  NECROGRAVE = 18,
  NECROSOUL = 19,
  COINSHIELD = 20,
}

export function update(self: EntityEffect): void {
  if (self.Variant !== LabEffectEntityVariant) {
    return;
  }
  switch (self.SubType) {
    default:
      break;
    case EffectEntitySubtype.KINETICIMPACTOR:
      EFFECT_KINETICIMPACTOR.update(self);
      break;
    case EffectEntitySubtype.BLADEDISC:
      EFFECT_BLADEDISC.update(self);
      break;
    case EffectEntitySubtype.SINGULARITYGENERATOR:
      EFFECT_SINGULARITYGENERATOR.update(self);
      break;
    case EffectEntitySubtype.CYBERGHOST:
      EFFECT_CYBERGHOST.update(self);
      break;
    case EffectEntitySubtype.HEALTHYBALL:
    case EffectEntitySubtype.SUPERBALL:
      EFFECT_CAPTUREBALL.update(self);
      break;
    case EffectEntitySubtype.NECROGRAVE:
      EFFECT_NECROGRAVE.update(self);
      break;
    case EffectEntitySubtype.NECROSOUL:
      EFFECT_NECROSOUL.update(self);
      break;
    case EffectEntitySubtype.COINSHIELD:
      EFFECT_COINSHIELD.update(self);
      break;
  }
}
