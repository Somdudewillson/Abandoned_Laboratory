import * as FAMILIAR_CYBOB from "../entities/familiars/familiar_Cybob";

export const LabFamiliarEntityVariant = 5045;

export const enum FamiliarEntitySubtype {
  CYBOB = 23,
}

export function update(familiar: EntityFamiliar): void {
  switch (familiar.SubType) {
    default:
      break;
    case FamiliarEntitySubtype.CYBOB:
      FAMILIAR_CYBOB.update(familiar);
      break;
  }
}

export function collide(
  familiar: EntityFamiliar,
  _collider: Entity,
  _low: boolean,
): boolean | null {
  switch (familiar.SubType) {
    default:
    case FamiliarEntitySubtype.CYBOB:
      return null;
  }
}
