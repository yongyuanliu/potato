/**
 * 3.3 变量
 * EMCAScript 中的变量是松散的，可以接收任何类型的值
 */

/**
 * ========= var 关键字 =========
 */
//1. 使用
var message; // 定义一个 message 变量
var message = "hi";// 定义 message 变量并赋值为 hi

/*2. 严格模式下不能定义标识符为 eval 和 arguments 变量 */

/**
 * 3. var 声明提升
 * 所谓“提升”(hoist)，也就是把 var 变量声明拉升到函数顶部
 */
function foo(){
    console.log(age);
    var age = 26;
}
foo(); // => 26

// 等价于下面的代码
function foo(){
    var age;
    age = 26;
    console.log(age);
}

/**
 * 4. var 的特点
 */
//4.1 var 声明的范围是函数作用域
//4.2 var 可以声明在同一个作用域下已经声明的标识符，此时发生值覆盖
//4.3 var 声明提升，会拉升 var 声明到函数作用域顶部
//4.4 在全局作用域下 var 声明会成为 window 的属性
var dowx = "dowx";
console.log(window.dowx);


/**
 * ========= let 关键字 =========
 */
//1. let 关键字使用
let name = "liu";

//2. let 关键字作用域是块级作用域
if(true){
    let x = 1;
    console.log(x);
}
console.log(x); // => 产生异常

/**
 * 3.
 * javascript 引擎会标记 标识符 和 其作用域。
 * 在同一个块级作用域中 let 关键字不允许出现相同标识符的声明
 */
function doSomething(){
    let x = 1;
    let x = 2;    //产生错误
}

/**
 * 4. 
 * 暂时性死区（temporal dead zone）
 * javascript 引擎会注意到 let 声明。在 let 声明之前的执行瞬间被成为暂时性死区，在此阶段引用后面才声明的变量都会抛出 ReferenceError
 */
console.log(itx);
let itx = "itx";

/**
 * 5. 在全局作用域下 let 声明不会成为 window 属性
 */


/**
 * ========= const 关键字 =========
 */

/**
 * 1.使用
 * const 声明时必须初始化值
 * const 值不允许修改
 */
const TO_BUILD = 1;
TO_BUILD = 2; // Error
