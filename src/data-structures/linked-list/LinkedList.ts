import { Comparator } from '../../utils/Comparator';
import { LinkedListNode } from './LinkedListNode';

export class LinkedList<T> {
  private comparator: Comparator<T>;

  /** @var LinkedListNode */
  public head: LinkedListNode<T>;
  /** @var LinkedListNode */
  public tail: LinkedListNode<T>;

  /**
   * @param {Function} [comparatorFunction]
   */
  constructor(comparatorFunction?: (a: T, b: T) => number) {
    this.head = null;
    this.tail = null;

    this.comparator = new Comparator<T>(comparatorFunction);
  }

  /**
   * @param {T} value
   * @return {LinkedList<T>}
   */
  prepend(value: T): LinkedList<T> {
    // Make new node to be a head.
    const newNode = new LinkedListNode<T>(value, this.head);
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * @param {T} value
   * @return {LinkedList<T>}
   */
  append(value: T): LinkedList<T> {
    const newNode = new LinkedListNode<T>(value);

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Attach new node to the end of linked list.
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  /**
   * @param {T} value
   * @return {LinkedListNode<T>}
   */
  delete(value: T): LinkedListNode<T> {
    if (!this.head) {
      return null;
    }

    let deleteNode: LinkedListNode<T> = this.head;

    // If the head must be deleted then make next node that is differ
    // from the head to be a new head.
    while (this.head && this.comparator.equal(this.head.value, value)) {
      deleteNode = this.head;
      this.head = this.head.next;
    }

    let currentNode: LinkedListNode<T> = this.head;

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) {
        if (this.comparator.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.comparator.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deleteNode;
  }

  /**
   * @param {Object} findParams
   * @param {T} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode<T>}
   */
  find({ value, callback }: { value?: T; callback?: (value: T) => boolean }): LinkedListNode<T> {
    if (!this.head) {
      return null;
    }

    let currentNode: LinkedListNode<T> = this.head;

    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // If value is specified then try to compare by value..
      if (value && this.comparator.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * @return {LinkedListNode<T>}
   */
  deleteTail(): LinkedListNode<T> {
    const deletedTail: LinkedListNode<T> = this.tail;

    if (this.head === this.tail) {
      // There is only one node in linked list.
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // If there are many nodes in linked list...

    // Rewind to the last node and delete "next" link for the node before the last one.
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

  /**
   * @return {LinkedListNode<T>}
   */
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

  /**
   * @param {T[]} values - Array of values that need to be converted to linked list.
   * @return {LinkedList<T>}
   */
  fromArray(values: T[]): LinkedList<T> {
    values.forEach((value: T) => {
      this.append(value);
    });

    return this;
  }

  /**
   * @return {LinkedListNode<T>[]}
   */
  toArray(): LinkedListNode<T>[] {
    const nodes = [];

    let currentNode: LinkedListNode<T> = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback?: (value: T) => string): string {
    return this.toArray()
      .map((node: LinkedListNode<T>) => node.toString(callback))
      .toString();
  }

  /**
   * Reverse a linked list.
   * @returns {LinkedList<T>}
   */
  reverse(): LinkedList<T> {
    let currentNode: LinkedListNode<T> = this.head;
    let prevNode: LinkedListNode<T> = null;
    let nextNode: LinkedListNode<T> = null;

    while (currentNode) {
      // Store next node.
      nextNode = currentNode.next;

      // Change next node of the current node so it would link to previous node.
      currentNode.next = prevNode;

      // Move prevNode and currNode nodes one step forward.
      prevNode = currentNode;
      currentNode = nextNode;
    }

    // Reset head and tail.
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
