/** @noResolution */
declare module "models/FlexMarkovModel" {
  export const Model: LuaTable<string, LuaTable<number, number>>;
  export const Context: Array<{ x: int; y: int }>;
}
