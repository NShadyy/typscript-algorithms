export class Comparator<T> {
  constructor(compareFunction?: (a: T, b: T) => number) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  static defaultCompareFunction(a: any, b: any) {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  compare: (a: T, b: T) => number;

  equal(a: T, b: T) {
    return this.compare(a, b) === 0;
  }

  lessThan(a: T, b: T) {
    return this.compare(a, b) < 0;
  }

  greaterThan(a: T, b: T) {
    return this.compare(a, b) > 0;
  }

  lessThanOrEqual(a: T, b: T) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  greaterThanOrEqual(a: T, b: T) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  reverse() {
    const compareFunction = this.compare;
    this.compare = (a, b) => compareFunction(b, a);
  }
}
