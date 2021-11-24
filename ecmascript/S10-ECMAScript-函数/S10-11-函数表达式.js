/*
    10.11 函数表达式

    1. 函数声明会导致函数声明提升
    2. 函数表达式 JavaScript 引擎会先读取函数声明再执行
 */

// 普通函数
let funcName = function(id, name){};
console.log(funcName.name, funcName.length);

// 匿名函数
function someFunc(){
    return function(){

    }
}
// 命名函数表达式
let factorial = (function f(num){
    if(num <= 1){
        return 1;
    }
    return num * f(num - 1);
});
console.log(factorial.name, factorial.length);