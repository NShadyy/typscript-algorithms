import { LinkedList } from '../linked-list/LinkedList';
import { LinkedListNode } from '../linked-list/LinkedListNode';

export class Stack<T> {
  private linkedList: LinkedList<T>;

  constructor() {
    this.linkedList = new LinkedList<T>();
  }

  isEmpty(): boolean {
    return !this.linkedList.head;
  }

  peek(): T {
    if (this.isEmpty()) {
      return null;
    }

    return this.linkedList.head.value;
  }

  push(value: T): void {
    this.linkedList.prepend(value);
  }

  pop(): T {
    const removedHead: LinkedListNode<T> = this.linkedList.deleteHead();

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
