/**
 * 8.3.5 寄生式继承（parasitic inheritance）
 * 与原型式继承比较接近的一种继承方式是寄生式继承（parasitic inheritance），
 * 也是 douglas crockford 提倡的一种模式。
 * 寄生式继承背后的思路类似于寄生构造函数和工厂模式：创建一个实现继承的函数，
 * 以某种方式增强对象，然后返回这个对象。
 */
function createAnother(original) {
    let clone = Object.create(original);
    //增强对象
    clone.sayHi = function(){
        console.log('hi');
    }
    return clone;
}
let person = {
    name: 'o',
    colors: ['red', 'blue']
}

let anotherPerson = createAnother(person);
anotherPerson.colors.unshift('yellow', 'white');
console.log(anotherPerson);

/*
    寄生式继承同样适合主要关注对象，而不在乎类型和构造函数的场景。
    Object.create 函数不是寄生式继承必需的，任何返回新对象的函数都可以在这里使用。
 */