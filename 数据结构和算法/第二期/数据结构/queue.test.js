const { assert } = require('chai')
let Queue = null
if(process.env.QUEUE === 'stack_to_queue'){
    Queue = require('./stack_to_queue')
} else {
    Queue = require('./stack')
}

describe('测试队列',()=> {
    it('FIFO',()=>{
        const s = new Queue(1000)
        for(let i =0;i<=5;i++) {
            s.enqueue(i)
        }

        for(let i=0;i<5;i++) {
            assert.equal(s.dequeue(),i)
        }
    })

    it('overflow-1',()=>{
        const s = new Queue(1000)
        let error = null
        try{
            for(let i =0;i<1001;i++) {
                s.enqueue(i)
            }    
        }catch(ex) {
            error = ex
        }
        assert.equal(error,'overflow')
    })

    it('overflow-2',()=>{
        const s = new Queue(1000)
        let error = null
        try{
            for(let i =0;i<1000;i++) {
                s.enqueue(i)
            }    
        }catch(ex) {
            error = ex
        }
        assert.equal(error,null)
    })

    it('underflow',()=>{
        const s = new Queue()
        let error = null
        try{
            s.dequeue()
        }catch(ex) {
            error = ex
        }
        assert.equal(error,'underflow')
    })

    it('性能测试',() =>{
        const s = new Queue(1000000)
        const t = new Date()
        for(let i =0;i<1000000;i++) {
            s.enqueue(i)
        }
        for(let i =0;i<1000000;i++) {
            s.dequeue(i)
        }
        assert.equal(
            new Date().getTime() - t < 50,
            true,
            '性能不达标'
        )
    })
})