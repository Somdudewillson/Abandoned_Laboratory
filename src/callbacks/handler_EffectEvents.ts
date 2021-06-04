import * as EFFECT_BLADEDISC from "../entities/effects/effect_BladeDisc";
import * as EFFECT_KINETICIMPACTOR from "../entities/effects/effect_KineticImpactor";

export const LabEffectEntityVariant = 579;

export const enum EffectEntitySubtype {
  KINETICIMPACTOR = 12,
  BLADEDISC = 13,
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
  }
}
