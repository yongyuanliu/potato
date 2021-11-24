/**
 * 8.1.7 对象解构
 * ES6 新增了对象解构语法，可以在一条语句中使用嵌套数据实现一个或多个赋值操作。
 * 简单地来说，对象解构就是使用与对象匹配的解构来实现对象属性赋值。
 */

//不使用对象解构
let f1Person = {
    name: 'x',
    age: 25
};
let f1PersonName = f1Person.name, f1PersonAge = f1Person.age;
console.log(f1Person, f1PersonName, f1PersonAge);

//对象解构
let x1 = {
    name : 'o',
    age: 25
}
let { name: x1PersonName, age: x1PersonAge } = x1;
console.log(x1PersonName, x1PersonAge);

//直接解构,使用与对象属性匹配的解构做变量名
let { name, age } = x1;

//解构并不要求变量必须在解构表达式中声明。
//不过，如果是给事先声明的变量赋值，则赋值表达式必须包含在一对括号中。
let x2PersonName, x2PersonAge;
let x2 =  {
    name: 'x2',
    age: 25
};
({ name: x2PersonName, age: x2PersonAge } = x2);
console.log(x2PersonName, x2PersonAge);

/**
 * 1. 嵌套解构
 * 解构对于引用嵌套的属性或赋值目标没有限制。
 * 为此，可以通过解构来复制对象属性
 */
let m1 = {
    name: 'm1',
    age: 25,
    job: {
        title: 'software engineer'
    }
};
let m1Copy = {};
({
    name: m1Copy.name,
    age: m1Copy.age,
    job: m1Copy.job
} = m1);
console.log(m1Copy);
//因为是解构是浅复制，所以对象属性的修改也会影响到 copy
m1.job.title = 'changed';
console.log(m1Copy);

//解构赋值可以使用嵌套结构，以匹配嵌套的属性：
let { job : { title } } = m1;
console.log(title);//changed

//在外层属性没定义的情况下不能使用嵌套解构。无论是愿对象还是目标对象都一样。
({
    foo: {
        bar: m1Copy.bar
    }
} = m1);//Uncaught TypeError: m1.foo is undefined

({
    job:{
        title: m1Copy.job.title
    }
} = m1);//Uncaught TypeError: m1Copy.job is undefined


/**
 * 2. 部分解构s
 * 需要注意都是，涉及多个属性的解构赋值是一个无关的顺序化操作。
 * 如果一个解构表达式涉及多个赋值，开始的赋值成功而后面的赋值出错，则整个解构赋值只会完成一部分。
 */
let g1 = {
    name: 'g1',
    age: 25
};
let { name: g1Name, age: g1Age, job:{ title : g1Title} } = g1;
console.log(g1Name, g1Age, g1Title);//g1 25

/**
 * 3. 参数上下文匹配
 * 在函数参数列表中也可以进行解构赋值。对参数的解构赋值不会影响 arguments 对象，但在函数签名中声明在函数体内使用局部变量
 */
let u1 = {
    name: 'u1',
    age: 25
}
function u1Copy({name, age}, out) {
    let x = {name, age, out};
    console.log(x);
    return x;
}
u1Copy(u1, 'x');

let u2 = {
    name: 'u2',
    age: 25
}
function u2Copy({name: u2Name, age: u2Aage}) {
    console.log(arguments);
    return {
        u2Name,
        u2Aage
    }
}
console.log(u2Copy(u2));
