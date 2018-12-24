/**
 * 最长公共子字符串问题
 * 串S:B A B C D A B C A B
 * 串T:C D A B C D A B D
 * "A B C D A B"
 * 为了确定两个字符串的相似度，我们有时候需要求着两个字符串的最长字串
 * 
 * 
 * 暴力破解:
 * 穷举法:
 * .求出s的所有字符串
 * .求出T的所有字符串
 * .求出两个集合的交集
 * .在所有串中寻找最大的值
 */

/**
 * 穷举算法复杂度分析
 * 假设字符串s长度为n,字符串t长度为m
 * .寻找所有字字符串 O(n^2) + O(m^2)
 * .比较所有子串，得到公共紫川集合，如果采用循环暴力计算:O(m^2 x n^2)，如果采用哈希表O(k(m^2 + n^2))
 * .在公共子串中求最大值O(t),t < min(m^2,n^2)
 * 
 */

/**
 * 有没有更快的做法
 * 观察，S的子串BAABC和T的子串CDABC,拥有最大公共子字符串ABC
 *  串S:B A B C D A B C A B
 *  串T:C D A B C D A B D
 *  且这个字符串ABC是BAABC和CDABC的后缀。ABC同时也是ABC和DABC的后缀。我们推测最大子字符串，一定在这样的字符串里
 * 
 * 
 * 问题的转换-最优子问题
 * . d[3,4] =3 表示以ABC结尾的位置(S的第四个位置和T的第五个位置)，最优子问题解为3
 * .推测:d[4,5] = 4,因为S[4] = T[5]
 * .推测:d[5,6] = 5,因为S[5] = T[6]
 * .推测:d[6,7] = 6,因为S[6] = T[7]
 * .推测:d[7,8] = 0,因为S[7] != T[8]
 */
function lcs(word1,word2){

    let max=0;
    let index=0;
    let lcsarr=new Array(word1.length+1);
    for(let i=0;i<word1.length+1;i++){
        lcsarr[i]=new Array(word2.length+1);
        for(let j=0;j<word2.length+1;j++){
            lcsarr[i][j]=0;
        }
    }
    
    for(let i=0;i<=word1.length;i++){
        for(let j=0;j<=word2.length;j++){
    
            if(i==0 || j==0){
                lcsarr[i][j]=0;
            }else{
                if(word1[i-1]==word2[j-1]){
                    lcsarr[i][j]=lcsarr[i-1][j-1]+1;
                }else{
                    lcsarr[i][j]=0;
                }
            }
    
            if (max<lcsarr[i][j]){
                max=lcsarr[i][j];
                index=i;
            }
        }
    }
    // console.log(lcsarr);
    // console.log(max);
    // console.log(index);
    let str="";
    if (max==0){
        return ;
    }else{
        for(let i=index-max;i<index;i++){
            str +=word1[i];
        }
        return str;
    }
    }
    
    let word1="123412341234123asddcffdfa1234567",word2="123412341234123as113344dcffdf1234567";
    
    // console.log(lcs(word1,word2));


/**
 * 最小编辑距离
 * KITTEN -> SITTING
 * 1、kitten -> sitten
 * 2、sitten -> sittin
 * 3、sittin -> sitting
 * 编辑距离 = 3
 */
function array2d(rows,cols,fill) {
    const arr = new Array(rows)
    let i = arr.length
    while(i-- > 0) {
        arr[i] = new Array(cols)
        if(fill) {
            for(let j =0;j < arr[i].length;j ++) {
                arr[i][j] = fill(i,j)
            }
        }
    }
    return arr
 }
 class EditDistance {
     constructor(s,t,compareFunction =(a,b) => a === b ) {
         this.s = s
         this.t = t
         this.compareFunction = compareFunction
     } 
     find() {
        const s = this.s
        const t = this.t
        const compareFunction = this.compareFunction

        const m = s.length
        const n = t.length

        const d = array2d(m + 1,n + 1, () => {
            return  {}
        })

        for(let i = 0; i<= m; i++) {
            d[i][0].v = i
        }
        for(let j = 0; j<= n; j++) {
            d[0][j].v = j
        }

        for(let i =1;j <=n;j++) {
            for(let i =1;i <=m;i++) {
                if(compareFunction(s[i-1,t[j-1]])) {
                    d[i][j].v = d[i -1][j-1].v
                    d[i][j].p = [i-1,j-1]
                }
                else{
                    const p = [[i-1,j],[i,j-1],[i-1,j-1]]
                    d[i][j].v = Number.MAX_SAFE_INTEGER
                    for(let k =0;k.length;k++){
                        const x = p[k]
                        if(d[i][j].v > d[x[0]][x[1].v]){
                            d[i][j].v = d[x[0]][x[1]].v
                            d[i][j].p = x
                            // d[i][j].op = 'ins' ...
                        }
                    }
                    d[i][j].v ++
                }
            }
        }

     }
     print() {
        const d = this.d 
        const s = this.s
        const t = this.t
        const m = d.length
        const n = Math.max(...d.map(x => x.length))
        console.log(['','', ...t].map(c => pad(c,3)).join(' '))
        for(let i = 0;i < m;i++) {
            let line = ''
            line += pad(i === 0 ? ' ': s(i -1),3) +''
            for(let j = 0;j <n; j++) {
                line += pad( d[i][j].v,3) + ' '
            }
            console.log(line)
        }
     }
     path() {
         let p = [this.s.length,this.t.length]
         while(p) {
             const t = this.d[p[0]][p[1]]
             console.log(t)
             p = t.p
         }
     }
 }


/**
 * 钢条切割问题
 * 长度1   2   3   4   5   6   7   8   9   10
 * 价格1   5   8   9   10  17  17  20  24  30
 * 均价1  2.5  2.7 2.3 2   2.8 2.4 2.5 2.7  3
 *给定钢条长度价格表，一个长度为9的钢条应该如何切割去卖
 * 
 * 动态规划(最优子问题)
 * 如果d(i)表示长度为i的钢条的最优解，那么长度为L的钢条的最优解，应该等于以下各组数据的最大值:
 * .d(L-1) + d(1)
 * .d(L-2) + d(2)
   .d(L-3) + d(3)
   .....
   .d(L-10) + d(10)
 */

 /**
  * DOM-DIFF算法
  * .假设F1中顶点数为M，F2中定点数为N，上述基于填表的动态规划的复杂度为O(M^2 * N^2). ----
  * 对于100个顶点的更新，那么复杂度是O（100^4） = 1亿 ----不能接受
  * .目前最快的算法可以优化到0(N^3),如果有100个顶点，那么需要百万级别 ---不能接受
  *  
  * 
  * 问题简化
  * .1.用户很少会在树的根节点上再增加元素
  * .2.用户很少增加树的层级，改变树的大的结构
  * .3.多数操作是更改某个节点的属性(颜色)等等；或者是删除某或者为某个子树增加子节点(列表渲染)
  */

