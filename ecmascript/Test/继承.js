function Person(name, gender) {
    this.name = name;
    this.gender = gender;
}
Person.prototype.sayName = function(){
    //盗用构造函数
    console.log(this.name);
}

const GENDER_MALE = 1, GENDER_FEMALE = 0;
function Male(name){
    Person.call(this, name, GENDER_MALE);
}

function inheritPrototype(SubType, SuperType){
    //原型式继承
    let clone = Object.create(SuperType.prototype);

    //寄生式继承，增强 clone 对象
    clone.constructor = SubType;

    //原型链
    SubType.prototype = clone;
}
inheritPrototype(Male, Person);

Male.prototype.sayName = function(){
    console.log(`Hi, My Name is ${this.name}`);
}

let x = new Male('Douglas');
x.sayName();
console.log(x);



const GENDER_MALE = 1, GENDER_FEMALE = 0;
class Person{
    constructor(name, gender){
        this.name = name;
        this.gender = gender;
    }
    sayName(){
        console.log(this.name);
    }
}

class Male extends Person{
    constructor(name){
        super(name, GENDER_MALE);
    }
    sayName(){
        console.log(`Hi, My Name is ${this.name}`);
    }

    static create(){
        
    }
}
let x = new Male('Douglas');
x.sayName();

console.log(x);