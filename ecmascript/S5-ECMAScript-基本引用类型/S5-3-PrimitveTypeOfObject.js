/**
 * 原始值包装类型
 * 为了方便操作原始值，ECMAScript 提供了 3 种特殊的引用类型。
 * Number, String, Boolean
 * 通过 new 操作符构建原始值包装对象的实例。通过 typeof 操作符查询都是 object
 */

/**
 * 1. Boolean
 * 重写了 valueOf 方法返回 true, false
 * 由于 Boolean 是引用类型，因此在做比较时会检查是否为 null，不为 null 则返回 true，因此不管 Boolean 的值是 true, false 都返回 true
 */
let b1 = new Boolean(false);
console.log(b1 ? 1 : 0); // 1
console.log(b1 instanceof Boolean); // true
console.log(typeof b1);//object

/**
 * 2. Number
 * 重写了 valueOf 方法返回原始值
 * toString, toLocaleString() 返回数值字符串
 * toFixed() 包含指定小数点位的数值字符串，会自动四舍五入
 * toExponential() 科学计数法
 * toPrecision() 自动返回最合适的情况数字
 */
let n1 = new Number(10);
console.log(n1.valueOf());//10
console.log(n1.toString());//10
console.log(n1.toLocaleString());//10

let n2 = new Number(10.796);
console.log(n2.toFixed(2));//10.80
console.log(n2.toFixed(0));//11

let n3 = new Number(123456789);
console.log(n3.toExponential());//1.23456789e+8
console.log(n3.toPrecision());//123456789

/**
 * ES6 新增了 isInteger() 和 isSafeInteger()
 */
let n3 = NaN;
console.log(Number.isInteger(n3));
console.log(Number.isSafeInteger(n3));


/**
 * 3. String 类型
 * 字符串属性，长度，16位码元位置，规范化字符串
 */
let s1 = 'Hello';
console.log(s1.length);//5
console.log(String.fromCharCode(97, 98));// ab
console.log(String.fromCodePoint(0x1F60A));//😊
console.log(s1.codePointAt(1));//101
console.log(s1.normalize());//101


/**
 * 字符传操作方法
 * 字符串拼接：concat
 * 字符串提取：slice，substring，substr
 */
let s2 = 'Hello';
console.log(s2.concat('World'));// HelloWorld

/**
 * slice 方法与substring 方法差别在于传入负值时。slice 会从右向左取值，substring 则会为0
 */
console.log(s2.slice(0, 2));//He
console.log(s2.substring(0, 2));//He

console.log(s2.substr(0, 2));//He

/**
 * 字符串位置方法
 * indexOf
 * lastIndexOf
 */
let s3 = 'x1x';
console.log(s3.indexOf('x'));//0
console.log(s3.lastIndexOf('x'));//2s

/**
 * 字符串包含
 */
 let s4 = 'abba';
 console.log(s4.startsWith('ab'));// true
 console.log(s4.endsWith('ba'));//true
 console.log(s4.includes('bb'));//true

 /**
  * 去除前后空格
  */
 let s5 = '   1 2 3   ';
 console.log(s5.trim());//1 2 3

 /**
  * 字符串复制
  * 按指定次数复制
  */
 let s6 = 'abc';
 console.log(s6.repeat(3));//abcabcabc

 /**
  * 前后复制,如果小于指定长度则复制字符
  * 默认填充空格，也可以指定字符
  */
 let s7 = 'x';
 console.log(s7.padStart(2));//（两空格）  x
 console.log(s7.padEnd(2));//x  （两空格）
 console.log(s7.padStart(2,'d'));//dx
 console.log(s7.padEnd(2, 'b'));//xb

/**
 * 字符串解构
 */
let s8 = 'message';
console.log([...s8]);//Array(7) [ "m", "e", "s", "s", "a", "g", "e" ]

/**
 * 字符串大小写转换
 */
let s9 = 'q';
console.log(s9.toUpperCase(), s9.toLocaleUpperCase());//Q Q
console.log(s9.toLowerCase(), s9.toLocaleLowerCase());//q q

/**
 * 字符串匹配
 */
let m1 = 'abcde';
console.log(m1.match('bc'));//Array [ "bc" ]
console.log(m1.replace('bc', 'x1'));//ax1de

/**
 * 字符串比较
 */
let m2 = 'yellow';
console.log(m2.localeCompare('brick'));//1
console.log(m2.localeCompare('yellow'));//0
console.log(m2.localeCompare('zoo'));//-1