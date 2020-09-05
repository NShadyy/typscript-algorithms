import { LinkedList } from '../linked-list/LinkedList';
import { LinkedListNode } from '../linked-list/LinkedListNode';

export class Queue<T> {
  private linkedList: LinkedList<T>;

  constructor() {
    this.linkedList = new LinkedList<T>();
  }

  isEmpty(): boolean {
    return !this.linkedList.head;
  }

  peek(): T {
    if (!this.linkedList.head) {
      return null;
    }

    return this.linkedList.head.value;
  }

  enqueue(value: T) {
    this.linkedList.append(value);
  }

  dequeue(): T {
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  toArray(): T[] {
    return this.linkedList
      .toArray()
      .map((linkedListNode: LinkedListNode<T>) => linkedListNode.value);
  }

  toString(callback?: (value: T) => string): string {
    return this.linkedList.toString(callback);
  }
}
