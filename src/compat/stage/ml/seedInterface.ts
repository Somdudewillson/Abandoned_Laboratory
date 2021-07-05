import { FlatGridVector } from "../../../utils/flatGridVector";
import { EntityToken } from "./tokenizer";

export interface SeedWrapper {
  Model: LuaTable<string, LuaTable<number, number>>;
}

export function getFromModel(
  modelData: SeedWrapper,
  shape: RoomShape,
  flatPos: FlatGridVector,
): Array<{ token: EntityToken; weight: float }> | null {
  const result: Array<{ token: EntityToken; weight: float }> = [];

  const entrySet = modelData.Model.get(`${shape} ${math.floor(flatPos)}`);
  if (entrySet == null) {
    return null;
  }

  for (const [entryToken, entryWeight] of pairs(entrySet)) {
    result.push({ token: entryToken, weight: entryWeight });
  }

  return result;
}
