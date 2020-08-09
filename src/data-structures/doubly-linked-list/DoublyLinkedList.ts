import { Comparator } from '../../utils/Comparator';
import { DoublyLinkedListNode } from './DoublyLinkedListNode';

export class DoublyLinkedList {
  public head: DoublyLinkedListNode;
  public tail: DoublyLinkedListNode;
  public comparator: Comparator;

  constructor(comparatorFunction?: (a: any, b: any) => number) {
    this.head = null;
    this.tail = null;

    this.comparator = new Comparator(comparatorFunction);
  }

  prepend(value: any): DoublyLinkedList {
    const newNode = new DoublyLinkedListNode(value, this.head);

    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: any): DoublyLinkedList {
    const newNode = new DoublyLinkedListNode(value, null, this.tail);

    if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;

    if (!this.head) {
      this.head = newNode;
    }

    return this;
  }

  delete(value: any): DoublyLinkedListNode {
    if (!this.head) {
      return null;
    }

    let deletedNode: DoublyLinkedListNode = null;
    let currentNode: DoublyLinkedListNode = this.head;

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
    value?: any;
    callback?: (value: any) => boolean;
  }): DoublyLinkedListNode {
    if (!this.head) {
      return null;
    }

    let currentNode: DoublyLinkedListNode = this.head;

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

  deleteTail(): DoublyLinkedListNode {
    if (!this.tail) {
      return null;
    }

    const deletedNode: DoublyLinkedListNode = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedNode;
    }

    this.tail = this.tail.previous;
    this.tail.next = null;

    return deletedNode;
  }

  deleteHead(): DoublyLinkedListNode {
    if (!this.head) {
      return null;
    }

    const deletedNode: DoublyLinkedListNode = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedNode;
    }

    this.head = this.head.next;
    this.head.previous = null;

    return deletedNode;
  }

  toArray(): DoublyLinkedListNode[] {
    const nodes = [];

    let currentNode: DoublyLinkedListNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  fromArray(values: any[]): DoublyLinkedList {
    values.forEach((value: any) => this.append(value));

    return this;
  }

  toString(callback?: (value: any) => string): string {
    return this.toArray()
      .map((node: DoublyLinkedListNode) => node.toString(callback))
      .toString();
  }

  reverse(): DoublyLinkedList {
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
