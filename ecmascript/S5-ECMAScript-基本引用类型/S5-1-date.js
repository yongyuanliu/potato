/**
 * Date 日期
 * 通过 Date 对象来操作获取日期时间
 * ECMAScript 的 Date 类型参考了 Java 早期的版本中的 java.util.Date。
 * 为此，Date 类型将日期保存为字协调世界时（UTC，Universal Time Coordinated）时间 1970 年 1 月 1日零时至今所经过的毫秒数。
 */
let now = new Date();

/**
 * 通过 parse 函数来创建日期
 */
let x1 = Date.parse('5/23 2019'); //5月23日 2019年
let x2 = Date.parse('May 1, 2019');//月份名称 日，年
let x3 = Date.parse('Tue May 23 2019 00:00:00 GMT-0700');//周几 月名 日 年 时:分:秒 时区
let x4 = Date.parse('2019-05-23T00:00:00');//YYYY-MM-DDTHH:mm:ss.sssZ
let someDate = new Date(x4);

/**
 * Date.UTC 返回 1970年到现在到毫秒值，用该函数来创建 date 对象
 */
let utc1 = new Date(Date.UTC(2021, 3, 24, 16, 29, 30));//1970年到 2021 年 4 月 24日 下午4点 29分 30秒的毫秒值

/**
 * 通过 Date.now 函数获取毫秒值
 */
let nowx1 = new Date(Date.now());

/**
 * 1. 继承的方法
 * toString, toLocaleString, valueOf 这些个方法被重写了。
 * 返回浏览器运行时本地环境一致的日期和时间。
 */
let f1 = new Date(Date.UTC(2021, 3, 24));
console.log(f1.toLocaleString());   // 4/24/2021, 8:00:00 AM
console.log(f1.toString()); // Sat Apr 24 2021 08:00:00 GMT+0800 (China Standard Time)
/**
 * valueOf 被重写返回毫秒值，因此可以直接用来比较大小
 * date1 > date2 ? true_value : false_value;
 * 在用日期比较时，用的就是日期实例对象的 valueOf 返回值
 */
console.log(f1.valueOf());  //  1619222400000

/**
 * 2. 日期格式化时间
 * 
 * Date.toDateString(); // Sat Apr 24 2021
 * Date.toTimeString(); // 08:00:00 GMT+0800 (China Standard Time)
 * Date.toLocaleDateString();   // 本地化日期 4/24/2021
 * Date.toLocaleTimeString();   // 本地化时间 8:00:00 AM
 * Date.toUTCString();  //Sat, 24 Apr 2021 00:00:00 GMT
 * 
 */

/**
 * 3. 日期/时间方法
 * 有正常日期/时间 API 和 UTC日期/时间 API
 * 意味着有 getDate 就有 getUTCDate, setDate , setUTCDate
 */
let f3 = new Date();
f3.getTime();// 毫秒值 与 valueOf 方法相同
f3.setTime();

f3.getFullYear(); //年份 2021
f3.setFullYear();

f3.getMonth(); //月份 0-12
f3.setMonth();

f3.getDate(); //当前日 1-31
f3.setDate();

f3.getDay(); //星期几的位数（0:周日，6周六）

f3.getHours();//小时 0-23
f3.setHours();

f3.getMinutes(); //分钟 0-59
f3.setMinutes();

f3.getMilliseconds();//获取日期中的毫秒值0-999
f3.setMilliseconds();

/**
 * UTC
 */
f3.getUTCFullYear();// 年份
f3.setUTCFullYear();

f3.getUTCMonth();//0-11
f3.setUTCMonth();

f3.getUTCDate();// 1-31
f3.setUTCDate();

f3.getUTCDay();//星期几 0：周日-6：周六

f3.getUTCHours();// 0-23
f3.setUTCHours();

f3.getUTCMinutes();// 0-59
f3.setUTCMinutes();

f3.getUTCSeconds(); //0-59
f3.setUTCSeconds();

f3.getUTCMilliseconds();//0-999
f3.setUTCMilliseconds();