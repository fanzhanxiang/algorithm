// 生成数字、随机打乱、输出
function gen(w) {
    const arr = []
    for(let i=0;i < w *1000;i++) {
        arr[i] = i+1
    }
    fisher_yates_shuffle(arr)
    return arr
}

// 0(n)打乱算法
function fisher_yates_shuffle(arr) {
    for(let i=0;i<arr.length-1;i++) {// 2N +2(但是为什么我感觉是2N因为i<arr.length-1执行了N次，i=0和i++共执行了N次)
        // 从[i,arr.length-1]中取一个整数
        // [i,N]
        const j = i +Math.floor(Math.random()*(arr.length-i));//为什么上面要加一个冒号下面这行代码才能够运行了，可能是需要一个结束条件吧
        // c1*N
        // c2*N
        [arr[i],arr[j]] = [arr[j],arr[i]]
    }
    return arr
}
// 
function shuffle_simple(arr){
    return arr.sort(()=>Math.random()-.5)
}
// console.log(gen(100))