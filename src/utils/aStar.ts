import { parseFloat } from "./extMath";
import { MinPriorityQueue } from "./priorityQueue";

export type FlatVector = string;
export function flattenVector(inVec: Vector): FlatVector {
  return `${inVec.X},${inVec.Y}`;
}
export function expandVector(inVec: FlatVector): Vector {
  const splitVals = inVec.split(",", 2);
  return Vector(parseFloat(splitVals[0]), parseFloat(splitVals[1]));
}

function reconstructPath(
  cameFrom: Map<FlatVector, FlatVector>,
  current: FlatVector,
): Vector[] {
  const fullPath = [expandVector(current)];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current)!;
    fullPath.push(expandVector(current));
  }

  return fullPath;
}

/** A* Pathfinder
 * @param heuristic `heuristic(current, goal)` estimates the distance between current and goal.
 * */
export function findAStarPath(
  startVec: Vector,
  goalVec: Vector,
  heuristic: (current: Vector, goal: Vector) => number,
  getNeighbors: (current: FlatVector, goal: FlatVector) => Vector[],
): Vector[] | false {
  const start = flattenVector(startVec);
  const goal = flattenVector(goalVec);
  // Isaac.DebugString(`\tPathing initiated from (${start}) to (${goal}).`);

  // The set of discovered nodes that may need to be (re-)expanded.
  // Initially, only the start node is known.
  // This is usually implemented as a min-heap or priority queue rather than a hash-set.
  const openSet = new MinPriorityQueue<FlatVector>();
  openSet.insert(start, heuristic(startVec, goalVec));

  // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start
  // to n currently known.
  const cameFrom = new Map<FlatVector, FlatVector>();

  // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
  const gScore = new Map<FlatVector, number>();
  gScore.set(start, math.maxinteger);

  // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
  // how short a path from start to finish can be if it goes through n.
  const fScore = new Map<FlatVector, number>();
  fScore.set(start, heuristic(startVec, goalVec));

  while (!openSet.isEmpty()) {
    // This operation can occur in O(1) time if openSet is a min-heap or a priority queue
    const current = openSet.pop()!;
    if (current === goal) {
      // Isaac.DebugString("\tPath to goal found.");
      return reconstructPath(cameFrom, current);
    }
    const currentVec = expandVector(current);

    const currentGScore = gScore.get(current)!;
    for (const neighbor of getNeighbors(current, goal)) {
      const flatNeighbor = flattenVector(neighbor);

      // neighborGScore is the distance from start to the neighbor through current
      const neighborGScore = currentGScore + heuristic(currentVec, neighbor);
      if (
        !gScore.has(flatNeighbor) ||
        neighborGScore < gScore.get(flatNeighbor)!
      ) {
        // This path to neighbor is better than any previous one. Record it!
        cameFrom.set(flatNeighbor, current);
        gScore.set(flatNeighbor, neighborGScore);
        fScore.set(flatNeighbor, neighborGScore + heuristic(neighbor, goalVec));
        if (!openSet.has(flatNeighbor)) {
          openSet.insert(flatNeighbor, neighborGScore);
        }
      }
    }
  }

  // Open set is empty but goal was never reached
  // Isaac.DebugString("\tNo path to goal found.");
  return false;
}

// Distance functions, provided for convenience
export function manhattanDist(current: Vector, goal: Vector): number {
  return Math.abs(current.X - goal.X) + Math.abs(current.Y - goal.Y);
}
export function chebyshevDist(current: Vector, goal: Vector): number {
  return Math.max(Math.abs(current.X - goal.X), Math.abs(current.Y - goal.Y));
}
export function euclideanDistSq(current: Vector, goal: Vector): number {
  return current.DistanceSquared(goal);
}
export function euclideanDist(current: Vector, goal: Vector): number {
  return current.Distance(goal);
}
