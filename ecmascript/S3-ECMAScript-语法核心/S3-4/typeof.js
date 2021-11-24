/**
 * typeof 是一个操作符，不需要提供参数
 * 通过 typeof 操作符可以返回目标数据类型字符串
 * 
 * 目前 typeof 共能返回 7 种字符串
 * 
 * "number" 数值;
 * "string" 字符串;
 * "boolean" 布尔值;
 * "undefined" 未定义的;
 * "symbol" 符号;
 * "object" 对象;
 * "function" 函数;
 */

console.log(typeof 1);

console.log(typeof "string");

console.log(typeof true);

console.log(typeof undefined);

console.log(typeof Symbol("_symbol"));

console.log(typeof {});

console.log(typeof function(){});