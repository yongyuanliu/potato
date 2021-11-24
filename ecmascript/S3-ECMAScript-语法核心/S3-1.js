/**
 * S3-1 ECMAScript 语法
 * 
 * 1. 区分大小写
 * 2. 标识符
 * 3. 注释
 * 4. 严格模式
 * 5. 语句
 */


/**
 * 1.区分大小写
 *  ECMAScript 中一切都区分大小写，无论是函数，变量，参数都区分大小写
 * 
 * Test 与 test 就是两个不同都变量
 * 同理
 * testFun 与 TestFunction 就是两个不同都变量
 */
let Test = "Test";
let test = "Test";

function testFun(){
}

function TestFunction(){
}


/**
 * 2.标识符
 * 标识符就是函数的名称，变量的变量名，参数的参数名称
 * 
 * 标识符的规则
 * 1.首字符必须是英文字母、下划线_、美元符号$
 * 2.后面字符可以是英文字母、下划线_、美元符$、数字
 */
let only = "only",
    age24 = 24,
    user_age = 24,
    $age$1 = 24;
/**
 * 标识符一般采用驼峰式命名规则 camleCase 主要是首单词字母小写，后面单词首字母大写
 */
let myHouse = "House";



/**
 * 3.注释
 */
// 单行注释
/* 多行注释 */


/**
 * 4.严格模式
 * 严格模式是一种不同的 JavaScript 解析和运行方式，在严格模式下有些代码会被拒绝执行，产生异常
 * 
 * 1. 在整个脚本启用严格模式
 * "use strict";
 * 在整个脚本第一行添加上严格指令，表示整个 js 都在严格模式下解析和执行
 * 
 * 2.在函数内使用 "use strict"
 * 在函数内第一行添加该句，表示函数内都使用严格模式
 */
/**
 * 启用严格模式
 */
"use strict";

/**
 * 在函数内部启用
 */
function useStrict(){
    "use strict"
}


/**
 * 5.语句
 * EMCAScript 的语句都以分号 ; 结尾，表示一行的语句。省略分号意味着由解析器来自动补全分号
 * 
 * ECMAScript 多条语句可以合并到一个代码块中，代码块由一个左花括号“{”开始，由一个右花括号“}”表示结束
 */
let statement = "hello";

{
    let blockStatement = 1,
        blockStatement2 = 2;
    console.log("block statement",statement, blockStatement, blockStatement2);
};
console.log("global", statement, blockStatement, blockStatement2);
