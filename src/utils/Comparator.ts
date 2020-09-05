export class Comparator<T> {
  private compare: (a: T, b: T) => number;

  /**
   * @param {function(a: T, b: T)} [compareFunction] - It may be custom compare function that, let's
   * say may compare custom objects together.
   */
  constructor(compareFunction?: (a: T, b: T) => number) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  /**
   * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
   * @param {(string|number)} a
   * @param {(string|number)} b
   * @returns {number}
   */
  static defaultCompareFunction(a: any, b: any): number {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  /**
   * Checks if two variables are equal.
   * @param {T} a
   * @param {T} b
   * @return {boolean}
   */
  equal(a: T, b: T): boolean {
    return this.compare(a, b) === 0;
  }

  /**
   * Checks if variable "a" is less than "b".
   * @param {T} a
   * @param {T} b
   * @return {boolean}
   */
  lessThan(a: T, b: T): boolean {
    return this.compare(a, b) < 0;
  }

  /**
   * Checks if variable "a" is greater than "b".
   * @param {T} a
   * @param {T} b
   * @return {boolean}
   */
  greaterThan(a: T, b: T): boolean {
    return this.compare(a, b) > 0;
  }

  /**
   * Checks if variable "a" is less than or equal to "b".
   * @param {T} a
   * @param {T} b
   * @return {boolean}
   */
  lessThanOrEqual(a: T, b: T): boolean {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   * Checks if variable "a" is greater than or equal to "b".
   * @param {T} a
   * @param {T} b
   * @return {boolean}
   */
  greaterThanOrEqual(a: T, b: T): boolean {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  /**
   * Reverses the comparison order.
   */
  reverse(): void {
    const compareFunction = this.compare;
    this.compare = (a, b) => compareFunction(b, a);
  }
}
