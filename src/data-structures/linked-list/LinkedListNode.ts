export class LinkedListNode<T> {
  public value: T;
  public next: LinkedListNode<T>;

  /**
   * @param {T} value
   * @param {LinkedListNode<T>} next
   */
  constructor(value: T, next: LinkedListNode<T> = null) {
    this.value = value;
    this.next = next;
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback?: (value: T) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
