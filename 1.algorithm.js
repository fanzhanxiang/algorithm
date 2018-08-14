//例001 -- 分页计算
// 在一个分页表格中，给定每页显示条数(pageSize)和元素的序号(index),求页码
// const pageNu = Math.ceil((index+1)/pageSize)
// pageSize = 10
// 0->1
// 9->1
// 10->2
// 11->2

// 例002 数组最值
// const A = [1,2,3,4,5,6]
// const Max = Math.max(...A)
// 要熟悉的使用这种语法，这里是解构数组，还有很多其他方面的使用场景



// 例003 - 生成20-30之间的随机整数
// Math.round(20 + Math.random()*10)



// 例004 - 判断一个属是否是素数(素数是从2开始计算的)
// function is_prime(number) {
//     // 判断输入是否为number类型，是否为整数
//     if (typeof number !== 'number' || !Number.isInteger(number)) {
//         return false
//     }
//     //小于2都不是素数
//     if (number < 2) {
//         return false
//     }
//     //2是素数，被2整除的都不是素数
//     if (number === 2) {
//         return true
//     } else if (number % 2 === 0) {
//         return false
//     }
//     // 依次判断是否能被奇数整除，最大循环为数值的开方
//     let squareRoot = Math.sqrt(number)
//     for (let i = 3; i <= squareRoot; i += 2) {
//         if (number % i === 0) {
//             return false
//         }
//     }
//     return true
// }
// console.log(is_prime(39), is_prime(37))

// function is_prime(n) {
//     if(n<=1){return false}
//     const N =Math.floor(Math.sqrt(n))
//     let is_prime = true
//     for(let i =2;i<=N;i++){
//         if(n % i ===0) {
//             is_prime = false
//             break
//         }
//     }
//     return is_prime
// }
// // for(let i =0;i<10000;i++){
//     if(is_prime(i)){console.log(i)} //可以用这种方法求一万以内的所有素数
// }  




// 例005 - 括号的匹配问题
// .给定一个括号表达式，中间只有[]和(),判断这个表达式两边括号是不是平衡的?比如[[(())]]是平衡的，[([)]就是不平衡的
// 基于栈的解法

// function match(n,c){
//     return (c === '[' && n===']') || (c ==='(' && n === ')')
// }


// function is_balance(str) {
//     // ...others解构出来的得到的others是一个数组，然后再通过...把数组依次解构在数组中
//   const [first,...others] = str
//   const stack = [first]
//   while(others.length > 0){
//       const c = stack[stack.length - 1]
//       const n = others.shift()
//       if(!match(n,c)){
//         stack.push(n)
//       } else {
//         stack.pop(c)
//       }
//   }
//   return stack.length === 0
// }

// console.log(is_balance('[(]'),is_balance('[([(())])]'))



// 例006 - 数组去重
// const arr = [...new Set([1,2,3,4,5,45,2,3,1,2,3,8])]
// console.log(arr)


//例008 - 数组的替换(splice)的用法
// splice会改变原数组
// const arr = [1,2,3,4,5,6,7]
// 替换[3,4] => 'x'
// console.log(arr.splice(2,2,'x'),arr)
// 删除'x'
// arr.splice(2,1)
// console.log(arr) //->[ 1, 2, 5, 6, 7 ]
// 在2后面添加'y'
// arr.splice(2,0,'y') 
// console.log(arr)  //->[ 1, 2, 'y', 5, 6, 7 ]



// 例009-012类似SQL的数据处理
// const students = [
//     {id: 1, name: 'Ruler', group_id: 1, score: 92},
//     {id: 2, name: 'Super', group_id: 1, score: 81},
//     {id: 3, name: 'Dog', group_id: 1, score: 30},
//     {id: 4, name: 'Beaty', group_id: 2, score: 75},
//     {id: 5, name: 'Jason', group_id: 2, score: 88},
//     {id: 6, name: 'Water', group_id: 2, score: 59},
//     {id: 7, name: 'Code', group_id: 3, score: 21},
//     {id: 8, name: 'Wanderful', group_id: 3, score: 98},
//     {id: 9, name: 'Caous', group_id: 3, score: 67}
// ]

// const groups = [
//     {id: 1, name: 'Red'},
//     {id: 2, name: 'Yellow'},
//     {id: 3, name: 'Green'}
// ]


// 009 - 投射（Projection)
// >60合格
// const studentsWithGrade = students.map(student => {
//     return {
//         // 知识点，对象也可以用解构
//         ...student,
//         grade: student.score >=60 ? '通过': '不合格' 
//     }
// })
// console.log(studentsWithGrade)

// 例010 - 过滤
// 通过的学员
// const passedStudents = students.filter(x => x.score > 60)
// console.log(passedStudents)
// 组1的学员
// const groupstudents = students.filter(x=>x.grounp_id===1)
// console.log(groupstudents)



