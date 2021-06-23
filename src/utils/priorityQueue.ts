interface Node<T> {
  priority: number;
  value: T;
}

export class MinPriorityQueue<T> {
  heap: Array<Node<T>> = [];
  heapSet = new Set<T>();

  // -----Tree Navigation Methods-----
  private static parent(index: int): int {
    return Math.floor((index - 1) / 2);
  }

  private static left(index: int): int {
    return 2 * index + 1;
  }

  private static right(index: int): int {
    return 2 * index + 2;
  }

  private hasLeft(index: int): boolean {
    return MinPriorityQueue.left(index) < this.size();
  }

  private hasRight(index: int): boolean {
    return MinPriorityQueue.right(index) < this.size();
  }

  private swap(a: int, b: int): void {
    const tmp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = tmp;
  }

  // -----External methods-----
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  peek(): null | T {
    return this.isEmpty() ? null : this.heap[0].value;
  }

  size(): int {
    return this.heap.length;
  }

  has(item: T): boolean {
    return this.heapSet.has(item);
  }

  insert(item: T, itemPriority: number): void {
    this.heap.push({ priority: itemPriority, value: item });
    this.heapSet.add(item);

    let curIndex = this.size() - 1;
    while (curIndex > 0) {
      const parentIndex = MinPriorityQueue.parent(curIndex);
      if (this.heap[parentIndex].priority <= this.heap[curIndex].priority) {
        break;
      }

      this.swap(curIndex, parentIndex);
      curIndex = parentIndex;
    }
  }

  pop(): T | null {
    if (this.isEmpty()) return null;

    this.swap(0, this.heap.length - 1);
    const item = this.heap.pop()!;
    this.heapSet.delete(item.value);

    let current = 0;
    while (this.hasLeft(current)) {
      let smallerChild = MinPriorityQueue.left(current);
      if (
        this.hasRight(current) &&
        this.heap[MinPriorityQueue.right(current)].priority <
          this.heap[smallerChild].priority
      ) {
        smallerChild = MinPriorityQueue.right(current);
      }

      if (this.heap[smallerChild].priority > this.heap[current].priority) {
        break;
      }

      this.swap(current, smallerChild);
      current = smallerChild;
    }

    return item.value;
  }
}