/**
 * Symbol(符号)
 * ES6 新增数据类型，原始类型
 */

/**
 * 1. 符号是原始值，不可变，唯一都
 * 用途确保对象属性使用唯一标识符，不会发生属性冲突的危险。
 * 符号用来创建非唯一极好，进而用作非字符串的形式的对象属性。
 */

/**
 * 2. 基本用法
 * 符号没有字面量语法，它不会覆盖已有的对象属性，无论是符号属性还是字符串属性。
 * Symbol函数不能用作构造函数，与 new 关键字一起使用，这样避免创建符号包装对象。
 */
let sym = Symbol();
let fooSymbol = Symbol('foo');

console.log(sym === Symbol()); // false
console.log(fooSymbol === Symbol('foo')); //false

/**
 * 3. 使用全局符号注册表
 * Symbol.for 对每个字符串键执行幂等操作，每次使用某个字符串调用时，都会检查全局允许时注册表。
 *  发现不存在则创建一个新的符号实例添加到注册表中，如果存在则返回该符号到实例
 */
let fooGlobalSymbol = Symbol.for('foo');
let otherGlobalSymbol = Symbol.for('foo');
console.log(fooGlobalSymbol === otherGlobalSymbol); //true
console.log(fooGlobalSymbol === fooSymbol); //false

/**
 * 4. 内置符号(Well-Know Symbol)
 * 内置符号用于暴露语言内部行为，这些内置符号通过重新定义改写原生结构的行为
 * 注意：在提到 ECMAScript 规范时，经常会引用符号在规范中的名称，前缀为@@，比如 @@iterator 指的就是 Symbol.iterator
 */
/**
 * 内置符号列表：
 * @@iterator, @@asyncIterator, @@hasInstance, @@isConcatSpreadable, @@match, @@replace, @@search
 * @@species, @@split, @@toPrimitive, @@toStringTag, @@unscopables 
 */