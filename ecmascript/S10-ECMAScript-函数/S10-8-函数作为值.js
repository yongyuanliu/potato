/*
    10.8 函数作为值
    函数名时 ECMAScript 中的变量，所以函数可以用在任何可以使用变量的地方。可以把函数作参数传递，也可以在
        函数中返回另一个函数
 */
function callFunction(someFunction, args){
    return someFunction(args); // 作值返回
}

function add10(number) {
    return number + 10;
}

console.log(callFunction(add10, 10)); // 20


function createComparisonFunction(propertyName) {
    console.log(arguments);
    return function (obj1, obj2) {
        console.log(arguments);
        let v1 = obj1[propertyName];
        let v2 = obj2[propertyName];
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }
}
let data = [
    {
        name: 'z', 
        age: 25
    },
    {
        name: 'o', 
        age: 28
    },
];
data.sort(createComparisonFunction('name'));
console.log(data[0]);// Object { name: "o", age: 28 }
data.sort(createComparisonFunction('age'));
console.log(data[0]);// Object { name: "z", age: 25 }