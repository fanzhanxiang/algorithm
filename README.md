# algorithm
一些前端常用到的算法场景

# git 知识学习


## git本地操作

-不停的创造文件进行备份（没有修改的提示），git可以帮我们管理我们的代码保证代码不丢失
-记录历史只要代码提交到git上就永久不会丢失，可以随时“穿越”
-团队协作 两个人修改了同一个文件的同一行，也需要手动解决冲突，可以实现自动合并（模块化、组件化）
-git拥有强大的分支管理系统

## 初始化git 
 - 一个项目只能初始化一次，不能嵌套
 ```
 git init 告诉git哪个文件夹被git所管理
 git status 查看git状态

 ```



## 删除暂存区
```
 git rm --cached 文件名

```

## 添加到暂存区

```
 git add ./ -A / 文件名
```


## 添加到历史区

```
git commit -m '消息'
```


## 提交历史

```
git log
```

## 比较

```
filepath是文件路径，可以指定文件、也可以指定某个文件夹

git diff  filepath 工作区与暂存区比较

git diff HEAD filepath 工作区与HEAD ( 当前工作分支) 比较

git diff --staged 或 --cached  filepath 暂存区与HEAD比较

git diff branchName filepath  当前分支的文件与branchName 分支的文件进行比较

git diff commitId filepath 与某一次提交进行比较
```
## 撤销
-  从暂存区中将工作区内容覆盖掉
```
git chechout 文件名
```


##linux命令
- vi文件名
- i插入模式 esc 退出编辑模式 :q!强制退出 :wq保存并退出