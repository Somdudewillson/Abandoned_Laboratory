import { shuffleArray } from "../../utils/extMath";
import {
  expandVector,
  FlatGridVector,
  flattenVector,
} from "../../utils/flatGridVector";
import { isValidFlatGridPos } from "../../utils/utils";
import { Accessibility, GeneratedRoom } from "./generatedRoom";

const groundPickupTable: int[] = [PickupVariant.PICKUP_COIN];
const flightPickupTable: int[] = [PickupVariant.PICKUP_KEY];

function getValidSpots(room: GeneratedRoom): FlatGridVector[] {
  const options: FlatGridVector[] = [];

  for (let x = 0; x <= 25; x++) {
    for (let y = 0; y <= 13; y++) {
      const flatOption = flattenVector(Vector(x, y));

      if (!isValidFlatGridPos(flatOption, room.shape)) {
        continue;
      }

      if (room.getPosAccessibility(flatOption) <= Accessibility.FLIGHT) {
        if (room.isPosEmpty(flatOption)) {
          options.push(flatOption);
        }
      }
    }
  }

  return options;
}

function fetchCostTable(access: Accessibility): int[] {
  if (access === Accessibility.FLIGHT) {
    return groundPickupTable;
  }
  if (access === Accessibility.NONE) {
    return flightPickupTable;
  }

  return [];
}

export function genPickups(rand: RNG, room: GeneratedRoom): void {
  let startTime = Isaac.GetTime();
  Isaac.DebugString("\t\tFetching valid pickup locations.");
  const possibleSpots = getValidSpots(room);
  Isaac.DebugString(
    `\t\t\tDone (${math.floor(Isaac.GetTime() - startTime)} ms).`,
  );
  Isaac.DebugString("\t\tShuffling pickup array.");
  if (possibleSpots.length > 1) {
    shuffleArray(possibleSpots, rand);
  }
  /* let pickupCount = randomInt(
    rand,
    Math.round(possibleSpots.length * 0.5),
    possibleSpots.length,
  ); */
  let pickupCount = possibleSpots.length;
  startTime = Isaac.GetTime();
  Isaac.DebugString(`\t\tTrying to spawn ${pickupCount} pickups.`);

  while (pickupCount > 0 && possibleSpots.length > 0) {
    const selectedSpot = possibleSpots.pop()!;
    const pickupOptions = fetchCostTable(
      room.getPosAccessibility(selectedSpot),
    );
    if (pickupOptions.length === 0) {
      continue;
    }
    const selectedPickup =
      pickupOptions[
        pickupOptions.length > 1 ? rand.RandomInt(pickupOptions.length) : 0
      ];

    room.createGridEntity(
      expandVector(selectedSpot),
      EntityType.ENTITY_PICKUP,
      selectedPickup,
      0,
      1,
      true,
      true,
    );
    pickupCount--;
  }
  Isaac.DebugString(
    `\t\t\tDone (${math.floor(Isaac.GetTime() - startTime)} ms).`,
  );
}
