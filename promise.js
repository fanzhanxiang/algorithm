// 全排列简单解
//P(A) = a1P(A-a1)ua2P(A-a2)U...UanP(A-an)
//P[1,2,3,4] = 1 P [2,3,4] U 2P[1,3,4] 3P[1,2,4]U 4 P[1,2,3]
// function perm(A) {
//     if(A.length === 1) {return [A]}
//     return [].concat(...A.map((a,i)=>perm(A.slice(0,i).concat(A.slice(i+1))).map(p=>[a].concat(p))))
// }
// console.log(perm(['a','b','c']))


// function* perm(A,N) {
//     if(!N) {N = A.length}
//     if(N ===  1) {yield A.slice();return}
//     for(let i =0;i<N;i++) {
//         // 
//         swap(A,i,N-1)
//         yield *perm(A,N-1)
//         swap(A,i,N-1)
//     }
// }
// function swap(A,i,j) {
//     [A[i],A[j]] = [A[j],A[i]]
// }


// let  myFirstPromise = new Promise(function(resolve,reject){
//     // 当异步代码执行成功时，我们才会调用resolve(...),当异步代码执行失败时我们调用reject
//     // 在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XMR请求或者是HTML5的一些API方法
//     setTimeout(function() {
//       resolve("成功!");// 代码成功执行
//     },250)
// })
// myFirstPromise.then(function(successMessage){
//     // successMessage的值是上面resolve方法传入的值
//     // successMessage参数不一定非要字符串类型，治理只是举个例子
//     console.log("Yay!" + successMessage)
// })


// async function testAsync() {
//     return 'hello async'
// }
// const result = testAsync()
// result.then(v=>{
//     console.log(v)
// })

// function getSomething() {
//     return 'something'
// }
// async function testAsync() {
//     return Promise.resolve('hello async')
// }
// async function test() {
//     const v1 = await getSomething()
//     const v2 = await testAsync()
//     console.log(v1,v2)
// }
// test()

// function takeLongTime() {
//     return new Promise(resolve => {
//         setTimeout(() => resolve('long_time_value'),1000)
//     })
// }
// takeLongTime().then(v => {
//     console.log("got",v)
// })

// function takeLongTime() {
//     return new Promise(resolve => {
//         setTimeout(() => resolve('long_time_value'),1000)
//     })
// }

// async function test() {
//     const v = await takeLongTime()
//     console.log('await',v)
// }
// test()

// function takeLongTime(n) {
//     return new Promise(resolve => {
//         setTimeout(() => resolve(n + 200), n);
//     });
// }

// function step1(n) {
//     console.log(`step1 with ${n}`);
//     return takeLongTime(n);
// }

// function step2(n) {
//     console.log(`step2 with ${n}`);
//     return takeLongTime(n);
// }

// function step3(n) {
//     console.log(`step3 with ${n}`);
//     return takeLongTime(n);
// }

// 现在使用Promise方式实现三个步骤的处理
// function doIt() {
//     console.time("doIt");
//     const time1 = 300;
//     step1(time1)
//         .then(time2 => step2(time2))
//         .then(time3 => step3(time3))
//         .then(result => {
//             console.log(`result is ${result}`);
//             console.timeEnd("doIt");
//         });
// }

// doIt();

// async function doIt() {
//     console.time("doIt");
//     const time1 = 300;
//     const time2 = await step1(time1);
//     const time3 = await step2(time2);
//     const result = await step3(time3);
//     console.log(`result is ${result}`);
//     console.timeEnd("doIt");
// }

// doIt();


//  现在把业务要求改一下，仍然是三个步骤，但每一个步骤都需要之前每个步骤的结果。

function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(m, n) {
    console.log(`step2 with ${m} and ${n}`);
    return takeLongTime(m + n);
}

function step3(k, m, n) {
    console.log(`step3 with ${k}, ${m} and ${n}`);
    return takeLongTime(k + m + n);
}

async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time1, time2);
    const result = await step3(time1, time2, time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}
doIt();
console.log('你好世界这是在之前执行的')
// 除了觉得执行时间变长了之外，似乎和之前的示例没啥区别啊！别急，认真想想如果把它写成 Promise 方式实现会是什么样子？
// function doIt() {
//     console.time("doIt");
//     const time1 = 300;
//     step1(time1)
//         .then(time2 => {
//             return step2(time1, time2)
//                 .then(time3 => [time1, time2, time3]);
//         })
//         .then(times => {
//             const [time1, time2, time3] = times;
//             return step3(time1, time2, time3);
//         })
//         .then(result => {
//             console.log(`result is ${result}`);
//             console.timeEnd("doIt");
//         });
// }

// doIt();
// 有没有感觉有点复杂的样子？那一堆参数处理，就是 Promise 方案的死穴—— 参数传递太麻烦了，看着就晕！