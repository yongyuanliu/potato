/**
 * var
 * let
 * const
 * 变量声明的差异
 */

/**
 * var 与 let 关键字差异
 * 
 * 1. var 是函数作用域，let 是块级作用域
 * 2. javascript 引擎会注意变量的标识符以及作用域。
 *      在相同作用域下 var 允许重复定义标识符。
 *      在相同作用域下 let 关键字则会抛出错误。
 * 3. var 声明会导致提升，将声明拉升到函数顶部。
 * 4. let 有暂时性死区，引用未声明的 let 变量会抛出异常
 * 5. 在全局作用域下 var 声明会成为 window 属性。let 声明不会。
 */
function add(){
    //在相同作用域下 var 允许重复定义标识符。会发生值覆盖
    var page = 1;
    var page = 2;

    let pageLet = 1;
    // 抛出错误，pageLeft 已经定义了
    let pageLet = 2;
}

function search(){
    let page = 1;

    function result(){
        // 不同作用域下可以定义相同的标识符
        let page = 2;
        console.log(page); // 2
    }
    result();

    console.log(page); // 1
}

/**
 * const 与 let 关键字差异
 * 
 * 1. const 必须在声明时进行初始化。
 * 2. const 值不允许修改
 */