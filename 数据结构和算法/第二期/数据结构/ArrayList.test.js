const ArrayList = require('./ArrayList')
const { assert } = require('chai')


describe('测试ArrayList', () => {
    it('插入', () => {
        const list = new ArrayList()
        for(let i = 1;i <= 5;i++) {
            list.insert(i)
        }
        const it = list.transverse()
        assert.deepEqual([5,4,3,2,1],[...it])
    })

    it('测试out of memory', () => {
        let error = null
        try{
            const list = new ArrayList(100)
            for(let i = 0; i < 100; i++) {
                list.insert(i)
            }
        }catch(ex) {
            error = ex
        }

        assert.equal(null,error)

        try {
            const list = new ArrayList(100)
            for(let i = 0; i< 101; i++) {
                list.insert(i)
            }
        }
        catch(ex) {
            error = ex
        }
        assert.equal(error,'out of memory')
    })

    it('测试delete node', () => {
        const list = new ArrayList(5)
        for(let i = 1;i <= 5;i++) {
            list.insert(i)
        }

        // 删除第3个位置的元素:4
        list.delete(3 * 3)
        const it = list.transverse()

        assert.deepEqual([5,3,2,1],[...it])
        
        // 在出入一个元素应该不会造成异常
        list.insert(10)
        const it2 = list.transverse()
        assert.deepEqual([10,5,3,2,1],[...it2])
    })
})