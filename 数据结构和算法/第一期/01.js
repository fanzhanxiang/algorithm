// 例002 - 数组最值
// const A = [1,2,3,4,5,6]
// const max = Math.max(...A)
// 等价于: const max = Math.max.apply(null,A),早期写法
// 等价于: const max = Math.max(1,2,3,4,5,6)


// 例003 - 生成20-30之间的随机数
// Math.round(20 + Math.random() * 10)


// 004-判断一个数是否素数(从3开始，只有它自己和1是它的乘法因子)
function is_prime(n) {
    if(n <=1) {return false}
    const N = Math.floor(Math.sqrt(n))
    let is_prime = true
    for(let i =2;i<=N;i++) {
        if(n%i===0) {
            is_prime = false
            break
        }
    }
    return is_prime
}
// console.log(is_prime(37),is_prime(39),is_prime(47))
// // 求1-10000内的所有素数
// let arr = []
// for(let i = 0 ; i < 100000; i++) {
//     if(isPrime(i)) {
//     //   console.log(i)
//       arr.push(i)
//     }
// }
// console.log(arr.length,arr[5],arr[9],arr[120],isPrime(9)) /

// 用迭代器的思想做，这种方法性能会好一点(通过计算它的时间复杂度)
function* sieve_primes(n) {
    let numbers = Array.from({length:n-2},(_,i)=>i+2) // N
    // console.log(primes)
    let p = null
    while(p=numbers.shift()) {
        yield p
        numbers = numbers.filter(t=>t%p !==0)
    }
    return numbers 
}
// 那迭代器值的方法
// const it = sieve_primes(100)
// console.log([...it])
// 这种方法性质和上面的那种一样
// for(let prime of sieve_primes(100)){
//     console.log(prime)
// }

// let v = null,it=sieve_primes(100)
// while(!(v=it.next()).done) {
//     console.log(v)
// }
// 补一下array.from的知识:
// Array.from可以接受三个参数
// 我们看定义：
// Array.from(arrayLike[, mapFn[, thisArg]])
// arrayLike：被转换的的对象。
// mapFn：map函数。
// thisArg：map函数中this指向的对象。
// 第二个参数，map函数
// 用来对转换中，每一个元素进行加工，并将加工后的结果作为结果数组的元素值。
// console.log('%s', Array.from([1, 2, 3, 4, 5], (n) => n + 1))
// 结果：
// 上面的map函数实际上是给数组中的每个数值加了1。
// 2,3,4,5,6

// // the value of `v` below will be `undefined`
// const arr = Array.from({length: 5}, (_, i) =>i);
// console.log(arr)//[ 0, 1, 2, 3, 4 ]


// 005-括号匹配问题：[()]->匹配; [)]->不匹配
function is_balance(str) {
    const [first,...others] = str
    const stack = [first]
    while(others.length>0) {
        const c = stack[stack.length -1]
        const n = others.shift()
        if(!match(n,c)) {
            stack.push(n)
        } else {
            stack.pop()
        }
    }
    return stack.length === 0
}

function match(n,c) {
    return (c==='[' && n === ']') || (c === '(' && n === ')')
}

// 006 - 数组去重
// [...new Set(['a','b','c','a'])]


// 07- 数组替换splice的用法
// splice会改变原数组,splice返回的值是删除后的数组
// const arr = [1,2,3,4,5,6]
// // 替换[3,4]为x
// console.log(arr.splice(2,2,"x"),arr)
// // 删除x
// console.log(arr.splice(2,1),arr)
// // 在2的后面添加y,这里什么也没有删除，所以返回的是一个空数组
// console.log(arr.splice(2,0,'y'),arr)

//008-子数组和整除
// 写一个函数，给定一个数组，判断数组中的某一项，或者任意多项的和，是否被另一个整数整除。比如:
// solve([3,5,8],13)=true
// solve([3,9],15) =false
// solve([7,8,2],7) = true
// solve([1,2,3],6) = true
// 相当于判断子数组的余数和solve([7,8,2],7)等价于solve([0,1,2],7)//这句话是重点


// 子问题结构的解
// 数组a1,a2,...an对数字N的子数组和余数集合定义为Sn={S1,S2,S3,...Sm}.
// 比如[1,2,3]的S3={1,2,3,4,5,6},S2={1,2,3},S1={1}.Sk和Sk-1存在子问题关系
// Sk-1有p项，Sk=Sk-1 U ak % N U {1<=i<=p|(Si+ak)%N}
// N=6 S2=[1,2,3] S3=[1,2,3]U[4,5,6]
// 比如
// [1,2,3]
// S1=[1] --S2里面新进来一个2，S2里面会包含2并且和S1里面的每一项相加的结果
// S2=[1,3,2]---比如这里的3，S3会包含3和里面的S2里面的每一项相加
// S3=[1,3,2,4,5,6]

function solve(arr,N){
    const s = new Set([arr.shift() % N])
    while(arr.length >0) {
        const ak = arr.shift()
        const items = [...s]
        items.forEach(x=>{
            s.add((x+ak) % N)
        })
        s.add(ak)
    }
    return s.has(0)
}
// console.log(solve([1,2,3],6))

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
const studentsWidthGrade = students.map( student => {
    return {
        ...student,
        grade: student.score >= 60 ? '通过': '不合格'
    }
})

