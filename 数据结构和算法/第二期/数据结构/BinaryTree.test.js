const { assert } = require('chai')
const BinaryTree = require('./BinaryTree')
describe('测试二叉树', ()=> {
    it('insert', () =>{
        const tree = new BinaryTree()
        tree.insert(2)
        tree.insert(3)
        tree.insert(10)
        tree.insert(1)


        assert.deepEqual([...tree.transverse()].map( x=> x.key),[1,2,3,10])
    })
})