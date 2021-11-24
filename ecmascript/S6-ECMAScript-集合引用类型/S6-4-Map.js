/**
 * 6.4 Map
 * ECMAScript 6 以前，在 JavaScript 中实现“键/值”式存储可以使用 Object 来方便高效的完成。
 * 但是这种实现并非没有问题，为此 TC39 专门为了键/值存储定义了一个规范。
 * 这是在 ES6 新增的特性，Map 是一种新增的集合类型。
 */
/**
 * 1. 基本API
 * 创建 Map 实例
 * 获取 Map 大小
 * 设置，删除，查询 Map
 * 获取 Map 内的所有 键，值，键值对
 */
let x1 = new Map();
let x1x = new Map([
    [1, 'i'],
    ['a', 'am'],
    [{}, 'OK']
]);
console.log(x1, x1x);

let x2 = new Map();
console.log(x2.size);//0
x2.set('first', 'i');
x2.set('second', 'am').set('third', 'ok');
console.log(x2.size);//3
console.log(x2.has('first'));//true
console.log(x2.delete('third'));//true
console.log(x2.size);//2
console.log(x2.get('first'));//i
let x2Keys = x2.keys();
console.log(Array.from(x2Keys));//Array [ "first", "second" ]
let x2Values = x2.values();
console.log(Array.from(x2Values));//Array [ "i", "am" ]
let x2Entries = x2.entries();
console.log(Array.from(x2Entries));//Array [ [Array [ "first", "i" ]], [Array [ "second", "am" ]] ]
x2.clear();
console.log(x2.size);//0

/**
 * 2. 顺序与迭代
 * 与 Object 类型对一个主要差异是，Map 实例会维护键值对的插入顺序，因此可以根据插入顺序执行迭代操作。
 * 
 * 键 和 值在迭代器遍历时是可以修改的，但是映射内部的引用则无法修改。
 */
const m1 = new Map([
    ['key1', 'val1'],
    ['key2', 'val2'],
    ['key3', 'val3']
]);
for(let pair of m1.entries()){
    console.log(pair);
}
console.log(Array.from(m1.entries()));
console.log(Array.of(...m1.entries()));

for(let key of m1.keys()){
    console.log(key)
}

for(let value of m1.values()){
    console.log(value);
}

/**
 * 3. 选择 Object 还是 Map
 * 差异：
 *      Object 只能接收 3 中数据类型作为 key，分别是 数值，字符串，符号。Map 能接收任意类型作为 key
 *      Object 的 keys 按照 ECMA-262 是按数值，字符串生成时间，符号生成时间 依次排序。 Map 是按照 set 顺序来排序
 * 
 * 1. 内存占用
 * 2. 插入性能
 * 3. 查找速度
 * 4. 删除性能
 */