/**
 * 最大堆(一种二叉树)
 * 最大堆是堆的两种形式之一。
根结点（亦称为堆顶）的关键字是堆里所有结点关键字中最大者，称为大根堆，又称最大堆（大顶堆）。
大根堆要求根节点的关键字既大于或等于左子树的关键字值，又大于或等于右子树的关键字值。
 */

 function left(i) { return i * 2 + 1 }
 function right(i) { return i * 2 + 2 }
 function swap(arr,i,j){
    const t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
 }
 class Heap{
    constructor(arr) {
        this.data = [...arr]
        this.size = this.data.length
    }

    /**
     * 
     * 重构堆
     * [1,2,3,4,5]
     *      1
     *    2   3
     *  4  5
     */
    rebuildHeap() {
        // L是堆的节点数
        const L = Math.floor(this.size / 2)
        for(let i = L-1; i>=0 ; i--) {
            this.maxHeaify(i)
        }
    }

    // 是否满足最大堆的性质
    isHeap() {
        // L是堆的节点数
        const L = Math.floor(this.size/ 2)
        for(let i = 0;i < L;i++) {
            const l = this.data[ left(i) ] || Number.MIN_SAFE_INTEGER
            const r = this.data[ right(i) ] || Number.MIN_SAFE_INTEGER
            const max = Math.max(this.data[i],l,r)
            if(max !== this.data[i]) {
                return false
            }
        }
        return true
    }

    // 堆排序
    sort() {
        for(let i = this.size - 1; i >= 0; i--) {
            // 第一个和最后一个交换
            swap(this.data, 0, this.size -1)
            // 删除后的那个元素、也就是最大的那个、已经排好序的那个
            this.size -- 

            // console.log(this.size)// 这个算法还是比较牛逼的，这里的this.size尽然变了
            // 每次都是第一个不满足
            this.maxHeaify(0) // O(n) ~ nlog(n)
        }
    }
    /**
     * 假设堆其他地方都满足性质
     * 唯独第i个堆节点不满足堆性质
     */
     maxHeaify(i) {

        let max = i

        // 在sort的时候回用this.size--
        //  所以这里做边界判断，这里比较巧妙的是后面再做交换之后就不会再查已经放在最后面的那个了
        if(i >= this.size) {
            return
        }
        /**求左右节点较大的序号 */
        const l = left(i)
        const r = right(i)
        if(l < this.size && this.data[l] > this.data[max]) {
            max = l
        }

        if(r < this.size && this.data[r] > this.data[max]) {
            max = r
        }

        // 如果当前节点较大，已经是最大堆(这里需要看懂的每一次这个方法在执行完成的时候就作用域已经销毁了)
        if(max === i) { return }

        // 这里是做一次交换
        swap(this.data,i,max)

        // 递归向下继续执行
        this.maxHeaify(max)
     }



}

module.exports = Heap
  