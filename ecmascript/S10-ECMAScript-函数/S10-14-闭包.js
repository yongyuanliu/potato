/*
    10.4 闭包
    闭包指的是引用了另一个函数作用域中变量的函数，通常是在嵌套函数中实现的
 */
let func = function(name){
    return function xc(){
        console.log(name);
        return name;
    }
}
let funcResult =  new func('o');
funcResult();
console.log(`函数执行完毕后`, funcResult(), funcResult);//

/*
    xc 作为内部函数被返回并在其他地方被使用后，它仍然引用着那个变量，这是因为内部函数的作用域链包含 func 函数作用域
 */
//手动释放
funcResult = null;
console.log(`函数指针回收后`, funcResult);// 函数指针回收后 null

/*
    理解作用域链创建和使用的细节对理解闭包非常重要
    在调用一个函数时，会为这个函数调用创建一个执行上下文，并创建一个作用域链，然后用 arugments 和 其他命名参数
    来初始化这个函数的活动对象，外部函数的活动对象是内部函数作用域链的第二个对象，这个作用域链一直向外串起了所有包含
    函数的活动对象，直到全局执行上下文才终止。
 */
/*
    以 compare 函数为例
    第一次调用该函数时会创建一个包含 arguments，v1，v2 的活动对象，这个对象是其作用域链上的第一个对象。
    而全局上下文的变量对象则是 compare函数 作用域链上的第二个对象，其中包含 this、result 和 compare
 */
function compare(v1, v2){
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}
let result = compare(5, 10);
console.log(result);

/*
    在一个函数内部定义的函数会把其包含函数的活动对象添加到自己的作用域中。
    因此在 func 函数中，xc 函数的作用域链中实际上包含了 func 的活动对象。
 */
let x1 = func('x');
let x1Result = x1();
console.log(x1Result);