// 例011-分组(这个问题还没有解决,x现在这个问题解决了，单词写错了)
// const studentsInGroups = students.reduce(
//     (groups,student) => {
//         groups[student.group_id] = [...(groups[student.group_id]||[]),student]
//          // [...(groups[student.group_id]||[]),student] 这行代码的意思是每次在解构的时候先把对象属性只为
//          // student.group_id的属性值拿出来，然后载荷student一起合并在这个属性值中
//       return groups
//     }, 
//     {}
// )
// console.log(studentsInGroups)


// 例012 - 联合
// const studentWithGroupInfo = students.map(student => {
//     const group = groups.find(g => g.id === student.group_id)
//     return {
//         ...student,
//         groupName: group.name
//     }
// })
// console.log(studentWithGroupInfo)



// Ramda Library - 一个实用的js函数库

// import R from 'ramda' //这种方法在node的环境下不能运行
// const R = require('ramda')
// 例13 -zip
// 两两元素配对
// let paired = R.zip([1,2,3],['a','b','c'])
// console.log(paired) // [ [ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ] ]


// 例014 - 数组展平
// let flatten = R.flatten([12,[34,[45,56,[45,34]],768,54],[89,6,8,80]])
// console.log(flatten) //[ 12, 34, 45, 56, 45, 34, 768, 54, 89, 6, 8, 80 ]


// 015 -converge
// 多次聚合再进行聚合 （R.divide)是做除法
//=>下面这行代码代表的是R.sum除以R.length
// let average = R.converge(R.divide,[R.sum,R.length])
// console.log(average([1,2,3,4,5,6,7])) //->4
// let StrangConcat = R.converge(R.concat, [R.toUpper,R.toLower])
// console.log(StrangConcat('Yellol')) //=> YELLOLyellol

// 例017 - intersperse
// 插入分隔符
// let intersperse = R.intersperse('n',['ba','a','a'])
// console.log(intersperse) //->[ 'ba', 'n', 'a', 'n', 'a' ]

// 018 -groupBy
// 之前分组的代码可以简化为
// let groupBy = R.groupBy(student => student.group_id,students)
// console.log(groupBy)

// { '1':
// [ { id: 1, name: 'Ruler', group_id: 1, score: 92 },
// { id: 2, name: 'Super', group_id: 1, score: 81 },
// { id: 3, name: 'Dog', group_id: 1, score: 30 } ],
// '2':
// [ { id: 4, name: 'Beaty', group_id: 2, score: 75 },
// { id: 5, name: 'Jason', group_id: 2, score: 88 },
// { id: 6, name: 'Water', group_id: 2, score: 59 } ],
// '3':
// [ { id: 7, name: 'Code', group_id: 3, score: 21 },
// { id: 8, name: 'Wanderful', group_id: 3, score: 98 },
// { id: 9, name: 'Caous', group_id: 3, score: 67 } ] }





// 迭代器和生成器
// .迭代器Iterator(也被称为游标Cursor),是一中设计模式
// .迭代器提供了一种遍历内容的方法(比如JavaScript迭代器中的next),而不需要关心内部的构造
// .生成器（Generator）本身就是一种设计模式，用于构造复杂的对象。JavaScript中是生成器，用于构造迭代器



// 例020 - 迭代器的遍历
// 下面这两种(s,it)方式都能够通过...的方式解构出来
// const s = new Set([1,2,3,4,5])
// const it = s.values()
// let val = null
// while(!(val=it.next()).done) {
// //   console.log(val)->
// //   { value: 1, done: false }
// //   { value: 2, done: false }
// //   { value: 3, done: false }
// //   { value: 4, done: false }
// //   { value: 5, done: false }
// }

// const it1 = s.values()
// console.log([...it1])// [ 1, 2, 3, 4, 5 ]
// const it2 = s.values()
// for(const val of it2){
//     console.log(val)//->
//     // 1
//     // 2
//     // 3
//     // 4
//     // 5
// }

// Array.from(arrayLike,mapFn,thisArg)
// .arrLike:想要转换成数组的数组对象或可迭代对象
// .mapFn:如果制定了该参数，新数组中的每个元素会执行该回掉函数
// .thisArg：可选参数，执行回掉函数mapTh的this对象



// 例 21-生成器构造无穷斐波那契数列


// const it3 =s.values()
// const arr = Array.from(Array(5),it3.next,it3).map(x => x.value)
// console.log(arr) //[ 1, 2, 3, 4, 5 ]


// function *foo(x) {
//     var y = x * (yield "Hello")  // <--yield一个值
//     return y
// }

// var  it = foo(6)
// var res = it.next() // 第一个next(),并不传入任何东西
// var value1 = res.value
// console.log(value1)   //"Hello"
// res = it.next(7) // 向等待的yield传入7
// var value2 = res.value
// console.log(value2) // 42


