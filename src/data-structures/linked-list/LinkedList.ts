import { Comparator } from '../../utils/Comparator';
import { LinkedListNode } from './LinkedListNode';

export class LinkedList {
  public head: LinkedListNode;
  public tail: LinkedListNode;
  public comparator: Comparator;

  constructor(comparatorFunction?: (a: any, b: any) => number) {
    this.head = null;
    this.tail = null;

    this.comparator = new Comparator(comparatorFunction);
  }

  prepend(value: any): LinkedList {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: any): LinkedList {
    const newNode = new LinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  delete(value: any): LinkedListNode {
    if (!this.head) {
      return null;
    }

    let deleteNode: LinkedListNode = this.head;

    while (this.head && this.comparator.equal(this.head.value, value)) {
      deleteNode = this.head;
      this.head = this.head.next;
    }

    let currentNode: LinkedListNode = this.head;

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

  find({ value, callback }: { value?: any; callback?: (value: any) => boolean }): LinkedListNode {
    if (!this.head) {
      return null;
    }

    let currentNode: LinkedListNode = this.head;

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

  deleteTail(): LinkedListNode {
    const deletedTail: LinkedListNode = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currentNode: LinkedListNode = this.head;

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

  deleteHead(): LinkedListNode {
    if (!this.head) {
      return null;
    }

    const deletedHead: LinkedListNode = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  fromArray(values: any[]): LinkedList {
    values.forEach((value: any) => {
      this.append(value);
    });

    return this;
  }

  toArray(): LinkedListNode[] {
    const nodes = [];

    let currentNode: LinkedListNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback?: (value: any) => string): string {
    return this.toArray()
      .map((node: any) => node.toString(callback))
      .toString();
  }

  reverse(): LinkedList {
    let currentNode: LinkedListNode = this.head;
    let prevNode: LinkedListNode = null;
    let nextNode: LinkedListNode = null;

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
