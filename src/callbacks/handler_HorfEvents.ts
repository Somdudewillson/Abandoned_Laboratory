import { updatePlasmaFloater } from "../entities/monsters/plasmaFloater";

export const enum HorfEntityVariant {
  PLASMA_FLOATER = 87,
}

export function update(self: EntityNPC): boolean | void {
  switch (self.Variant) {
    case HorfEntityVariant.PLASMA_FLOATER:
      return updatePlasmaFloater(self);
    default:
  }
}
