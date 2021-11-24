# 第 10 章 函数

## 本章内容

    函数表达式、函数声明及箭头函数
    默认参数及扩展操作符
    使用函数实现递归
    使用必报实现私有变量

每个函数都是 Function 类型对实例，函数实际上是对象，因为函数是对象，所以函数名就是指向函数对象的指针

## 函数声明
``` javascript
function sum(){
}
```

## 函数表达式
``` javascript
let sum = function(){

}
```

## 箭头函数
```javascript
let sum = (num1, num2) => sum1 + num2;
```

## Function 构造函数
```javascript
let sum = new Function('num1', 'num2', 'num1 + num2');
```