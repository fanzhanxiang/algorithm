// 1、求数组的最大值
// const A = [1,3,34,45,56,7,8,98,8,54,67,56]
// let Max = Math.max(...A)
// console.log(Max)

//2、求20-30间的随机整数
// Math.random()这个方法是生成0-1之间的随机数
// Math.round() 就是类似于生活中的四舍五入方法，是往数大的那一方靠近的，比如"-1.6",四舍五入之后的值为"-1"
// console.log(Math.round(20+Math.random()*10))

// 3、判断一个数是否是素数,这是一个比较传统的方法
// function isPrime(number) {
//     // 是否为number类型，是否为整数
//     if(typeof number !== 'number' || !Number.isInteger(number)) {
//         return false
//     }
//     // 小于w的数不是素数
//     if(number < 2) {
//         return false
//     }
//     // 2是素数，能被2整除的数不是素数
//     if(number === 2) {
//         return true
//     } else if(number % 2 === 0){
//         return false
//     }
//     // 依次判断能否被奇数整除，最大循环次数为改数值开方
//     const sqrtMoot = Math.sqrt(number)
//     for(let i = 3; i <= sqrtMoot; i+=2) {
//         if(number % i === 0) {
//             return false
//         } 
//     }
//     return true
// }
// console.log(isPrime(245))
// // 求1-10000内的所有素数
// let arr = []
// for(let i = 0 ; i < 100000; i++) {
//     if(isPrime(i)) {
//     //   console.log(i)
//       arr.push(i)
//     }
// }
// console.log(arr.length,arr[5],arr[9],arr[120],isPrime(9)) //

// 下面这个方法是一个比较有思想的方法,用Math.floor(Math.sqrt(n))这一行代码节省掉了很多不必要的判断;
// 还有break这里也是值得学习的
// function isPrime1(n) {
//     if(n <= 1) {
//         return false
//     }
//     let is_prime = true
//     const sqrtMoot = Math.floor(Math.sqrt(n))
//     for(let i =2 ;i< = sqrtMoot;i++) {
//         if(n % i === 0) {
//             is_prime = false
//             break
//         }
//     }
//     return is_prime
// }
// 求100000以内的所有素数
// let arr1 = []
// for(let i =0 ; i < 100000; i++) {
//     if(isPrime1(i)) {
//         arr1.push(i)
//     }
// }
// console.log(arr1.length,arr1[12],arr1[345],arr1[7],isPrime1(9))

// 5 - 括号的匹配问题,中间只有[]哥(),判断括号两边是不是平衡的，比如[()]是平衡的，[(]不是平衡的
// 基于栈入栈出的解法
// function match(n,c) {
//     return (n === '[' && c === ']') || (n === '(' && c === ')')
// }
// function isBlance(str) {
//     // 这里是做一个结构，分别是把str解构成字符串first和数组others
//     const [first,...others] = str
//     const stack = [first]
//     while (others.length) {
//         const n = stack[stack.length-1]
//         const c = others.shift()
//         if(!match(n,c)) {
//            stack.push(c)
//         } else  {
//            stack.pop()
//         }
//     }
//     return stack.length === 0
// }
// console.log(isBlance('[[[[(())]]]]'),isBlance('(([]]))'))


// 6 - 数组去重
// const arr = [1,2,3,4,2,2,1,3,2,2,4,6,87,87,89,5,4,2,12,1,23,54,6,87,8,9,6,4,3,2,2,2,2]
// let a =[...new Set(arr)]
// console.log(a,arr)


// - 数组替换splice的用法
// splice会改变原数组,splice返回的值是删除后的数组
// const arr = [1,2,3,4,5,6]
// // 替换[3,4]为x
// console.log(arr.splice(2,2,"x"),arr)
// // 删除x
// console.log(arr.splice(2,1),arr)
// // 在2的后面添加y,这里什么也没有删除，所以返回的是一个空数组
// console.log(arr.splice(2,0,'y'),arr)



// 例009-012,做一个类似于MSQ的数据处理
const students = [
    {id: 1, name: 'Ruler', group_id: 1, score: 92},
    {id: 2, name: 'Super', group_id: 1, score: 81},
    {id: 3, name: 'Dog', group_id: 1, score: 30},
    {id: 4, name: 'Beaty', group_id: 2, score: 75},
    {id: 5, name: 'Jason', group_id: 2, score: 88},
    {id: 6, name: 'Water', group_id: 2, score: 59},
    {id: 7, name: 'Code', group_id: 3, score: 21},
    {id: 8, name: 'Wanderful', group_id: 3, score: 98},
    {id: 9, name: 'Caous', group_id: 3, score: 67}
]

const groups = [
    {id: 1, name: 'Red'},
    {id: 2, name: 'Yellow'},
    {id: 3, name: 'Green'}
]

// 009 -投射
// >60分及格
// const studentsWithGrads = students.map( student => {
//   return {
//       // ...不仅可以解构对象，还可以解构数组
//       ...student,
//       grade:student.score > 60 ? "通过" : "不通过"
//   }
// })
// console.log(studentsWithGrads)

// 0010 - 过滤
// 通过的学员
// const passStudent = students.filter(student => student.score > 60)
// console.log(passStudent)
// // 组1的学员
// const groupStudent = students.filter(student => student.group_id === 1)
// console.log(groupStudent)


// 0011 - 分组(这里是根据group_id进行分组)
// const studentsIngroup = students.reduce(
//     (groups,student) => {
//         groups[student.group_id] = [...(groups[student.group_id] || []), student]
//         return groups
//     },{}
// )
// console.log(studentsIngroup)

// 0012 - 联合(group_id与groups.id相同的联合起来)
// const studentsWithGroupInfo = students.map(student => {
//     const group = groups.find(group => group.id === student.group_id)
//     return {
//         ...student,
//         groupName: group.name
//     }
// })
// console.log(studentsWithGroupInfo)



// 例 021 - 生成器构造无穷斐波那数例
// function *fibonacci() {
//     let a = 1
//     let b = 1
//     yield a
//     yield b
//     while(true) {
//         const t = b
//         b = a + b
//         a = t
//         yield b
//     }
// }
// const it = fibonacci()
// const feb20 = Array.from(Array(20),it.next,it).map(x => x.value)
// console.log(feb20)

// 补一下关于const的知识点
// 1、用const 声明一个普通的变量，那么这个变量的值就不可更改了
// 2、用const 声明一个对象、数组、函数类型的值，里面的值是可以改变的



// 例24 -笛卡儿积
// 集合XC和Y的笛卡儿积可以表示为:A×B = {(x,y)|x∈A∧y∈B},写一个函数，求数组的笛卡尔积
// 例如： [1,2] x ['a','b'] = [[1,'a],[1,'b],[2,'a],[2,'b]]
// 解题的时候需要想到的是这里面参数不止是两个数组相乘，还可能是多个数组相乘，这一点是在自己在解题的时候容易忘记的，要记住
// 这里用了一个对参数的解构，传入的参数是Matrix的每一项
// function cartesianProduct(...Matrix) {
//     if(Matrix.length === 0) {return []}
//     if(Matrix.length === 1) {return Matrix[0]}
//     return Matrix.reduce((A,B) => {
//        const product = []
//        for(let i = 0; i < A.length; i++){
//            for(let j = 0; j < B.length; j++) {
//                product.push(
//                    Array.isArray(A[i]) ? [...A[i],B[j]] : [A[i],B[j]]
//                )
//            }
//        }
//        return product
//     })
// }
// const arr = cartesianProduct([1,2,3],['a','b','c','d'],[1,2,3,4,5,6,12,34,56,34])
// console.log(arr)


