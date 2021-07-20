declare const EID: ExternalItemDescriptions;

declare type EIDDescriptionObj = {
  ItemType: int;
  ItemVariant: int;
  RealID: int;
  ID: int;
  fullItemString: string;
  Name: string;
  Description: string;
  Transformation: string;
};
declare type EIDInlineIcon = [
  Animationname: string,
  Frame: int,
  Width: int,
  Height: int,
  /** [Default: -1] */
  LeftOffset?: int,
  /** [Default: 0] */
  TopOffset?: int,
  /** [Default: EID.InlineIconSprite] */
  SpriteObject?: Sprite,
];

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
   * Define a callback to let it be called when interpreting the color-markup. define a `KColor` otherwise for a simple color change */
  addColor(
    shortcut: string,
    kColor: KColor,
    callback?: (color: KColor) => KColor,
  ): void;

  /** Overrides all potentially displayed texts and permanently displays the given texts. Can be turned off again using
   * {@link EID.hidePermanentText EID:hidePermanentText()} */
  displayPermanentText(descriptionObject: EIDDescriptionObj): void;
  /** Hides permanently displayed text objects if they exist. */
  hidePermanentText(): void;

  /** function to turn entity type names into actual ingame ID.Variant pairs */
  getIDVariantString(typeName: string): string;
  /** function to turn entity type and variants into their EID table-name */
  getTableName(Type: int, Variant: int, SubType: int): string;

  /** Loads a given font from a given file path and use it to render text */
  loadFont(fontFileName: string): boolean;

  /** Returns if EID is displaying text right now */
  isDisplayingText(): boolean;
  /** Returns true, if curse of blind is active */
  hasCurseBlind(): boolean;

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

  /** Appends a given string to the description of a given Description object */
  appendToDescription(descObj: EIDDescriptionObj, appendString: string): void;

  /** returns the description object of the specified entity
   *
   * falls back to english if the objID isn't available */
  getDescriptionObj(Type: int, Variant: int, SubType: int): EIDDescriptionObj;
  /** returns description Object from the legacy mod descriptions if they exist */
  getLegacyModDescription(
    Type: int,
    Variant: int,
    SubType: int,
  ): { 1: string; 2: string; 3: string };
  /** returns the specified object table in the current language.
   *
   * falls back to english if it doesn't exist */
  getDescriptionEntry(objTable: string, objID?: string): EIDDescriptionObj;
  /** returns the description data table in the current language related to a given id, variant and subtype
   *
   * falls back to english if it doesn't exist */
  getDescriptionData(Type: int, Variant: int, SubType: int): EIDDescriptionObj;

  /** Returns an adjusted SubType id for special cases like Horse Pills and Golden Trinkets */
  getAdjustedSubtype(Type: int, Variant: int, SubType: int): int;
  /** Get the transformation uniqueName / ID of a given entity
   *
   * Example: EID:getTransformation(5,100,34)  will return "12" which is the id for Bookworm */
  getTransformation(Type: int, Variant: int, SubType: int): string;

  /** Get the name of the given transformation by its uniqueName / ID
   *
   * (Note: this function might be broken) */
  getTransformationName(id: string): string;
  /** tries to get the ingame name of an item based on its ID */
  getObjectName(Type: int, Variant: int, SubType: int): string;
  /** tries to get the ingame description of an object, based on their description in the XML files */
  getXMLDescription(
    Type: int,
    Variant: int,
    SubType: int,
  ): string | "(No Description available)";
  /** check if an entity is part of the describable entities */
  hasDescription(entity: Entity): boolean;

  /** Replaces shorthand-representations of a character with the internal reference */
  replaceShortMarkupStrings(text: string): string;
  /** Generates a string with the defined pixel-length using a custom 1px wide character
   * This will only work for this specific custom font */
  generatePlaceholderString(length: int): string;
  /** Returns the `EIDInlineIcon` object of a given Iconstring
   *
   * can be used to validate an iconstring */
  getIcon(str: string): EIDInlineIcon;
  /** Tries to read special markup used to generate icons for all Collectibles/Trinkets and the default Cards/Pills
   * @returns an `EIDInlineIcon` Object or `null` if no parsing was possible */
  createItemIconObject(str: string): EIDInlineIcon | null;
  /** Returns the icon for a given transformation name or ID */
  getTransformationIcon(str: string): EIDInlineIcon;

  /** Returns the width of a given string in Pixels */
  getStrWidth(str: string): int;
  /** Searches thru the given string and replaces Icon placeholders with icons.
   * Returns 2 values:
   *
   * - the string without the placeholders but with an accurate space between lines.
   * - an array of tables containing each Inline Sprite and the preceding text width */
  filterIconMarkup(
    text: string,
    textPosX?: int,
    textPosY?: int,
  ): LuaMultiReturn<[string, Array<[EIDInlineIcon, int]>]>;
  /** renders a list of given inline sprite objects returned by the
   * {@link EID.filterIconMarkup EID:filterIconMarkup()} function
   *
   * Table entry format: {`EIDInlineIcon` Object, Width of text preceding the icon} */
  renderInlineIcons(
    spriteTable: Array<[EIDInlineIcon, int]>,
    posX: int,
    posY: int,
  ): void;
  /** helper function to render Icons in specific EID settins */
  renderIcon(spriteObj: Sprite, posX: int, posY: int): void;
  /** Returns the icon used for the bulletpoint. It will look at the first word in the given string. */
  handleBulletpointIcon(text: string): EIDInlineIcon;
  /** Gets a `KColor` from a Markup-string (example Input: "{{ColorText}}")
   *
   * @returns the `KColor` object and a `boolean` value indicating if the given string was a color markup or not */
  getColor(str: string, baseKColor: KColor): LuaMultiReturn<[KColor, boolean]>;
  /** Filters a given string and looks for `KColor` markup. Splits the text into subsections limited by them.
   *
   * @returns: Table of subsections of the text, their respective `KColor`, and the width of the subsection */
  filterColorMarkup(
    text: string,
    baseKColor: KColor,
  ): Array<[string, KColor, int]>;

  /** Fits a given string to a specific width
   * @returns the string as a table of lines */
  fitTextToWidth(str: string, textboxWidth: number): string[];
  /** Renders a given string using the EID Custom font. This will also apply any markup and render icons
   * Needs to be called in a render Callback
   * @returns the last used `KColor` */
  renderString(
    str: string,
    position: Vector,
    scale: Vector,
    kcolor: KColor,
  ): KColor;

  /** Adds Description object modifiers.
   * Used for altering descriptions. Example: Spindown dice, Tarot Cloth,...
   * @param condition function that returns `true` if `callback` should be called on the given description string
   * @param callback function that returns a modified version of the given description string */
  addDescriptionModifier(
    modifierName: string,
    condition: (testDescription: string) => boolean,
    callback: (oldDescription: string) => string,
  ): void;
  /** Removes a Description object modifier
   * Used for altering descriptions. Example: Spindown dice, Tarot Cloth,... */
  removeDescriptionModifier(modifierName: string): void;

  /** Interpolates between 2 KColors with a given fraction. */
  interpolateColors(kColor1: KColor, kColor2: KColor, fraction: number): KColor;

  /** Converts a given CollectibleID into the respective Spindown dice result */
  getSpindownResult(collectibleID: int): int;
  /** Converts a given table into a string containing the crafting icons of the table
   *
   * Example input: `{1,2,3,4,5,6,7,8}`
   *
   * Result: `"{{Crafting8}}{{Crafting7}}{{Crafting6}}{{Crafting5}}{{Crafting4}}{{Crafting3}}{{Crafting2}}{{Crafting1}}"`
   *
   * Prefer {@link EID.tableToCraftingIconsMerged tableToCraftingIconsMerged()}, due to improved render performance. */
  tableToCraftingIconsFull(craftTable: int[]): string;
  /** Converts a given table into a string containing the crafting icons of the table, which are also grouped to reduce render lag
   *
   * Example input: `{1,1,1,2,2,3,3,3}`
   *
   * Result: `"3{{Crafting3}}2{{Crafting2}}3{{Crafting1}}"` */
  tableToCraftingIconsMerged(craftTable: int[]): string;

  /** Gets the size of the screen */
  GetScreenSize(): Vector;

  /** Creates a copy of a `KColor` object. This prevents overwriting existing */
  copyKColor(colorObj: KColor): KColor;
  /** Compares two KColors. Returns true if they are equal */
  areColorsEqual(c1: KColor, c2: KColor): boolean;
  /** Get `KColor` object of "Entity Name" texts */
  getNameColor(): KColor;
  /** Get `KColor` object of "Description" texts */
  getTextColor(): KColor;
  /** Get `KColor` object of "Transformation" texts */
  getTransformationColor(): KColor;
  /** Get `KColor` object of "Error" texts */
  getErrorColor(): KColor;
}
