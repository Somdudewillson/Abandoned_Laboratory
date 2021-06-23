import { MinPriorityQueue } from "./priorityQueue";

function reconstructPath(
  cameFrom: Map<Vector, Vector>,
  current: Vector,
): Vector[] {
  const fullPath = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current)!;
    fullPath.push(current);
  }

  return fullPath;
}

/** A* Pathfinder
 * @param heuristic `heuristic(current, goal)` estimates the distance between current and goal.
 * */
export function findAStarPath(
  start: Vector,
  goal: Vector,
  heuristic: (current: Vector, goal: Vector) => number,
  getNeighbors: (current: Vector) => Vector[],
): Vector[] | false {
  // The set of discovered nodes that may need to be (re-)expanded.
  // Initially, only the start node is known.
  // This is usually implemented as a min-heap or priority queue rather than a hash-set.
  const openSet = new MinPriorityQueue<Vector>();

  // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start
  // to n currently known.
  const cameFrom = new Map<Vector, Vector>();

  // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
  const gScore = new Map<Vector, number>();
  gScore.set(start, math.maxinteger);

  // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
  // how short a path from start to finish can be if it goes through n.
  const fScore = new Map<Vector, number>();
  fScore.set(start, heuristic(start, goal));

  while (!openSet.isEmpty()) {
    // This operation can occur in O(1) time if openSet is a min-heap or a priority queue
    const current = openSet.pop()!;
    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }

    const currentGScore = gScore.get(current)!;
    for (const neighbor of getNeighbors(current)) {
      // neighborGScore is the distance from start to the neighbor through current
      const neighborGScore = currentGScore + heuristic(current, neighbor);
      if (!gScore.has(neighbor) || neighborGScore < gScore.get(neighbor)!) {
        // This path to neighbor is better than any previous one. Record it!
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, neighborGScore);
        fScore.set(neighbor, neighborGScore + heuristic(neighbor, goal));
        if (!openSet.has(neighbor)) {
          openSet.insert(neighbor, neighborGScore);
        }
      }
    }
  }

  // Open set is empty but goal was never reached
  return false;
}
