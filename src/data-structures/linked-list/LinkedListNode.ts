export class LinkedListNode {
  constructor(public value: any, public next: LinkedListNode = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback?: (value: any) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
