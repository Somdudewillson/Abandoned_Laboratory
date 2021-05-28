declare const EID: ExternalItemDescriptions;

declare class ExternalItemDescriptions {
  /** Adds a description for a collectible. Optional parameters: itemName, language */
  addCollectible(
    id: int,
    description: string,
    itemName?: string,
    language?: string,
  ): void;
  /** Adds a description for a trinket. Optional parameters: itemName, language */
  addTrinket(
    id: int,
    description: string,
    itemName?: string,
    language?: string,
  ): void;
  /** Adds a description for a card/rune. Optional parameters: itemName, language */
  addCard(
    id: int,
    description: string,
    itemName?: string,
    language?: string,
  ): void;
  /** Adds a description for a pilleffect id. Optional parameters: itemName, language */
  addPill(
    id: int,
    description: string,
    itemName?: string,
    language?: string,
  ): void;

  /** Adds a character specific description for the item "Birthright". Optional parameters: playerName, language */
  addBirthright(
    characterId: int,
    description: string,
    playerName?: string,
    language?: string,
  ): void;

  /** Creates a new transformation with a given unique name and a display name */
  createTransformation(
    uniqueName: string,
    displayName: string,
    language?: string,
  ): void;
  /** Assigns transformations to an entity (Adds to existing transformations)
   *
   * Valid target types: [collectible, trinket, card, pill, entity]
   *
   * When type = entity, targetIdentifier must be in the format "ID.Variant.subtype". for any other type, it can just be the id
   *
   * EXAMPLE: `EID.assignTransformation("collectible", 1, "My Transformation")` */
  assignTransformation(
    targetType: string,
    targetIdentifier: string | int,
    transformationString: string,
  ): void;
  /** Removes a transformation of an entity
   *
   * Valid target types: [collectible, trinket, card, pill, entity]
   *
   * When type = entity, targetIdentifier must be in the format "ID.Variant.subtype". for any other type, it can just be the id
   *
   * EXAMPLE: `EID.removeTransformation("collectible", 1, "My Transformation")` */
  removeTransformation(
    targetType: string,
    targetIdentifier: string | int,
    transformationString: string,
  ): void;

  /** Removes a given value from the string inside a table. Example: "1,2,3", removing 2 will return "1,3" */
  removeEntryFromString(
    sourceTable: never[] | Record<never, never>,
    entryKey: never,
    entryValue: string,
  ): void;

  /** Adds a description for a an Entity. Optional parameters: language
   *
   * When subtype is -1 or null, it will affect all subtypes of that entity */
  addEntity(
    id: int,
    variant: int,
    subtype: int | null,
    entityName: string,
    description: string,
    language?: string,
  ): void;

  /** Adds a new icon object with the shortcut defined in the "shortcut" variable (e.g. "{{shortcut}}" = your icon)
   *
   * Shortcuts are case Sensitive! Shortcuts can be overridden with this function to allow for full control over everything
   *
   * Setting "animationFrame" to -1 will play the animation. The spriteObject needs to be of class Sprite() and have an .anm2 loaded
   *
   * Default values: leftOffset= -1 , topOffset = 0 */
  addIcon(
    shortcut: string,
    animationName: string,
    animationFrame: int,
    width: int,
    height: int,
    leftOffset: float | null,
    topOffset: float | null,
    spriteObject: Sprite,
  ): void;
  /** Adds a new color object with the shortcut defined in the "shortcut" variable (e.g. "{{shortcut}}" = your color)
   *
   * Shortcuts are case Sensitive! Shortcuts can be overridden with this function to allow for full control over everything
   *
   * Define a callback to let it be called when interpreting the color-markup. define a kColor otherwise for a simple color change */
  addColor(
    shortcut: string,
    kColor: KColor,
    callback?: (color: KColor) => KColor,
  ): void;

  /** Overrides all potentially displayed texts and permanently displays the given texts. Can be turned off again using the `EID.hidePermanentText()` function */
  displayPermanentText(descriptionObject: {
    ItemType: int;
    ItemVariant: int;
    RealID: int;
    ID: int;
    fullItemString: string;
    Name: string;
    Description: Record<string, unknown>;
    Transformation: string;
  }): void;
  /** Hides permanently displayed text objects if they exist. */
  hidePermanentText(): void;

  /** function to turn entity type names into actual ingame ID.Variant pairs */
  getIDVariantString(typeName: string): string;
  /** function to turn entity type and variants into their EID table-name */
  getTableName(Type: int, Variant: int, SubType: int): string;

  /** Loads a given font from a given file path and use it to render text */
  loadFont(fontFileName: string): boolean;

  /** Returns true, if curse of blind is active */
  hasCurseBlind(): boolean;
  /** Returns if EID is displaying text right now */
  isDisplayingText(): boolean;

  /** returns the current text position */
  getTextPosition(): Vector;
  /** Adds a text position modifier Vector, which will be applied to the text position variable
   *
   * Useful to add small offsets. For example: for schoolbag HUD */
  addTextPosModifier(identifier: string, modifierVector: Vector): void;
  /** Removes a text position modifier Vector
   *
   * Useful to remove small offsets. For example: for schoolbag HUD */
  removeTextPosModifier(identifier: string): void;
  /** Changes the initial position of all eid descriptions
   *
   * Useful to totally alter and override the current initial Overlay position */
  alterTextPos(newPosVector: Vector): void;

  /** returns the entity that is currently described. returns last described entity if currently not displaying text */
  getLastDescribedEntity(): Entity;

  /** returns the description object of the specified entity
   * falls back to english if the objID isn't available */
  getDescriptionObj(
    Type: int,
    Variant: int,
    SubType: int,
  ): {
    ItemType: int;
    ItemVariant: int;
    RealID: int;
    ID: int;
    fullItemString: string;
    Name: string;
    Description: Record<string, unknown>;
    Transformation: string;
  };
  /** returns description Object from the legacy mod descriptions if they exist */
  getLegacyModDescription(
    Type: int,
    Variant: int,
    SubType: int,
  ): { 1: string; 2: string; 3: string };
}
