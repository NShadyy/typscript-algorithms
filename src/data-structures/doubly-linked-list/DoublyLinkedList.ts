import { Comparator } from '../../utils/Comparator';
import { DoublyLinkedListNode } from './DoublyLinkedListNode';

export class DoublyLinkedList<T> {
  public head: DoublyLinkedListNode<T>;
  public tail: DoublyLinkedListNode<T>;
  public comparator: Comparator<T>;

  constructor(comparatorFunction?: (a: T, b: T) => number) {
    this.head = null;
    this.tail = null;

    this.comparator = new Comparator<T>(comparatorFunction);
  }

  prepend(value: T): DoublyLinkedList<T> {
    const newNode = new DoublyLinkedListNode<T>(value, this.head);

    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: T): DoublyLinkedList<T> {
    const newNode = new DoublyLinkedListNode<T>(value, null, this.tail);

    if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;

    if (!this.head) {
      this.head = newNode;
    }

    return this;
  }

  delete(value: T): DoublyLinkedListNode<T> {
    if (!this.head) {
      return null;
    }

    let deletedNode: DoublyLinkedListNode<T> = null;
    let currentNode: DoublyLinkedListNode<T> = this.head;

    while (currentNode) {
      if (this.comparator.equal(currentNode.value, value)) {
        deletedNode = currentNode;

        if (deletedNode === this.head) {
          this.head = this.head.next;

          if (this.head) {
            this.head.previous = null;
          }
        } else if (deletedNode === this.tail) {
          this.tail = this.tail.previous;
          this.tail.next = null;
        } else {
          const previousNode = deletedNode.previous;
          const nextNode = deletedNode.next;

          previousNode.next = nextNode;
          nextNode.previous = previousNode;
        }
      }

      currentNode = currentNode.next;
    }

    return deletedNode;
  }

  find({
    value,
    callback,
  }: {
    value?: T;
    callback?: (value: T) => boolean;
  }): DoublyLinkedListNode<T> {
    if (!this.head) {
      return null;
    }

    let currentNode: DoublyLinkedListNode<T> = this.head;

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

  deleteTail(): DoublyLinkedListNode<T> {
    if (!this.tail) {
      return null;
    }

    const deletedNode: DoublyLinkedListNode<T> = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedNode;
    }

    this.tail = this.tail.previous;
    this.tail.next = null;

    return deletedNode;
  }

  deleteHead(): DoublyLinkedListNode<T> {
    if (!this.head) {
      return null;
    }

    const deletedNode: DoublyLinkedListNode<T> = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedNode;
    }

    this.head = this.head.next;
    this.head.previous = null;

    return deletedNode;
  }

  toArray(): DoublyLinkedListNode<T>[] {
    const nodes = [];

    let currentNode: DoublyLinkedListNode<T> = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  fromArray(values: T[]): DoublyLinkedList<T> {
    values.forEach((value: T) => this.append(value));

    return this;
  }

  toString(callback?: (value: T) => string): string {
    return this.toArray()
      .map((node: DoublyLinkedListNode<T>) => node.toString(callback))
      .toString();
  }

  reverse(): DoublyLinkedList<T> {
    let currentNode = this.head;
    let nextNode = null;
    let previousNode = null;

    while (currentNode) {
      nextNode = currentNode.next;
      previousNode = currentNode.previous;

      currentNode.next = previousNode;
      currentNode.previous = nextNode;

      previousNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = previousNode;

    return this;
  }
}
