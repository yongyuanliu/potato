/**
 * string 字符串
 */

/**
 * 使用方式
 */
let f = "",
    s = '',
    t = ``;

/**
 * 字符串字面量
 * \f 换页 \n 换行 \r 回车
 * \t 制表符 \b 退车符
 * \\ 双斜杠 \" 双引号 \' 单引号 \` 反引号
 * \xnn 十六进制数
 * \unnn unicode字符
 */

/**
 * 字符串特点
 * 一旦创建就不可被销毁
 */
let j = `JavaScript`;//创建 JavaScript 字符串
j = 'x'; //创建 x 字符串。更改 j 变量引用的值地址


/**
 * 字符串转换
 * 1. toString方法
 * 2. 使用加号添加一个空字符串
 */
let x = parseInt(1).toString();
let x1 = 1 + "";


/**
 * 模版字面量
 * 模版字面量由两个反引号组成，是ES6的新特性
 */
//1. 模版字面量保留空格，换行符
let k1 = `first line
second line       End`;

//2. 模版字面量是一个特殊的 javascript语法表达式，只不过求值得到的是字符串
let k2 = `${x}`; //会立刻检测变量 x 的值并调用 toString 方法求值

//3. 在定义时立刻求值并转换成字符串，任何插入的变量也会从它们最近的作用域中取值

//4.模板字面量
let k3 = { toString : () => 'world' };
console.log(`hello ${k3}`); // hello world
//${ 表达式 }


//5.常见使用场景
let k4 = `x1`; //普通字符串
let k5 = `k4 is ${k4}`; //引用表达式求值


//引用方法
function tk6(str){
    return str;
}
let k6 = `${tk6(`${k4}`)}`; // x1
let k7 = `${tk6(k4)}`; // x1 

//插入自己以前的值
let k8 = ``;
function append(){
    k8 = `${k8}abc`;
}
append();
append();


/**
 * 6. 模版字面量标签函数
 * 
 * 什么是标签函数(tag function)?
 *  标签函数本身也是一个普通函数，通过前缀到模板字面量来应用自定义行为
 * 标签函数有什么用？
 *  标签函数会接收原始字符串和对每个表达式求值对结果，用于控制流程
 * 标签函数怎么用？
 */
/**
 * 标签函数使用例子:
 */
function zipTag(strings, ...expressions){
    return strings[0] + expressions.map( ( e, i ) => `${e}${strings[i+1]}` ).join('');
}
let a = 6,
    b = 9;
let untaggedResult = `${a} + ${b} = ${a + b}`,
    zipTaggedResult = zipTag`${a} + ${b} = ${a + b}`;
console.log(untaggedResult);
console.log(zipTaggedResult);

/**
 * 模版字面量原始值
 * 通过 String.raw
 */
let sr1 = `\u00A9`;// "©"
let sr2 = String.raw`\u00A9`;// \u00A9