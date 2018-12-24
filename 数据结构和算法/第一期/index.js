// const map1 = new Map();
// map1.set('k1', 1);
// map1.set('k2', 2);
// map1.set('k3', 3);
// console.log('%s', Array.from(map1),map1)
// console.log(Array.from(map1),map1)
// console.log(Array.from([1, 2, 3, 4, 5], (n) => n + 1))
// console.log(Array.from('hello world'))


//Array.from的用法
// 类数组对象
// 一个类数组对象必须要有length，他们的元素属性名必须是数值或者可以转换成数值的字符。
// 注意：属性名代表了数组的索引号，如果没有这个索引号，转出来的数组中对应的元素就为空。
// console.log(Array.from({
//     0: '0',
//     1: '1',
//     3: '3',
//     length:6
//   }))
// 打出来的值为[ '0', '1', undefined, '3', undefined, undefined ]

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
function* sieve_primes(n) {
    let numbers = Array.from({length:n-2},(_,i)=>i+2) // N
    // console.log(primes)
    let p = null
    while(p=numbers.shift()) { // 
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

let v = null,it=sieve_primes(100)
while(!(v=it.next()).done) {
    console.log(v)
}

