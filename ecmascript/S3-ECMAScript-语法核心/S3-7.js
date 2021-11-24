/**
 * 函数
 * 函数对任何语言来说都是核心组件,因为它们可以封装语句，然后在任何地方，任何时间执行。
 * ECMAScript 中对函数使用 function 关键字声明，后跟一组参数，然后是函数体。s
 */
function functionName(...params) {
    for (const iterator of params) {
        console.log(typeof iterator, iterator.toString());
    }
}

/**
 * 严格模式对函数也有一些限制：
 *  函数不能以 eval 或 arguments 作为名称；
 *  函数的参数不能叫 evel 或 arguments；
 *  两个函数对参数不能叫同一个名称。
 */