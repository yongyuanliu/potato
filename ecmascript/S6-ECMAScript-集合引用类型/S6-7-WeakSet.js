/**
 * 6.7 WeakSet
 * ECMAScript 6 新增的弱集合（WeakSet）是一种新的集合类型，为这门语言带来了集合数据结构。
 * WeakSet 是 Set 的兄弟类型，其 API 也是 Set 的子集。WeakSet 中的 weak 描述的是 JavaScript 垃圾回收程序对待 弱集合 中值的方式。
 */

/**
 * 1. 基本 API
 * 
 * WeakSet 的值只能是引用类型
 */
const ws = new WeakSet();
const val1 = { id : 1}, val2 = { id : 2};
console.log(ws.has(val1));
ws.add({}).add({});

/**
 * 2. Weak
 * WeakSet 中的 Weak 表示弱集合的值是“弱弱的拿着”，意思是不属于正式的引用是，不会阻止垃圾回收。
 */
const wx1 = new WeakSet();
wx1.add({}); // {} 没有引用，会被垃圾回收

/**
 * 3. 不可迭代值
 * 因为 WeakSet 中的值随时都可能被销毁，所以没必要提供迭代其值的能力。
 */

/**
 * 4. 使用弱集合
 * 相比起 WeakMap 实例，WeakSet 实例的用处没有那么大。
 */