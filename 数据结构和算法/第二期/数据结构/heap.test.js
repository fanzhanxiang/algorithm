// /**
//  * 验证堆
//  */

const  {assert} = require('chai')
const Heap = require('./Heap')

 describe('测试堆', () => {
    it('max-heaapify-1', () => {
        // 位置1的元素违反了堆的性质，但是位置1元素的左右节点都还保持了堆的性质。
        // 这个时候可以用max-heapify(A,1)来重构堆的性质
        const heap = new Heap([15,2,8,12,5,2,3,4,7])
        heap.maxHeaify(1)
        assert.deepEqual(heap.data,[15,12,8,7,5,2,3,4,2])
    })

    it('max-heaapify-2', () => {

        const heap = new Heap([15])
        heap.maxHeaify(0)
        assert.deepEqual(heap.data,[15])
    })

    it('rebuild-heap-01',()=> {
        const heap = new Heap([1,2,3,4,5])
        //     5
        //    4 3
        //   1 2

        heap.rebuildHeap()
        assert.deepEqual([5,4,3,1,2],heap.data)
    })

    it('rebuild-heap-02',()=> {
        const heap = new Heap([1,2,3,4,5,6,7,7.3,2,1,2])
        heap.rebuildHeap()
        assert.equal(heap.isHeap(),true)
    })

    it('sort', () => {
        const heap = new Heap([5,4,3,2,1])
        heap.rebuildHeap()
        heap.sort()
        assert.deepEqual(heap.data, [1,2,3,4,5])
    })
 })
