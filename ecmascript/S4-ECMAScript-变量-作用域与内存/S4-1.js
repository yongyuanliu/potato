/**
 * 4.1 原始值与引用值
 * 
 * 原始值（primitive value）: undefined, null, number, string, symbol, boolean
 * 引用值（reference value）: Object
 * 
 * 
 * 原始值就是最简单的数据，引用值则是由多个值构成的对象。
 * 
 * 保存原始值的变量是按值访问的，因为我们操作的就是存储在变量中的实际值。
 * 引用值是保存在内存中的对象。JavaScript 不允许直接操作对象所在的内存空间。在操作对象时，实际上操作的是该对象的引用（reference）而非对象本身。
 *  为此，保存引用值的变量是按引用访问的。
 */

/**
 * 1. 动态赋值
 */
/**
 * 引用值，也就是对象可以随时添加它的属性
 */
let dy1 = new Object();
dy1.name = 'Only';
dy1.age = 24;
console.log(typeof dy1, dy1, dy1.age);
/**
 * 原始值，无法添加属性
 */
let num1 = 10;
num1.age = 24;
console.log(typeof num1, num1, num1.age);


/**
 * 2. 复制值
 * 原始值的复制会产生新的值
 * 引用值的复制会指向原引用
 */
let num2_1 = 10; //假设 num2_1 是 0031, 10的空间位置是 0410，那么num2_1 就是 0031_0410
let num2_2 = num2_1; //假设 num2_2 是 0032, 10的空间位置就是 0411, 那么 num2_1 就是 0032_0411
num2_1 = 20;// 修改 0031_0410 为 0031_0412 不会影响到 0032_0411，原始值就是值的空间是明确的，直接操作的
console.log(num2_1, num2_2);//20, 10


/**
 * 假设 person2_1 是 0040, 对象实例是 0440, 因为规定无法直接操控 0040 的空间，为此提供引用（reference）1440
 * 那么 person2_1 就是 0040_1440_0440
 */
let person2_1 = new Object();

/**
 * 引用值会复制引用，因此 person2_2 就是 0041_1440_0440
 */
let person2_2 = person2_1;
person2_1.name = 'only'; // 1440_0440.name = only。任意持有 1440_0440 都可以获取到 name 为 only 的数据
console.log(person2_2); //{name:'only'}


/**
 * 3. 参数传递参数
 * ECMAScript 中所有参数都是按值传递的，就是复制值一样，原始值复制原始值，引用值复制引用。
 * 在按值传参时，值会被保存到一个局部变量（ECMAScript 中的 arguments 对象的一个槽位中）
 * 
 * 怎么去理解参数的传递？
 */
// 原始值
let num3_1 = 10;
function addTen(num) {
    num += 10;
    console.log(num);
    return num;
}
addTen(num3_1);
console.log(num3_1); // 值的传参就是复制，在 addTen 函数中修改不影响 num3_1

//引用值
let person3_1 = new Object();
function setName(obj) {
    obj.name = 'only';
}
setName(person3_1); // 修改到外面的 person3_1 了，因为按引用传递，setName函数中的 obj 持有 person3_1 指向对象实例的引用
console.log(person3_1);

let person3_2 = new Object();
function setProperty(obj) {
    obj.name = 'only';

    /**
     * new object()，意味着，在该函数内产生了一个新的变量, obj 更改了持有的引用
     * 因此 obj 持有的引用下设置了 age，并不影响 person3_2 持有的对象引用的数据
     */
    obj = new Object();
    obj.age = 24;
    console.log(obj);
}
setProperty(person3_2);
console.log(person3_2);

/**
 * 4. 确定数据类型
 * typeof 操作符 和 instanceof 操作符
 */
/**
 * typeof 可以确定原始值是什么类型，但是如果是对象，它不关心是什么样的类型的对象
 */
let s4_s = 'Only';
let s4_b = true;
let s4_n = 1;
let s4_sym = Symbol('x');
let s4_null = null;
let s4_undefined = undefined;
let s4_obj = new Object();
let s4_o_n = new Number(1);
let s4_o_s = new String('s');
console.log(typeof s4_s);//string
console.log(typeof s4_b);//boolean
console.log(typeof s4_n);//number
console.log(typeof s4_sym); //symbol
console.log(typeof s4_undefined); //undefined
console.log(typeof s4_null); //object
console.log(typeof s4_obj);// object
console.log(typeof s4_o_n);// object
console.log(typeof s4_o_s);// object

/**
 * ECMAScript 为了能辨别是什么样的类型的对象，添加了 instanceof 操作符
 * instanceof 操作符，如果变量是给定引用类型（由原型链决定）则 instanceof 操作符会返回 true
 * 语法：result = variable instaceof constructor
 */
let s4_o_array = new Array();
let s4_o_string = new String('x');
console.log(s4_o_string instanceof String);// true
console.log(s4_o_array instanceof Array);// true
console.log(s4_n instanceof Number);//false