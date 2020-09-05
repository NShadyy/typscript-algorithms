import { Comparator } from '../../utils/Comparator';
import { DoublyLinkedListNode } from './DoublyLinkedListNode';

export class DoublyLinkedList<T> {
  private comparator: Comparator<T>;

  /** @var DoublyLinkedListNode */
  public head: DoublyLinkedListNode<T>;
  /** @var DoublyLinkedListNode */
  public tail: DoublyLinkedListNode<T>;

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
   * @return {DoublyLinkedList<T>}
   */
  prepend(value: T): DoublyLinkedList<T> {
    // Make new node to be a head.
    const newNode = new DoublyLinkedListNode<T>(value, this.head);

    // If there is head, then it won't be head anymore.
    // Therefore, make its previous reference to be new node (new head).
    // Then mark the new node as head.
    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * @param {T} value
   * @return {DoublyLinkedList<T>}
   */
  append(value: T): DoublyLinkedList<T> {
    // Make new node to be a tail.
    const newNode = new DoublyLinkedListNode<T>(value, null, this.tail);

    // If there is tail, then it won't be tail anymore.
    // Therefore, make its previous reference to be new node (new tail).
    // Then mark the new node as tail.
    if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode;
    }

    return this;
  }

  /**
   * @param {T} value
   * @return {DoublyLinkedListNode<T>}
   */
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
          // If HEAD is going to be deleted...

          // Set head to second node, which will become new head.
          this.head = this.head.next;

          // Set new head's previous to null.
          if (this.head) {
            this.head.previous = null;
          }
        } else if (deletedNode === this.tail) {
          // If TAIL is going to be deleted...

          // Set tail to second last node, which will become new tail.
          this.tail = this.tail.previous;
          this.tail.next = null;
        } else {
          // If MIDDLE node is going to be deleted...
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

  /**
   * @param {Object} findParams
   * @param {T} findParams.value
   * @param {function} [findParams.callback]
   * @return {DoublyLinkedListNode<T>}
   */
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
   * @return {DoublyLinkedListNode<T>}
   */
  deleteTail(): DoublyLinkedListNode<T> {
    if (!this.tail) {
      // No tail to delete.
      return null;
    }

    const deletedNode: DoublyLinkedListNode<T> = this.tail;

    if (this.head === this.tail) {
      // There is only one node in linked list.
      this.head = null;
      this.tail = null;

      return deletedNode;
    }

    // If there are many nodes in linked list...
    this.tail = this.tail.previous;
    this.tail.next = null;

    return deletedNode;
  }

  /**
   * @return {DoublyLinkedListNode<T>}
   */
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

  /**
   * @return {DoublyLinkedListNode<T>[]}
   */
  toArray(): DoublyLinkedListNode<T>[] {
    const nodes = [];

    let currentNode: DoublyLinkedListNode<T> = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * @param {T[]} values - Array of values that need to be converted to linked list.
   * @return {DoublyLinkedList<T>}
   */
  fromArray(values: T[]): DoublyLinkedList<T> {
    values.forEach((value: T) => this.append(value));

    return this;
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback?: (value: T) => string): string {
    return this.toArray()
      .map((node: DoublyLinkedListNode<T>) => node.toString(callback))
      .toString();
  }

  /**
   * Reverse a linked list.
   * @returns {DoublyLinkedList<T>}
   */
  reverse(): DoublyLinkedList<T> {
    let currentNode = this.head;
    let nextNode = null;
    let previousNode = null;

    while (currentNode) {
      // Store next node.
      nextNode = currentNode.next;
      previousNode = currentNode.previous;

      // Change next node of the current node so it would link to previous node.
      currentNode.next = previousNode;
      currentNode.previous = nextNode;

      // Move prevNode and currNode nodes one step forward.
      previousNode = currentNode;
      currentNode = nextNode;
    }

    // Reset head and tail.
    this.tail = this.head;
    this.head = previousNode;

    return this;
  }
}
