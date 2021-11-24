/*
    10.4 没有重载
    ECMAScript 中函数没有重载，因为函数前面不一致。
    函数签名就是函数参数类型和参数数量。
 */
function addSomeNumber(num){
    console.log(arguments);
    return num + 100;
}
function addSomeNumber(num1, num2) {
    console.log(arguments);
    return num1 + num2;
}
addSomeNumber(10); // 由于没有重载，因此指向了后面新写的函数

addSomeNumber(10, 100);

//可以通过检查参数的类型和数量，分别指向不同的逻辑来模拟重载
function addSomeNumber(num1, num2){
    if(Object.is(arguments.length, 1)){
        return num1 + 100;
    }
    return num1 + num2;
}
console.log(addSomeNumber(10), addSomeNumber(10, 100));// 110 110