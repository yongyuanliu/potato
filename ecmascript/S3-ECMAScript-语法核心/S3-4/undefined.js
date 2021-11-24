/**
 * undefined 是基本数据类型，只有一个值 undefined
 */
// 1. 声明一个变量并不赋值的情况下，默认为 undefined;
let _x; //等同于 _x = undefined;

let _undefined = undefined;

// 2. undefined 目的是为了与 null(空对象)做区分。注意 undefined 派生于 null
console.log(undefined == null); //true

// 3. typeof 未声明的标识符也会返回 undefined
