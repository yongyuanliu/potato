/**
 * 3.5 数值
 * 1. 有整数与浮点数
 * 2. 支持十进制，十六进制，八进制，二进制
 * 3. 小数点后面要有数字，否则会被转换成整数
 *      let floatNum = 1.0; //会被转换成整数
 *      let floatNum = 1.1;
 * 4.科学计数法
 *  let num = 3.125e7;
 *          = 31250000;
 *  简单理解，e7 表示 3 后面共有 7 个 0，125依次占位。
 *      30000000
 *       125
 *  以3.125为系数乘以 10 的7次幂
 * 
 * 5.值的范围
 *  ECMAScript 最小的值是 Number.MIN_VALUE(5e-324)
 *             最大的值是 Number.MAX_VALUE(1.79..+308)
 *  超出范围的值：Infinity
 *              +Infinity
 *              -Infinity
 * 6.NaN（Not a Number）不是一个数字
 *      NaN == NaN 为 false
 *      isNaN(NaN) 为 true
 * 7.数值转换，将非数值转换成数值
 *      Number();
 *      parseInt();
 *      parseFloat();
 */