/**
 * Math 数学函数
 * ECMAScript 提供了 Math 对象作为保存数学公式、信息和计算的地方。
 * Math 对象提供了一些辅助计算的数学和方法。
 */

/**
 * 1. Math 对象属性
 * Math.E 自然数 e 的值
 * Math.PI 派的值
 * Math.SQRT2 2的平方根
 * Math.SQRT1_2 1/2的平方根
 * Math.LN10 10为底的自然对数
 * Math.LN2 2为底的自然对数
 * Math.LOG2E 以 2 为底 e 的对数
 * Math.LOG10E 以 10 为底 e 的对数
 */

/**
 * 2. min 和 max 函数
 * 用于确定一组数值中的最小值，最大值
 */
let xmin = Math.min(3, 5, 1, 0, 10);
console.log(xmin); // 0
let xmax = Math.max(99,100,75,0,1);
console.log(xmax);//100

/**
 * 3. 舍入方法
 */
let xceil = Math.ceil(25.3);
console.log(xceil);// 26
console.log(Math.ceil(25.1));//26
console.log(Math.ceil(25.9));//26

let xfloor = Math.floor(25.5);
console.log(xfloor);// 25
console.log(Math.floor(25.1));//25
console.log(Math.floor(25.9));//25

let xround = Math.round(25.5);
console.log(xround);//26
console.log(Math.round(25.1));//25
console.log(Math.round(25.9));//26

let xfround = Math.fround(25.05); // 25.049999237060547
console.log(xfround);

/**
 * 4. random 方法
 * Math.random 方法返回一个 0～1 范围内的随机数，其中不包含0也不包含1。
 * 对于希望显示随机名言或随机新闻的网页，这个方法是非常方便的。可以基于如下公式从一组整数中随机选择一个数。
 * 
 * number = Math.floor(Math.random() * total_number_of_choices + first_possible_value)
 * 这里使用了 Math.floor 方法，因为 random 始终返回消暑，即便乘以一个数再加上一个数也是小数。
 */
//从 1～10 范围内随机选择一个数
let num = Math.floor(Math.random() * 10 + 1);
console.log(num);
/**
 * 该公式不可靠
 * 从 2 - 9 中取随机数, 即 totalNumberOfChoice = 9， firstPossibleValue = 2
 * 设：
 *  random = 0.969793660943629
 *  next = 0.969793660943629 * 9 = 8.72814294849266
 *  last = 8.72814294849266 + 2 = 10.72814294849266
 *  result = Math.floor(10.72814294849266) 向下取整 = 10
 * 这样就从 2 - 9 中取到了 10
 * @param {*} totalNumberOfChoice 
 * @param {*} firstPossibleValue 
 * @returns 
 */
function getRandomNumber(totalNumberOfChoice, firstPossibleValue){
    let random = Math.random();
    let next = random * totalNumberOfChoice;
    let last = next + firstPossibleValue;
    let result = Math.floor(last);
    console.log(random, next, last, result);
    // return Math.floor(Math.random() * totalNumberOfChoice + firstPossibleValue);
    return result;
}

/**
 * 在指定值间随机返回一个值。
 * 该公式可靠
 * 要从 2 - 9 中取随机数, 即 lowerValue = 2, upperValue = 9
 * 设：
 *  choices = 9 - 2 + 1 = 8
 *  random = 0.9389772926088675
 *  next = 0.9389772926088675 * 8 = 7.51181834087094
 *  last = 8.72814294849266 + 2 = 9.51181834087094
 *  result = Math.floor(9.51181834087094) 向下取整 = 9
 * 这样就从 2 - 9 中取到了 9 不会超过最大值
 * @param { Number } lowerValue 最小值
 * @param { Number } upperValue 最大值
 * @returns 返回一个随机整数 Number，值不小于 lowerValue，值不大于 upperValue
 */
function selectFrom(lowerValue, upperValue) {
    let choices = upperValue - lowerValue + 1;
    // let random = Math.random();
    // let next = random * choices;
    // let last = next + lowerValue;
    // let result = Math.floor(last);
    // console.log(choices, random, next, last, result);
    return Math.floor(Math.random() * choices + lowerValue);
}
let xselect = selectFrom(2, 9);


/**
 * 其他方法
 */
Math.abs;
Math.exp;
Math.expm1;
Math.log;
Math.pow;
Math.clz32;
Math.sign;
Math.sqrt;
Math.cbrt;
Math.acos;
Math.acosh;
Math.asin;
Math.atan;
Math.atan2;
Math.cos;
Math.sin;
Math.tan;