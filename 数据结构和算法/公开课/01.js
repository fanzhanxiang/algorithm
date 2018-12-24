// 数组展平简单[[1,2],[3,4]]=>[1,2,3,4]
// let arr = [[1,2],[3,4]]
// function flattenOne(arr) {
//     return [].concat(...arr)
// }
// console.log(flattenOne(arr))

// 数组展平（递归）[[1,2],[[3],4]]=>[1,2,3,4]
// 递归需要用科学的方法思考，用科学的方法思考能减少错误
// 思路：
// 1、对数组S={A1,A2,...,An},函数F将数组展平
// 2、写出表达式： F(S)=F(a1) U F(a2) U ... U F(an);F(ai)= a (数字);F(ai)=F(ai) 数组；
// 3、用代码实现其中的逻辑并且做一些细微的调整
// let arr = [[1,2],[[3],4]]
// function flatten(arr) {
//     return [].concat(
//         ...arr.map(x=>
//             Array.isArray(x) ? flatten(x):x
//         )
//     )
// }
// console.log(flatten(arr))

// 函数节流
// 过滤掉重复的滚动事件
// 1-2-3-4-5-6-7-8-9
// 1-----------7----
// | 60ms  |60ms |
// document.addEventListener('scroll',throttle(fn))
// function  fn(arg) {
//     console.log(arg)
// }
// function throttle(func,arg,delay=60) {
//     let lock = false
//     return () => {
//         if(lock) {return}
//         func(arg)
//         lock = true
//         setTimeout(()=> {lock = false},delay)
//     }
// }

// 函数节流另一种
// 过滤掉重复的验证事件(用户输入停止后300ms触发验证)
// --1--2--3-------4--5--6-----
// ------------3-------------6---
//          |300ms|         |300ms|

// function throttle(func,delay =300, I=null) {
// // 这里的args是事件对象Event，也可以传入一个值
//     return (...args) =>{
// // clearInterval(I) 每次用户在按之前先把之前的定时器给清除掉
//         clearInterval(I)
//         I = setTimeout(fun.bind(null,...args),delay)
//         // 上面这条代码使用ES6写，比较简便一点
//         // I = setTimeout((...args) => func(...args),delay)
//     }
// }



// 柯里化(函数式编程就是没有变量定义)
// 对于curry(foo),g函数参数足够4个，就调用foo(a,b,c,d),如果小于四个就返回一个可以继续积累的参数
// 箭头函数确实是比较的简便，但是需要理解其中的原理才能够顺利使用它
// const curry = func => {
//     const g = (...allArgs) =>allArgs.length >= func.length ? func(...allArgs): 
//         (...args) => g(...allArgs,...args)
//     return g
// }
// es5的写法
// function curry(fnc) {
//     function g () {
//         // 类数组转化为数组
//         let allArgs = Array.prototype.slice.apply(arguments)
//         if(allArgs.length >= fnc.length) {
//            return fnc(...allArgs)
//         } else {
//             return function() {
//                 let args = Array.prototype.slice.apply(arguments)
//                 return g(...allArgs,...args)
//             }
//         }
//     }
//     return g
// }
// const foo = curry( (a,b,c,d) => {
//     console.log(a,b,c,d)
// })
// foo(1)(2)(3)(4)// 1,2,3,4
// foo(1)(2)(3) // 不返回
// const f = foo(1)(2)(3)
// f(5) // 1 2 3 5

// 这里补充一下关于箭头函数的一些知识
// 剪头函数不绑定this，arguments
// function add(a, b) {
//     return a + b;
// }

// function curryingAdd(a) {
//     return function(b) {
//         return a + b;
//     }
// }

// const newAdd = a => b => a + b
// // 箭头函数中argument的用法
// // arguments里面拿到的东西为什么变成字符串了，所以这里需要使用Number转一下。
// const sum = (...a) => (...b) => Number([a][0]) + Number([b][0])
// console.log(add(1, 2)); // 3
// console.log(curryingAdd(1)(2)); // 3
// console.log(newAdd(11)(9)); // 20
// console.log(sum(11)(9)); // 20



