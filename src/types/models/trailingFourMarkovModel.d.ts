/* eslint-disable prettier/prettier */
declare namespace TrailingFourMarkovModel {
  export const Model: LuaTable<string, LuaTable<number, number>>;
  export const Context: Array<{ x: int; y: int }>;
}
