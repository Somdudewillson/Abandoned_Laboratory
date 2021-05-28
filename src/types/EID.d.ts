declare const EID: ExternalItemDescriptions;

// We declare a TrueCoop class that has as many methods as we need
// (but for now we will only add one)
declare class ExternalItemDescriptions {
  addCollectible(
    id: int,
    description: string,
    itemName?: string,
    language?: string,
  ): void;
  addEntity(
    id: int,
    variant: int,
    subtype: int,
    entityName: string,
    description: string,
    language?: string,
  ): void;
}
