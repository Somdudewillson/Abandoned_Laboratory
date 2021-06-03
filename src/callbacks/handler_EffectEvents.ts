import * as EFFECT_KINETICIMPACTOR from "../entities/effects/effect_KineticImpactor";

export const enum EffectEntityVariant {
  STATICEFFECT = 579,
}

export const enum EffectEntitySubtype {
  KINETICIMPACTOR = 12,
}

export function update(self: EntityEffect): void {
  if (self.Variant !== EffectEntityVariant.STATICEFFECT) {
    return;
  }
  switch (self.SubType) {
    default:
      break;
    case EffectEntitySubtype.KINETICIMPACTOR:
      EFFECT_KINETICIMPACTOR.update(self);
      break;
  }
}