// 010-过滤
// 通过的学员
const passedStudents = students.filter(x=>x.score > 60)

// 组1的学员
const groupStudents = students.filter(x=>x.group_id===1)


// 011-分组
const studentsInGroups = students.reduce(
    (groups,student) => {
        groups[student.group_id]=[
            ...(groups[student.group_id]||[]),student
        ]
        return groups
    },{}
)

// 012-联合
const studentsWithGroupInfo = students.map(student => {
    const group = groups.find(g=>g.id === student.group_id)
    return {
        ...student,
        groupName: group.name
    }
})


// 013-排序
// sort方法会影响原数组
const sortedBySoreAsc = students.sort((a,b) => {
    return a.score -b.score
})
const sortBySoreDesc = students.sort((a,b) => {
    return  b.score- a.score
})

// 例020-迭代器的遍历
// const s = new Set([1,2,3,4,5])
// const it = s.values()
// console.log(it)
// SetIterator { 1, 2, 3, 4, 5 }
// console.log([...it])
// [ 1, 2, 3, 4, 5 ]

// for(const val of it) {
//     console.log(val)
// }
// 1
// 2
// 3
// 4
// 5

// let val = null
// while( !(val =it.next()).done) {
//     console.log(val)
// }
//{ value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: 4, done: false }
// { value: 5, done: false }

//021 - 生成器构造无穷斐波那契数例
// function* fibonacci() {
//     let a =1,b =1
//     yield a;yield b
//     while(true) {
//         const t = b
//         b = a + b; a = t
//         yield b
//     }
// }
// const it = fibonacci()
// // 利用斐波那数列获得10项，也可以获得多项,这里是利用Array.from()的这个属性进行迭代器的遍历
// const feb10 = Array.from(Array(10),it.next,it).map(x=>x.value)

//022 - 数组展平的生成器实现
// function* flatten(arr) {
//     for(let i = 0;i < arr.length; i++) {
//         if(Array.isArray(arr[i])) {
//             yield * flatten(arr[i])
//         } else {
//             yield arr[i]
//         }
//     }
// }

// console.log([...flatten([1,2,3,[3,4,[4,5]]])])
//[ 1, 2, 3, 3, 4, 4, 5 ]


// 例24 -笛卡儿积
// 集合XC和Y的笛卡儿积可以表示为:A×B = {(x,y)|x∈A∧y∈B},写一个函数，求数组的笛卡尔积
// 例如： [1,2] x ['a','b'] = [[1,'a],[1,'b],[2,'a],[2,'b]]
// 解题的时候需要想到的是这里面参数不止是两个数组相乘，还可能是多个数组相乘，这一点是在自己在解题的时候容易忘记的，要记住
// 这里用了一个对参数的解构，传入的参数是Matrix的每一项
function cartesianProduct(...Matrix) {
    if(Matrix.length === 0) {return []}
    if(Matrix.length === 1) {return Matrix[0]}
    return Matrix.reduce((A,B) => {
       const product = []
       for(let i = 0; i < A.length; i++){
           for(let j = 0; j < B.length; j++) {
               product.push(
                   Array.isArray(A[i]) ? [...A[i],B[j]] : [A[i],B[j]]
               )
           }
       }
       return product
    })
}
// const arr = cartesianProduct([1,2,3],['a','b','c','d'],[1,2,3,4,5,6,12,34,56,34],[1,2,3,4])

// /例027 - 阶乘
//  function factorial(n) {
//      return n === 0 ? 1 : factorial(n-1) * n
//  }
//  console.log(factorial(5)) // ->120


 // 例28 - 斐波那数列
 // 1,1,2,3,6,13,21,34,55,89,144,...
 // 指数级
//  function fibonacci(n) {
//      return n === 1 || n === 2 ? 1 : fibonacci(n-1) + fibonacci(n-2)
//  }
//  console.log(fibonacci(7)) //->13

// 对性能的思考- 斐波那数列的递归，使用的递归的方法写的时候递归的次数非常的多

// 例28 - 从低端构造递归(斐波那数列)
// 线性
// function fibonacci(n) {
//     let [a,b] = [0,1]
//     for(let i = 0;i < n ; i++) {
//         [a,b] =[b,a+b]
//     }
//     return b
// }
// console.log(fibonacci(7)) // 21  因为这里是从0开始的，所以和上面的相比较，会往后推一个



// reduce和for循环的两种写法，本质一样
// function fibonacci(n) {
//     // 这种reduce是写法自己要注意下
// return Array(n).fill().reduce(([a,b],_) => {
//     return [b,a+b]
//     // 因为这里在reduce函数执行完成之后返回的函数是亮相，这里表示的是拿的是第一项所以用[1],如果不用[1]的话这里返回的是[a,a + b],[a,a + b].[1]相当于是拿了a这一项
//   },[0,1])[1]
// }
// console.log(fibonacci(7)) // -> 21
// console.log(Array(10).fill(1)) // ->[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]

