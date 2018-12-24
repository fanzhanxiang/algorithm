// 最简单的时间复杂度为O(n)的算法：“查找最大值”
function find_max(arr) {
    let max = Number.NEGATIVE_INFINITY
    // console.log(max) // -Infinity
    for(let i=0;i<arr.length;i++) {
        max = (arr[i]>max?arr[i]:max)
    }
    return max
}
// console.log(find_max([1,2,3]))


// 循环不变式:每次循环结束，存在一个已经排序的列表和一个未排序的列表，j指向下一个未排序的数字
// 插入排序的时间复杂度是O(n^2)(*)(往最坏的情况考虑1 2 3 4 5 6 +是等差数列)
function insertino_sort(A) {
    for(
        let j=1;         // 1
        j<A.length;      // N
        j++              // N-1
    ) {
        // 这个循环将抓到的牌插入合适的位置,key这里相当于是拿到某个值
        const key = A[j] // N-1
        let i = j -1     // N -1
        while(i>=0 && A[i] > key ) {  // MK
            // A[i + 1] = A[i] 这行代码相当于是给插入的这个元素腾位置.
            A[i + 1] = A[i]          // (MK-1)
            i--                      // (MK -1)
        }
        // while循环里面的i和下面这行A[i+1]里面的i是不一样的，这一点自己不要犯迷糊
        // A[i],key成立之后，把key这个值插在A[i+1]这里，需要想清楚的是不会覆盖的，因为有一个i--
        A[i + 1] = key              // N -1
    }
}
// const arr = [5,4,3,2,1]
// insertino_sort(arr)
// console.log(arr)

// Divide&Conquer(分治)
// 分:将问题分解成子问题，字问题规模变小但问题不变
// 治:递归解决子问题，子问题的子问题，当子问题足够小，就直接解决
// 合:合并子问题的解
// 代表：归并排序、快速排序


// 另一个O(n^2)的算法 ----冒泡排序
function bubble_sort(A) {
    // 循环不变式为: |---未排序---|---已排序的最大值---|
    for(let i=A.length;i>0;i--) {// 这是一个反循环
        for(let j =1;j<i;j++) {// 这是一个正循环
            // A[j] A[j-1]比较
            if(A[j]<A[j-1]) {
                swap(A,j,j-1)
            }
        }
        // 循环不变式(要找到循环不变式是什么):这里的循环不变式是保证最右边是最大值
    }
}
function swap(A,j,i) {
    const t = A[j]
    A[j] = A[i]
    A[i] = t
}
// const arr = [1,3,4,3,2,1,6]
// bubble_sort(arr)
// console.log(arr)


// O(n)的算法---桶排序
