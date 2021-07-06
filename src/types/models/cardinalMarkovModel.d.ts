/** @noResolution */
declare module "models/CardinalMarkovModel" {
  export const Model: LuaTable<string, LuaTable<number, number>>;
  export const Context: Array<{ x: int; y: int }>;
}
