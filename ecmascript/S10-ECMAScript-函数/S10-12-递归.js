/*
    10.12 递归
    递归函数的形式是一个函数通过名称调用自己
 */
// 利用函数名指针指向函数
function factorial(num){
    if(num <= 1){
        return 1;
    }
    return num * factorial(num - 1);
}
console.log(factorial(3));//6

//利用 arguments 的方法指针
function aFactorial(num){
    if(num <= 1){
        return 1;
    }
    return num * arguments.callee(num - 1);
}
console.log(aFactorial(3));//6