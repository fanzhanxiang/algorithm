/**
 * 二叉搜索树(性质)
 * .搜索时间和树的高度成正比
 * .对任何一个节点x,对任何一个x左边的节点y,y.key <= x.key;对任何一哥x右边的节点y，y.key >= x.key
 */


/**
 * 遍历的序
 * .中序遍历(inorder) ---先遍历x.left再遍历x.right,输出了有序列表(根据搜索二叉树的性质刚好可以拿到一个排序好的结果)
 * .前序遍历(preorder --- 先x再x.left和x.right)
 * .后续遍历(postorder) --- 先x.left和x.right最后x
 */


 /**
  * 操作介绍
  * .搜索(递归&非递归)
  * .搜索最大值/最小值
  * .寻找后继节点(successor),寻找key值大于x.key的最小节点（即key右边所有节点的最小节点）
  * 
  */


  class BinaryTreeNode{
      constructor(key) {
          // 指向父节点
          this.p = null

          // 节点的高度
          this.level = 0
          
          // 左
          this.left = null

          // 右
          this.right = null

          // 键值
          this.key = key

          // 卫星数据
          this.value = null
      }
  }

  module.exports = BinaryTreeNode

