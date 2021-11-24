/*
    10.16.2 模块模式
    10.16.1通过自定义类型创建了私有变量和特权方法。
    下面介绍一种 Douglas Crockford 所说的模块模式，则在一个单例对象上实现了相同的隔离和封装。
    单例对象就是只有一个实例的对象。
 */
//一个常见的 JavaScript 字面量来创建的单例对象
let singleton = {
    name: '',
    method(){

    }
}

/*
    模块模式是单例对象基础上加以扩展，使其通过作用域链来关联私有变量和特权方法。
    模块模式样板代码如下：
 */
let singleton = function(){
    //私有变量和私有函数
    let privateVariable = 10;

    function privateFunction(){
        return false;
    }

    // 特权/公有方法和函数
    return {
        publicProperty: true,

        publicMethod(){
            privateVariable++;
            return privateFunction();
        }
    }
}();
/*
    拆解：这是一个立即调用的匿名函数表达式(IIFE)
    在 IIFE 内部定义的变量和函数，命名参数都是私有变量。
    因此，privateVariable，privateFunction 都是私有属性，无法被外部访问。

    之后创建一个对象并返回对象指针给 singleton 持有。
    在 singleton 指针指向的对象中拥有 publicProperty 属性 和 publicMethod 函数，这些属性都是特权（闭包）方法，
    访问了 IIFE 中定义的私有变量和私有函数。
 */


/*  
    如果单例对象需要某种初始化，并且需要访问私有变量时，那就可以采用这个模式
*/
let application = function(){
    //私有变量和私有函数
    let components = new Array();

    //初始化
    // components.push(new BaseComponents());

    //特权方法
    return {
        getComponentCount(){
            return components.length;
        },
        registerComponent(component){
            if(typeof component == "object"){
                components.push(component);
            }
        }
    }
}();
application.registerComponent(new Object());
console.log(application.getComponentCount());

application.registerComponent(1);
application.registerComponent(new Object());
console.log(application.getComponentCount());