/** @noResolution */
declare module "models/ChebyschevMarkovModel" {
  export const Model: LuaTable<string, LuaTable<number, number>>;
  export const Context: Array<{ x: int; y: int }>;
}
