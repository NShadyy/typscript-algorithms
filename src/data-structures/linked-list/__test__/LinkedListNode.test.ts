import { LinkedListNode } from '../LinkedListNode';

describe('LinkedListNode', () => {
  it('should create list node with value', () => {
    const node = new LinkedListNode<number>(1);

    expect(node.value).toBe(1);
    expect(node.next).toBeNull();
  });

  it('should create list node with object as a value', () => {
    const nodeValue = { value: 1, key: 'test' };
    const node = new LinkedListNode<{ value: number; key: string }>(nodeValue);

    expect(node.value.value).toBe(1);
    expect(node.value.key).toBe('test');
    expect(node.next).toBeNull();
  });

  it('should link nodes together', () => {
    const node2 = new LinkedListNode<number>(2);
    const node1 = new LinkedListNode<number>(1, node2);

    expect(node1.next).toBeDefined();
    expect(node2.next).toBeNull();
    expect(node1.value).toBe(1);
    expect(node1.next.value).toBe(2);
  });

  it('should convert node to string', () => {
    const node1 = new LinkedListNode<number>(1);

    expect(node1.toString()).toBe('1');

    const node2 = new LinkedListNode<string>('string value');
    expect(node2.toString()).toBe('string value');
  });

  it('should convert node to string with custom stringifier', () => {
    const nodeValue = { value: 1, key: 'test' };
    const node = new LinkedListNode<{ value: number; key: string }>(nodeValue);
    const toStringCallback = (linkedListNode: { value: number; key: string }) =>
      `value: ${linkedListNode.value}, key: ${linkedListNode.key}`;

    expect(node.toString(toStringCallback)).toBe('value: 1, key: test');
  });
});
