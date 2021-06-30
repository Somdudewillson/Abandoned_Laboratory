import { EntityToken } from "./tokenizer";

export type ModelWrapper = LuaTable<string, LuaTable<number, number>>;

export function getfromModel(
  key: string,
  model: ModelWrapper,
): Array<{ token: EntityToken; weight: float }> | null {
  const result: Array<{ token: EntityToken; weight: float }> = [];

  const entrySet = model.get(key);
  if (entrySet == null) {
    return null;
  }

  for (const [entryToken, entryWeight] of pairs(entrySet)) {
    result.push({ token: entryToken, weight: entryWeight });
  }

  return result;
}
