/**
 * 
 * 测试链表
 * 
 */

const List = require('./list')
const { assert } = require('chai')
describe('测试链表',()=>{
    it('插入元素和遍历',() => {
        const list = new List()
        for(let i=1;i<=5;i++) {
            // createNode是挂在静态方法上的
            const node = List.createNode(i)
            list.insert(node)
        }
        const it = list.transerve()
        assert.deepEqual([5,4,3,2,1],[...it].map(node=>node.key))
    })
    
    it('删除元素',() => {
        const list = new List()
        for(let i = 1;i<=5;i++) {
            const node = List.createNode(i)
            list.insert(node)
        }

        const node = list.search(3)
        list.remove(node)

        const it = list.transerve()
        assert.deepEqual([5,4,2,1],[...it].map(node=>node.key))
    })


    it('搜索',() => {
        const list = new List()

        for(let i=1;i<=5;i++) {
            const node = List.createNode(i)
            list.insert(node)
        }

        const node = list.search(3)
        assert.equal(node.key,3)
    })
})
