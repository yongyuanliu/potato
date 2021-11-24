/*
    10.16.1 静态私有变量
    特权方法也可以通过私有作用域与私有变量和函数来实现。
 */
(function(){
    let privateVariable = 10;
    
    function privateFunction(){
        return false;
    }

    /*
        这里声明的 MyObject 并没有使用任何关键字，因为不使用关键字声明的变量会创建在全局作用域中，
        所以 MyObject 变成了全局变量，可以在这个私有作用域外部被访问。在严格模式下，给未声明的变量赋值会导致错误。

        这个模式与前一个模式的主要区别就是，私有变量和私有函数是由实例共享的。
     */
    MyObject = function(){
    }

    MyObject.prototype.publicMethod = function(){
        privateVariable ++;
        console.log(privateVariable);
        return privateFunction();
    }
})();
let obj = new MyObject();
obj.publicMethod(); //

let obj2 = new MyObject();
obj2.publicMethod(); // 会访问 obj 同一个作用域链中的匿名函数活动对象的 privateVariable