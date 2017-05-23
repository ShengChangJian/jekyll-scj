---
layout: post
title:  "windows下配置jekyll和github博客环境"
date:   2016-06-22 22:21:49
categories: Jekyll Update
tags: Jekyll Update
---

jekyll在本地浏览博客还是比较方便，结合github博客支持就更加好了，再借助git就可以把本地博客
直接上传到github博客，这样就如同本地用markdown写博客，不需要像普通博客那样先登录再利用它的
编辑器写博客了。有了这一套装备，根本不用登陆就可以写博客（可以用gvim做编辑器或者记事本也行），如果想更自动化的话，可以借助
makefile或者bat文件就可以完全自动化了。轻轻松松写博客，这样我相信你很容易坚持下来的。好了，
让我们开始吧！

    本文目录:

* 目录
{:toc}

# 安装ruby和其对应的devkit

首先下载[rubyinstaller](http://rubyinstaller.org/downloads/)和[DEVELOPMENT KIT](http://rubyinstaller.org/downloads/),
至于下哪一个版本主要是看http://rubyinstaller.org/downloads/中DEVELOPMENT KIT（即devkit）的最高版本，比如，博主写该篇博客时，DEVELOPMENT KIT
的最高版本是2.0,所以rubyinstaller和对应的DEVELOPMENT KIT都下2.0版本的。
下载完后就是安装了，安装只要按提示安装即可（在安装过程中把Add Ruby executables to your PATH勾选上）.
两个软件全部安装完后，执行下列操作检验安装是否成功：<br/>

* （1）在cmd中输入``Ruby -v``回车之后，如果有版本信息说明安装成功，否则添加ruby的bin目录到系统环境变量PATH中，然后再执行本操作，应该
会看到版本信息。<br/>
* （2）配置devkit<br/>
*   ①打开 CMD 窗口，进入devkit的安装目录，输入``ruby dk.rb init``回车，这样就生成了config.yml。 <br/>
*   ②输入 ``ruby dk.rb install``回车， 此时开始安装。 <br/>

# 安装jekyll

首先检查gem是否正确安装，cmd中输入``gem -v``回车，应该用版本信息
安装jekyll，cmd中输入``gem install jekyll``回车，等待安装成功，
如果长时间没有反应，说明在线安装的网站被和谐了。那么，就自己到网站
下载[jekyll](https://rubygems.org/gems/jekyll),进入对应网站后，在
页面右下角会有下载字样，点击下载即可，下载完后，找到该文件，并用cmd
进入该文件所在的文件夹，cmd中输入``gem install 该文件文件名（包括其扩展名）``回车，
等待安装成功，如果安装过程中提示有部分组件安装失败或是连接有问题，那么
就通过网站https://rubygems.org/gems/去搜索相应的组件，然后同上方法安装即可。

检验jekyll是否安装成功：cmd中输入``jekyll -v``回车，应该会显示版本信息。
值得注意的是，在后面使用jekyll过程出现任何问题都可以通过https://rubygems.org/gems/
下载缺少的东西。

    使用jekyll：

* （1）cmd进入你想使用jekyll建立博客的文件夹，然后cmd中输入``jekyll new 博客名``回车
* （2）cmd进入你刚才新建的博客名对应的文件夹，然后cmd中输入``jekyll build``回车，之后
cmd中输入``jekyll s``回车，然后根据提示的信息，在浏览器中输入相应的网址即可看到简单
的博客了！
* （3）箱使你的博客更漂亮可以去jekyll网站或是github的open source中搜索下载jekyll模板
【注意】更多操作可以在cmd中输入``jekyll -h``得到帮助

# 部署github博客

* （1）在github注册自己的博客，方法参考：[http://blog.csdn.net/renfufei/article/details/37725057/](http://blog.csdn.net/renfufei/article/details/37725057/)中的1-8点的描述
* （2）安装[git for windows](https://git-scm.com/download/win),安装方法参考[http://blog.csdn.net/wfdtxz/article/details/7908832](http://blog.csdn.net/wfdtxz/article/details/7908832)
* （3）配置git和github的SSH，方法参考:[http://blog.csdn.net/binyao02123202/article/details/20130891](：http://blog.csdn.net/binyao02123202/article/details/20130891)或者参考:
[http://jingyan.baidu.com/article/a65957f4e91ccf24e77f9b11.html](http://jingyan.baidu.com/article/a65957f4e91ccf24e77f9b11.html) 配置时遇到问题请根据提示自行搜索解决。

# 使用git上传或克隆github博客

cmd（或git bash）中使用以下操作：

* $ git clone git@github.com:你的github账户名/你的github账户名.github.io.git //本地如果无远程代码，先做这步，不然就忽略【注意：如果要全面改版的话，也需要这一步，把去了clone下的.git文件夹留着之外，其他都应该删除】
* $ cmd进入你的刚刚克隆的博客目录下 //定位到你blog的目录下
* $ git pull origin master //先同步远程文件，后面的参数会自动连接你远程的文件
* $ git status //查看本地自己修改了多少文件
* $ git add . //添加远程不存在的git文件
* $ git commit * -m "what I want told to someone"
* $ git push origin master //更新到远程服务器上

通过以上操作你就可以上传自己的博客到github上了






