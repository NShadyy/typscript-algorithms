export class DoublyLinkedListNode {
  public value: any;
  public next: DoublyLinkedListNode;
  public previous: DoublyLinkedListNode;

  constructor(
    value: any,
    next: DoublyLinkedListNode = null,
    previous: DoublyLinkedListNode = null,
  ) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString(callback?: (value: any) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
