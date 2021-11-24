/*
    10.15 立即调用的函数表达式(IIFE Immediately Invoked Function Expression)
    立即调用的匿名函数又被称为立即调用的函数表达式(IIFE Immediately Invoked Function Expression)
    它类似于函数声明，但由于被包含在括号中，所以会解释为函数表达式，紧跟在第一组括号后面但第二组括号会立即调用前面但函数表达式
 */
(function(){
    
})();
/*
    以上面的函数为例
    第一组括号内声明一个匿名函数
    第二组括号则立刻运行该函数
 */


/*
    1. 模拟块级作用域
    在一个 IIFE 中声明但变量，然后立即调用这个函数，这样位于函数提变量就像是在块级作用域一样
 */
(function(i){
    for(; i > 0; i--){
        console.log(i);
    }
})(10);

/*
    2. 在 IIFE 中变量在外部无法访问，不会导致闭包相关的内存问题。因为不存在对这个匿名函数的引用，
    为此只要函数执行完毕，其作用域链就可以销毁
 */
(function(){
    let i = 3;
    console.log(i);
})();

/*
    3. 锁定参数
    IIFE 执行函数体创建一个闭包在该闭包中引用 IIFE 中的变量 i，并返回该闭包的引用给 div
 */
for(var i = 0; i < divs.length; i++){
    divs[i].addEventListener('click', (function(i){
        return function(){
            console.log(i);
        }
    })(i));
}