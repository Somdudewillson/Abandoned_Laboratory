export {};
declare type MCMCategoryID = int;
declare type MCMSubcategoryID = int;

declare interface MCMCategoryData {
  /** The name of the category */
  Name: string | undefined;
  /** The description of the category */
  Info: string | undefined;
  /** Marks the category as outdated */
  IsOld: boolean | undefined;
}
declare interface MCMSubcategoryData {
  /** The name of the subcategory */
  Name: string | undefined;
  /** The description of the subcategory */
  Info: string | undefined;
}
declare interface MCMSettingData<T> {
  /** The type of the setting, see {@link ModConfigMenu.OptionType OptionType} for more information */
  Type: ModConfigMenu.OptionType;
  /** The identifier for the setting */
  Attribute: string | undefined;
  /** The default value for the setting */
  Default: T | undefined | null;
  /** A function that returns the current value of the setting */
  CurrentSetting: (() => T) | T | undefined;
  /** The minimum value of numeric settings */
  Minimum: number | undefined;
  /** The maximum value of numeric settings */
  Maximum: number | undefined;
  /** Increment amount of numeric settings */
  modifyBy: number | undefined;
  /** A function that returns a `string` of how the setting will display in the settings menu */
  Display:
    | ((
        cursorIsAtThisOption: boolean,
        configMenuInOptions: boolean,
        lastOptionPos: Vector,
      ) => string)
    | undefined;
  /** A function that is called whenever the setting is changed (can be used to save your settings for example) */
  OnChange: ((newValue: T) => void) | undefined;
  /** A table of strings that's used as the information for the setting */
  Info: string[] | undefined;
  /** The colour of the setting */
  Color: Color | undefined;
  /** If the cursor is allowed to select this. */
  NoCursorHere: boolean;
}

declare global {
  /** @noSelf */
  namespace ModConfigMenu {
    const enum OptionType {
      /** Plain text. */
      TEXT = 1,
      /** A paragraph-type gap rendered in the menu. */
      SPACE = 2,
      /** A slider-bar for numeric values. */
      SCROLL = 3,
      /** A boolean (`true` or `false`). */
      BOOLEAN = 4,
      /** A numeric value. */
      NUMBER = 5,
      /** A keybind for keyboards. */
      KEYBIND_KEYBOARD = 6,
      /** A keybind for controllers. */
      KEYBIND_CONTROLLER = 7,
      /** Heading-style text. */
      TITLE = 8,
    }

    // ----- Category Functions -----

    /** Returns the category ID based off of the `categoryName` provided.
     *
     * Returns `null` if not a valid category.
     */
    function GetCategoryIDByName(
      categoryName: string | MCMCategoryID,
    ): MCMCategoryID | null;
    /** Updates a category with the supplied data. */
    function UpdateCategory(
      categoryName: string | MCMCategoryID,
      dataTable: MCMCategoryData,
    ): void;
    /** Changes category info. */
    function SetCategoryInfo(
      categoryName: string | MCMCategoryID,
      info: string,
    ): void;
    /** Removes a category.
     * @returns `true` if a category was removed, `false` otherwise.
     */
    function RemoveCategory(categoryName: string | MCMCategoryID): boolean;

    // ----- Subcategory Functions -----

    /** Returns the subcategory ID based off of the `categoryName` & `subcategoryName` provided.
     *
     * Returns `null` if not a valid subcategory.
     */
    function GetSubcategoryIDByName(
      categoryName: string | MCMCategoryID,
      subcategoryName: string | MCMSubcategoryID,
    ): MCMSubcategoryID | null;
    /** Updates a subcategory with the supplied data. */
    function UpdateSubcategory(
      categoryName: string | MCMCategoryID,
      subcategoryName: string | MCMSubcategoryID,
      dataTable: MCMSubcategoryData,
    ): void;
    /** Removes a subcategory.
     * @returns `true` if a subcategory was removed, `false` otherwise.
     */
    function RemoveSubcategory(
      categoryName: string | MCMCategoryID,
      subcategoryName: string | MCMSubcategoryID,
    ): boolean;

    // ----- Setting Functions -----

    /** Adds a new setting to the supplied category and subcategory with the provided data. */
    function AddSetting(
      categoryName: string | MCMCategoryID,
      subcategoryName: string | MCMSubcategoryID | null,
      settingTable: MCMSettingData<unknown>,
    ): MCMSettingData<unknown>;
    /** Adds a new setting to the supplied category with the provided data. */
    function AddSetting(
      categoryName: string | MCMCategoryID,
      settingTable: MCMSettingData<unknown>,
    ): MCMSettingData<unknown>;

    /** Adds a new text entry to the supplied category and subcategory with the provided data. */
    function AddText(
      categoryName: string | MCMCategoryID,
      subcategoryName: string | MCMSubcategoryID | null,
      text: string,
      color: Color,
    ): MCMSettingData<undefined>;
    /** Adds a new text entry to the supplied category with the provided data. */
    function AddText(
      categoryName: string | MCMCategoryID,
      text: string,
      color: Color,
    ): MCMSettingData<unknown>;
    /** Adds a new title entry to the supplied category and subcategory with the provided data. */
    function AddTitle(
      categoryName: string | MCMCategoryID,
      subcategoryName: string | MCMSubcategoryID | null,
      text: string,
      color: Color,
    ): MCMSettingData<undefined>;
    /** Adds a new title entry to the supplied category with the provided data. */
    function AddTitle(
      categoryName: string | MCMCategoryID,
      text: string,
      color: Color,
    ): MCMSettingData<undefined>;
    /** Adds a new spacer to the supplied category and subcategory. */
    function AddSpace(
      categoryName: string | MCMCategoryID,
      subcategoryName?: string | MCMSubcategoryID,
    ): MCMSettingData<undefined>;
    /** Create a setting without using a table.
     * @param configTableAttribute the name of the setting.
     * @param displayDevice if the keybind type should be added to the display text.
     * @param displayValueProxies table containing possible values for the settings and a `string` to display for that value.
     */
    function SimpleAddSetting(
      settingType: OptionType,
      categoryName: string,
      subcategoryName: string,
      configTableAttribute: string,
      minValue: number | null,
      maxValue: number | null,
      modifyBy: number | null,
      defaultValue: unknown | null,
      displayText: string | null,
      displayValueProxies: LuaTable<AnyNotNil, string> | null,
      displayDevice: boolean,
      info: string[],
      color: Color | null,
      functionName?: string | null,
    ): void;

    // TODO add the rest of MCM's functions
  }
}
