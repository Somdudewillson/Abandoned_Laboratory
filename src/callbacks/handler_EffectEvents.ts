import * as EFFECT_BLADEDISC from "../entities/effects/effect_BladeDisc";
import * as EFFECT_CYBERGHOST from "../entities/effects/effect_CyberGhost";
import * as EFFECT_KINETICIMPACTOR from "../entities/effects/effect_KineticImpactor";
import * as EFFECT_SINGULARITYGENERATOR from "../entities/effects/effect_SingularityGenerator";

export const LabEffectEntityVariant = 579;

export const enum EffectEntitySubtype {
  KINETICIMPACTOR = 12,
  BLADEDISC = 13,
  SINGULARITYGENERATOR = 14,
  CYBERGHOST = 15,
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
  }
}
