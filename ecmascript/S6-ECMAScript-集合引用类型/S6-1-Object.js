/**
 * 6.1 Object
 * 
 * ECMA-262 Properties Of The Object Prototype Object
 * "对象原型对象的属性"
 * constructor 用于创建当前对象的函数
 * hasOwnProperty 用于判断当前对象上是否给定的属性
 * isPrototypeOf 用于判断当前对象是否为另一个对象的原型
 * propertyIsEnumerable 用于潘敦啊给定的属性是否可以使用 for-in 语句枚举
 * toString 返回对象的字符串表示
 * toLocaleString 返回对象的字符串表示，该字符串反映对象所在的本地化执行环境
 * valueOf 返回对象对于的字符串，数值，或布尔值表示。
 */

/**
 * 1. 创建对象实例方式
 */
let x1 = new Object(); //new 关键字
let x2 = { name:'x2' }; //对象字面量
x2['name']; // x2 获取属性
x2.name;    // x2 获取属性

/**
 * 2. 表达式上下文 (expressions context)
 * 在 ECMAScript 中 表达式上下文指的是期待返回值的上下文。
 */

/**
 * 3. 语句上下文（statement context）
 * 在语句后面的代码块，例如 if 语句后面的代码块就是上下文
 */