export class LinkedListNode<T> {
  public value: T;
  public next: LinkedListNode<T>;

  constructor(value: T, next: LinkedListNode<T> = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback?: (value: T) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
