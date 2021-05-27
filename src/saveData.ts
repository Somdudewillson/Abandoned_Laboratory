import * as json from "json";

const enum SaveRoot {
  DATA_GLOBAL = "global",
  DATA_PLAYER1 = "player1",
  DATA_PLAYER2 = "player2",
  DATA_PLAYER3 = "player3",
  DATA_PLAYER4 = "player4",
}

export const enum SaveType {
  PERSISTENT = "persistent",
  PER_RUN = "perRun",
  PER_FLOOR = "perFloor",
  PER_ROOM = "perRoom",
}

const ROOTS = [
  SaveRoot.DATA_GLOBAL,
  SaveRoot.DATA_PLAYER1,
  SaveRoot.DATA_PLAYER2,
  SaveRoot.DATA_PLAYER3,
  SaveRoot.DATA_PLAYER4,
];

const SAVE_DATA = new Map([
  [
    "global",
    new Map([
      ["persistent", new Map<string, unknown>()],
      ["perRun", new Map<string, unknown>()],
      ["perFloor", new Map<string, unknown>()],
      ["perRoom", new Map<string, unknown>()],
    ]),
  ],
  [
    "player1",
    new Map([
      ["perRun", new Map<string, unknown>()],
      ["perFloor", new Map<string, unknown>()],
      ["perRoom", new Map<string, unknown>()],
    ]),
  ],
  [
    "player2",
    new Map([
      ["perRun", new Map<string, unknown>()],
      ["perFloor", new Map<string, unknown>()],
      ["perRoom", new Map<string, unknown>()],
    ]),
  ],
  [
    "player3",
    new Map([
      ["perRun", new Map<string, unknown>()],
      ["perFloor", new Map<string, unknown>()],
      ["perRoom", new Map<string, unknown>()],
    ]),
  ],
  [
    "player4",
    new Map([
      ["perRun", new Map<string, unknown>()],
      ["perFloor", new Map<string, unknown>()],
      ["perRoom", new Map<string, unknown>()],
    ]),
  ],
]);

export function saveGlobalData(
  type: SaveType,
  key: string,
  value: unknown,
): void {
  SAVE_DATA.get(SaveRoot.DATA_GLOBAL)!.get(type)!.set(key, value);
}

export function getGlobalData(type: SaveType, key: string): unknown {
  return SAVE_DATA.get(SaveRoot.DATA_GLOBAL)!.get(type)!.get(key);
}

export function serialize(willContinue: boolean): string {
  // Erase non-persistent data
  if (!willContinue) {
    wipePerRun();
  }
  return json.encode(SAVE_DATA);
}

export function deserialize(data: string, isContinued: boolean): void {
  const decoded = json.decode(data) as Record<
    string,
    Map<string, Map<string, unknown>>
  >;

  for (const key of Object.keys(decoded)) {
    SAVE_DATA.set(key, decoded[key]);
  }

  if (!isContinued) {
    wipePerRun();
  }
}

// Data wipe functions

function wipePerRun() {
  for (const root of ROOTS) {
    SAVE_DATA.get(root)!.get(SaveType.PER_RUN)!.clear();
    SAVE_DATA.get(root)!.get(SaveType.PER_FLOOR)!.clear();
    SAVE_DATA.get(root)!.get(SaveType.PER_ROOM)!.clear();
  }
}

export function wipePerFloor(): void {
  for (const root of ROOTS) {
    SAVE_DATA.get(root)!.get(SaveType.PER_FLOOR)!.clear();
  }
}

export function wipePerRoom(): void {
  for (const root of ROOTS) {
    SAVE_DATA.get(root)!.get(SaveType.PER_ROOM)!.clear();
  }
}
