/**
 * null 类型
 */
//1. typeof null 返回"object", null 值表示一个空对象指针
let car = null;
console.log(typeof car); //object

//2. undefined 派生于 null, null 派生于 object
console.log(undefined == null);