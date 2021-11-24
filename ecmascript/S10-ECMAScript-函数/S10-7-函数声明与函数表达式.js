/*
    10.7 函数声明和函数表达式
    JavaScript 引擎在任何代码执行之前，会先读取函数并在执行上下文中生成函数定义。
    函数表达式必须等到代码执行到它那一行，才会在执行上下文中生成函数定义。
 */

/*
    函数声明提升（function declaration hoisiting）
    会在任何代码执行之前先读取并添加到上下文
 */
console.log(sum(1, 2)); //没问题，正常输出 3
function sum(...values) {
    return values.reduce( (x, y) => x + y, 0);
}


//函数表达式则不会s
console.log(anotherSum(1, 2));//ReferenceError: can't access lexical declaration 'anotherSum' before initialization
let anotherSum = (...values) => values.reduceRight( (prev, curv) => prev + curv, 0 );
