/*
    10.10 函数属性与方法
        函数的属性：
            arguments： 函数的参数
            caller：调用当前函数的函数
            length：命名参数个数
            name：函数的函数名
            prototype：原型
        函数的方法：
            apply
            call
            bind
 */
/* 
    apply 接收数组，call 接收一个个的参数。
    这两个方法都会以指定的 this 值来调用函数，既设置调用函数体内 this 对象的值。
    到底是使用 apply 还是 call 取决于要怎么给调用的函数传参更方便，
        如果想直接传 arguments 或一个数组就用 apply，否则就用 call，如果不想传参则哪个都一样
    apply 和 call 真正强大的地方并不是给函数传参，而是控制函数调用上下文即函数体内 this 值的能力
 */
function sayName(name) {
    console.log(name);
}

function callSayName(name) {
    sayName.call(this, name);    
}

function applySayName() {
    sayName.apply(this, arguments);
}

/*
    bind 函数会创建一个新的函数实例，其 this 值会被绑定到传给 bind 的对象。
 */
function sayAge(){
    console.log(this.age);
}
let o = {
    age: 24
}
let ageObj = sayAge.bind(o);
ageObj();// 24
console.log(ageObj);//bound age