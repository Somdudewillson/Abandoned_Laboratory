import { EntityToken } from "./tokenizer";

export interface MarkovWrapper {
  Model: LuaTable<string, LuaTable<number, number>>;
  Context: Array<{ x: int; y: int }>;
}

export function getFromModel(
  modelData: MarkovWrapper,
  key: string,
): Array<{ token: EntityToken; weight: float }> | null {
  const result: Array<{ token: EntityToken; weight: float }> = [];

  const entrySet = modelData.Model.get(key);
  if (entrySet == null) {
    return null;
  }

  for (const [entryToken, entryWeight] of pairs(entrySet)) {
    result.push({ token: entryToken, weight: entryWeight });
  }

  return result;
}
