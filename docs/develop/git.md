# Git常用指令

Git是一种记录变化的代码管理软件。
Git仓库分为以下几种“区域”：
* 工作区，所有代码修改都发生在工作区
* 暂存区，或者叫缓冲区，修改过的工作区文件先被添加到这里，然后修改被提交为一次commit
* 版本库，暂存区最终提交到的地方，也是版本历史记录存储的地方，被分为多个分支branch

## 基本设置

设置本地Git使用的账户，本地Git账户需要与Github账户对应
```shell
git config --global user.name "Sam Smith"
git config --global user.email sam@example.com
```

将所在文件夹初始化为一个Git仓库，在指令后添加一个名称则首先会创建该名称的文件夹，并将该文件夹作为代码仓库。如果拷贝已创建好的仓库则使用下方指令
```shell
git init
```

拷贝已创建好的Git仓库，支持本地与远程，远程支持http格式与ssh格式的仓库地址，推荐使用ssh仓库地址
```shell
git clone /path/to/repository		# 本地仓库
git clone git@github.com:CamWang/mirage.git		# 远程仓库 ssh格式地址
git clone https://github.com/CamWang/mirage.git	# 远程仓库 http格式地址
```

## 仓库相关
添加文件修改到缓冲区（stage），可以添加文件或目录。
```shell
git add path/to/filename	# 添加一个文件到缓冲区
git add path/to/directory	# 添加一个目录中所有文件到缓冲区
git add .	# 添加当前目录所有文件到缓冲区
```

撤销缓冲操作
```shell
git reset
git reset filename
```

将缓冲区的修改提交到HEAD，这一步仅修改本地仓库的HEAD而远程仓库还没有任何变更。添加-m后缀可以直接添加提交信息。提交信息（commit message）格式请参考：约定式提交，在本项目中还需要添加Agile开发对应的消息头
```shell
git commit	# 提交，git会自动调用文本编辑器允许你来编写提交信息，保存退出编辑器继续进行提交操作
git commit -m "message"	# 提交，后面直接指定提交信息
git commit -a	# 添加所有修改到缓冲区并提交（相当于这两个指令一起使用）
```

提交本地修改到远程服务器
```shell
git push
```

获取远程修改到本地，使用--rebase选项当远程有其他更新提交时会自动将远程提交放在本地提交的前面，并将本地的提交追加到远程提交的后方
```shell
git pull --rebase
```

切换到其他分支（branch），使用-b加新分支名可以创建新分支并切换到新分支
```shell
git checkout branchname
git checkout -b branchname
```

列出所有分支
```shell
git branch
```

将另一个分支与现在的分支合并
```shell
git merge branchname
```

在分支合并过程中如果有冲突，查看冲突文件的区别，并使用文件编辑器手动解决冲突
```shell
git diff
git diff sourcebranch targetbranch
git add <filename>  # 冲突解决完毕之后再添加修改到缓冲区
```

在搞乱一个文件的情况下，将文件退回到上次提交的状态
```shell
git checkout -- <filename>
```

在搞乱许多项目文件的情况下，将所有项目所有文件退回到远程仓库上次提交的状态，分支为master分支，远程仓库为origin
```shell
git fetch origin
git reset --hard origin/master
```