// 第一个next()调用(没有参数的)基本上就是在提出一个问题:'生成器*foo要给我的下一个值是什么'。
//  谁来回答这个问题呢？第一个yield "hello"表达式。所以这里并没有不匹配
// 但是，稍等!与yield语句的数量相比，还是多了一个额外的next(),所以最后一个it.next(7)调用再次提出了这样的问题；
//  生成器将要产生的下一个值是什么。但是没有yield语句来回答这个问题了，是不是？那么谁来回答呢？
// return语句回答这个问题！
// 如果你的生成器中没有return的话---在生成器中和在普通函数中一样，
// return当然不是必须的--总有一个假定的/隐式的return;(也就是returnundefined)
// 它会在默认情况下回答最后的it.next(7)调用提出的问题。



// 有一个细微之处很容易忽略：每一次构建一个迭代器，实际上就隐式构建了生成器的一个实例，通过这个迭代器来控制的是这个生成器实例
// 同一个生成器的多个实例可以同时运行，他们可以彼此交互

// function *foo() {
//     var x = yield 2
//     z++
//     var y =yield (x * z)
//     console.log(x,y,z)
// }
// var z =1
// var it1 = foo()
// var it2 = foo()
// var val1 = it1.next().value // 2 <--yield 2
// var val2 = it2.next().value // 2 <-- yield 2
// // console.log(val1,val2) //--> 2 2
// val1 = it1.next(val2 * 10).value // 40 <--x:2,z:2
// val2 = it2.next(val1 * 5).value // 600 < -- x:200,z:3
// // console.log(val1,val2) //-> 40 600
// it1.next(val2/2)
// // y:300
// // 20 300 3
// it2.next(val1 / 4)
// y:10
// 200 10 3

//  这里需要注意的是需要it.next()执行三次最后才会打出想要的结果值，因为yield会暂停两次，所以在次三次的是hi偶才会打出想要的结果值



//->下面这是一个测试张家口是懂的一个小栗子
// var a =1;
// var b =2
// function *foo() {
//   a++
//   yield
//   b = b * a
//   a = (yield b) + 3
// }
// var it = foo()
// console.log(it.next().value) //->undefined
// console.log(it.next().value) //->4



// 例21 - 生成器构造无穷斐波那契数列

// function *fibonacci() {
//     let a = 1
//     let b = 1
//     yield a
//     yield b
//     // 这里是一个比较有深度的用法，在执行玩第三次next之后，函数停止了下来，第四次next之后，函数继续执行
//     // 执行到下一样之后，发现这个函数是一个循环体，然后又返回去执行，直到下一个yield之后函数又停止了下来，所以就这样的
//     // 一直这样执行中，就这样一直执行到了最后！你想执行多少次就调用多少次next，因为next会在碰到yield之后就返回停止在啊那里
//     // 把yield后面 的代码返回不执行代码了
//     while (true) {
//        const t = b
//        b = a + b
//        a = t
//        yield b
//     }
// }
// const it = fibonacci()
// const feb10 = Array.from(Array(10), it.next, it).map(x=>x.value)
// console.log(feb10) //[ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ]



// 例24 -笛卡儿积
// 集合XC和Y的笛卡儿积可以表示为:A×B = {(x,y)|x∈A∧y∈B},写一个函数，求数组的笛卡尔积
// 例如： [1,2] x ['a','b'] = [[1,'a],[1,'b],[2,'a],[2,'b]]
// function cartesian_product(...Matrix) {
//     if(Matrix.length === 0) return []
//     if(Matrix.length === 1) return Matrix[0]
//     //使用reduce是为了处理三个以上的数组相乘，这里还是比较巧妙的
//     return Matrix.reduce((A,B) => {
//        const product = []
//        for(let i = 0; i < A.length; i++) {
//            for (let j = 0; j < B.length; j++) {
//                product.push(
//                    Array.isArray(A[i]) ? [...A[i],B[j]] : [A[i], B[j]]
//                )
//            }
//        }
//        return product
//     })
// }
// console.log(cartesian_product([1,2],['a','b'],[12,[12,[123,[232]]]]))


// 例25 - 中文排序
// 将含有中文字符的数组按照拼音进行排序:
// let sort  = ['王成成','王峰','蒋雪', '李明'].sort((a,b) => a.localeCompare(b, 'zh'))
// // ->这个方法需要注意的是在浏览器环境中和在node环境中最后输出的结果是不一样的，下面的结果是在浏览器中输出的结果
// console.log(sort) // ->["蒋雪", "李明", "王成成", "王峰"]



// 什么时候需要拷贝数据？
// JavaScript中的push/pop/shift/unshift/splice等都是在原始数据上进行修改，caoncat/slice/map/reduce都会对原始数据进行浅拷贝
