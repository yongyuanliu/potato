/*
    10.14 this 对象
    闭包中的 this 会指向全局对象，严格模式中 this 为undefined。
    每个函数在调用时都会自动创建两个特殊变量：this 和 arguments
    内部函数永远不可能直接访问外部函数的这两个变量
 */
window.identity = 'The Window';

let object = {
    identity: 'object',
    getIdentity(){
        return function(){
            console.log(this);
            return this.identity;
        }
    }
}

console.log(object.getIdentity()()); //The Window


/*
    通过保存 this 对象为变量，再通过作用域链访问外部函数作用域链中的 this变量对象 来访问指定的 this
 */
let Global = this;
Global.identity = 'The Window';

let object = {
    identity: 'object',
    getIdentity(){
        let that = this;
        return function(){
            console.log(that);
            return that.identity; // 或者 Global.identity
        }
    }
}

console.log(object.getIdentity()(), Global.identity); //object