/*
    10.2 函数名
    因为函数名就是指向函数但指针，一个函数可以有多个名称。
 */
function sum(num1, num2) {
    return num1 + num2;
}
console.log(sum(10, 10));

let anotherSum = sum;
console.log(anotherSum(10, 10));

sum = null;// sum 是指向 sum函数的指针
console.log(anotherSum(10, 10));

/*
    ES6 所有函数偶暴露一个只读的 name 属性，该属性是一个字符串化的变量名
    函数没有名称也会显示成空字符串
    使用 Function 构造函数创建的，name 为 anonymous
 */
function foo(params) {};
let bar = function(){};
let baz = () => {};
console.log(foo.name);//foo
console.log(bar.name);//bar
console.log(baz.name);//baz
console.log( (()=>{}).name );//<empty string>
console.log((new Function()).name);//anonymous

/*
    如果函数是一个获取函数，设置函数或者是使用 bind() 实例化，那么标识符前面会假设一个前缀
 */
function foo(params) {}
console.log(foo.bind(null).name);//bound foo
let dog = {
    years: 1, 
    get age(){
        return this.years;
    },
    set age(v){
        this.years = v;
    }
}
let propertyDescriptor = Object.getOwnPropertyDescriptor(dog, 'age');
console.log(propertyDescriptor.get.name, ',', propertyDescriptor.set.name);//get age , set age