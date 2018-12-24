// 队列 

class Queue{

    constructor(max =1000) {
        this.max = max
        this.data = new Array(max)
        this.head=0
        this.tail=0
        this.size =0
    }

    // 入列
    enqueue(x) {
        if(this.size ===this.max) {throw 'overflow'}
        this.data[this.tail] = x
        this.size ++
        if(this.tail === this.max-1){
            this.tail =0
        }else{
            this.tail ++
        }
    }

    // 出列
    dequeue() {
        // underflow
        if(this.size ===0) {
            throw 'underflow'
        }
        this.size--
        const x = this.data[this.head]
        this.head ++
        return x
    }
}
module.exports = Queue