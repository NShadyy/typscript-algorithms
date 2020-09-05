export class DoublyLinkedListNode<T> {
  public value: T;
  public next: DoublyLinkedListNode<T>;
  public previous: DoublyLinkedListNode<T>;

  /**
   * @param {T} value
   * @param {DoublyLinkedListNode<T>} next
   * @param {DoublyLinkedListNode<T>} previous
   */
  constructor(
    value: T,
    next: DoublyLinkedListNode<T> = null,
    previous: DoublyLinkedListNode<T> = null,
  ) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback?: (value: T) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
