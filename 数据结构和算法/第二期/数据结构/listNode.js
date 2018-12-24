/**
 * 
 * 双向列表的节点，有prev(向后)、next(向前)两个指针
 */

 class ListNode {
     constructor(key) {
         this.key = key
         this.prev = null
         this.next = null
     }  
 }

 module.exports = ListNode