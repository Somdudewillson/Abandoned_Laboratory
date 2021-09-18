import {
  expandVector,
  FlatGridVector,
  flattenVector,
  shiftFlat,
} from "../../utils/flatGridVector";
import { isValidGridPos, SymmetryType } from "../../utils/utils";
import { Accessibility, GeneratedRoom } from "./generatedRoom";

const PIT_THRESHOLD = 2;

function getValidSpots(symmetry: SymmetryType, room: GeneratedRoom): Vector[] {
  const options: Vector[] = [];

  let xMax = -1;
  let yMax = -1;

  for (let x = 0; x <= 25; x++) {
    for (let y = 0; y <= 13; y++) {
      const option = Vector(x, y);

      if (isValidGridPos(option, room.shape)) {
        xMax = Math.max(xMax, option.X);
        yMax = Math.max(yMax, option.Y);

        if (room.isPosEmpty(flattenVector(option))) {
          continue;
        }
        options.push(option);
      }
    }
  }

  let optionsMirrored: Vector[] = options;
  if (symmetry !== SymmetryType.NONE) {
    optionsMirrored = [];

    for (const posOption of options) {
      switch (symmetry) {
        default:
        case SymmetryType.HORIZONTAL:
          switch (room.shape) {
            default:
              if (posOption.Y <= yMax / 2) {
                optionsMirrored.push(posOption);
              }
              break;
            case RoomShape.ROOMSHAPE_LTL:
            case RoomShape.ROOMSHAPE_LTR:
              if (posOption.Y >= yMax / 2) {
                optionsMirrored.push(posOption);
              }
              break;
          }
          break;
        case SymmetryType.VERTICAL:
          switch (room.shape) {
            default:
              if (posOption.X <= xMax / 2) {
                optionsMirrored.push(posOption);
              }
              break;
            case RoomShape.ROOMSHAPE_LTL:
            case RoomShape.ROOMSHAPE_LBL:
              if (posOption.X >= xMax / 2) {
                optionsMirrored.push(posOption);
              }
              break;
          }
          break;
        case SymmetryType.QUAD:
          switch (room.shape) {
            default:
              if (posOption.Y <= yMax / 2 && posOption.X <= xMax / 2) {
                optionsMirrored.push(posOption);
              }
              break;
            case RoomShape.ROOMSHAPE_LTL:
              if (posOption.Y >= yMax / 2 && posOption.X >= xMax / 2) {
                optionsMirrored.push(posOption);
              }
              break;
          }
          break;
      }
    }
  }

  return optionsMirrored;
}

export function cleanLayout(
  rand: RNG,
  room: GeneratedRoom,
  symmetry: SymmetryType = SymmetryType.NONE,
): void {
  const spots = getValidSpots(symmetry, room);

  for (const spot of spots) {
    const flatSpot = flattenVector(spot);
    if (room.isPosEmpty(flatSpot)) {
      continue;
    }
    const grid = room.getGridEntity(flatSpot)!;
    if (grid.ISDOOR) {
      continue;
    }
    const gridEnt = grid as LuaRoomEntity;

    switch (gridEnt[1].TYPE) {
      default:
        break;
      case GridEntityType.GRID_PIT:
        validatePitPos(flatSpot, room, symmetry, rand);
        break;
      case GridEntityType.GRID_SPIDERWEB:
      case GridEntityType.GRID_SPIKES:
      case GridEntityType.GRID_SPIKES_ONOFF:
        validateAccessiblity(flatSpot, room, symmetry, rand);
        break;
    }
  }
}

function validatePitPos(
  pos: FlatGridVector,
  room: GeneratedRoom,
  symmetry: SymmetryType,
  rand: RNG,
): void {
  const diagonalPos = [
    shiftFlat(pos, -1, -1),
    shiftFlat(pos, 1, -1),
    shiftFlat(pos, -1, 1),
    shiftFlat(pos, 1, 1),
  ];
  const cardinalPos = [
    shiftFlat(pos, -1, 0),
    shiftFlat(pos, 1, 0),
    shiftFlat(pos, 0, -1),
    shiftFlat(pos, 0, 1),
  ];

  // Check diagonally-adjacent grids
  let adjPits = 0;
  for (const diagonal of diagonalPos) {
    const grid = room.getGridEntity(diagonal);
    if (grid === undefined || grid.ISDOOR) {
      continue;
    }
    const gridEnt = grid as LuaRoomEntity;

    if (gridEnt[1].TYPE === GridEntityType.GRID_PIT) {
      adjPits++;
    }
  }
  if (adjPits >= PIT_THRESHOLD) {
    return;
  }

  // Check cardinally-adjacent grids
  let adjRock = 0;
  for (const cardinal of cardinalPos) {
    const grid = room.getGridEntity(cardinal);
    if (grid === undefined || grid.ISDOOR) {
      continue;
    }
    const gridType = (grid as LuaRoomEntity)[1].TYPE;

    if (
      gridType === GridEntityType.GRID_ROCK ||
      gridType === GridEntityType.GRID_ROCKB ||
      gridType === GridEntityType.GRID_ROCKT ||
      gridType === GridEntityType.GRID_ROCK_BOMB ||
      gridType === GridEntityType.GRID_ROCK_GOLD ||
      gridType === GridEntityType.GRID_ROCK_SPIKED ||
      gridType === GridEntityType.GRID_ROCK_SS
    ) {
      adjRock++;
    }
  }

  // Convert the grid
  if (rand.RandomFloat() < adjRock / 4) {
    room.createMirroredEntity(
      expandVector(pos),
      symmetry,
      GridEntityType.GRID_ROCK,
      0,
      0,
      1,
      true,
      true,
    );
  } else {
    room.removeMirroredGrid(expandVector(pos), symmetry);
  }
}

function validateAccessiblity(
  pos: FlatGridVector,
  room: GeneratedRoom,
  symmetry: SymmetryType,
  rand: RNG,
): void {
  if (room.getPosAccessibility(pos) === Accessibility.GROUND) {
    return;
  }

  const cardinalPos = [
    shiftFlat(pos, -1, 0),
    shiftFlat(pos, 1, 0),
    shiftFlat(pos, 0, -1),
    shiftFlat(pos, 0, 1),
  ];
  const transformOptions: GridEntityType[] = [];
  for (const cardinal of cardinalPos) {
    const grid = room.getGridEntity(cardinal);
    if (grid === undefined || grid.ISDOOR) {
      continue;
    }
    const gridType = (grid as LuaRoomEntity)[1].TYPE;

    switch (gridType) {
      default:
      case GridEntityType.GRID_ROCK:
      case GridEntityType.GRID_ROCKB:
      case GridEntityType.GRID_ROCKT:
      case GridEntityType.GRID_ROCK_BOMB:
      case GridEntityType.GRID_ROCK_GOLD:
      case GridEntityType.GRID_ROCK_SPIKED:
      case GridEntityType.GRID_ROCK_SS:
        transformOptions.push(GridEntityType.GRID_ROCK);
        break;
      case GridEntityType.GRID_SPIKES:
      case GridEntityType.GRID_SPIKES_ONOFF:
        transformOptions.push(GridEntityType.GRID_SPIKES);
        break;
      case GridEntityType.GRID_PIT:
        transformOptions.push(GridEntityType.GRID_PIT);
        break;
    }
  }

  room.createMirroredEntity(
    expandVector(pos),
    symmetry,
    transformOptions[rand.RandomInt(transformOptions.length)],
    0,
    0,
    1,
    true,
    true,
  );
}
