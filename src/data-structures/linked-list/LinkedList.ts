import { Comparator } from '../../utils/Comparator';
import { LinkedListNode } from './LinkedListNode';

export class LinkedList<T> {
  public head: LinkedListNode<T>;
  public tail: LinkedListNode<T>;
  public comparator: Comparator<T>;

  constructor(comparatorFunction?: (a: T, b: T) => number) {
    this.head = null;
    this.tail = null;

    this.comparator = new Comparator<T>(comparatorFunction);
  }

  prepend(value: T): LinkedList<T> {
    const newNode = new LinkedListNode<T>(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: T): LinkedList<T> {
    const newNode = new LinkedListNode<T>(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  delete(value: T): LinkedListNode<T> {
    if (!this.head) {
      return null;
    }

    let deleteNode: LinkedListNode<T> = this.head;

    while (this.head && this.comparator.equal(this.head.value, value)) {
      deleteNode = this.head;
      this.head = this.head.next;
    }

    let currentNode: LinkedListNode<T> = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (this.comparator.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.comparator.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deleteNode;
  }

  find({ value, callback }: { value?: T; callback?: (value: T) => boolean }): LinkedListNode<T> {
    if (!this.head) {
      return null;
    }

    let currentNode: LinkedListNode<T> = this.head;

    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      if (value && this.comparator.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail(): LinkedListNode<T> {
    const deletedTail: LinkedListNode<T> = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currentNode: LinkedListNode<T> = this.head;

    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  deleteHead(): LinkedListNode<T> {
    if (!this.head) {
      return null;
    }

    const deletedHead: LinkedListNode<T> = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  fromArray(values: T[]): LinkedList<T> {
    values.forEach((value: T) => {
      this.append(value);
    });

    return this;
  }

  toArray(): LinkedListNode<T>[] {
    const nodes = [];

    let currentNode: LinkedListNode<T> = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback?: (value: T) => string): string {
    return this.toArray()
      .map((node: LinkedListNode<T>) => node.toString(callback))
      .toString();
  }

  reverse(): LinkedList<T> {
    let currentNode: LinkedListNode<T> = this.head;
    let prevNode: LinkedListNode<T> = null;
    let nextNode: LinkedListNode<T> = null;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = prevNode;

      prevNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
