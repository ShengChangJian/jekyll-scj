# Jekyll-scj Theme

本项目起源于 3-jekyll ，首先感谢 3-jekyll 的作者。之后在这个基础上做了较多的改进和功能定制。

## 本Theme功能

+ 代码高亮和代码窗口功能
+ 文章列表
+ 文章目录
+ 多说评论（回到底部按钮）
+ 回到顶部按钮
+ 文章标题底部显示
+ 站内搜索
+ _posts文章自动生成
+ 自动更新博客
+ 增加写日记功能（含逐条评论功能）
+ 点击图片放大功能

### 代码高亮和代码窗口功能

代码高亮功能可以参考[博客展示](https://shengchangjian.github.io/)，然后看本项目中_posts文件下面jekyll下的文件实例

### 文章目录添加

在你需要添加文章目录的地方加入以下两行(以下第一行前要空行，第二行后要空行)：

* 目录
{:toc}

添加过后在文章内部就有文章目录了，而且在右上角也会出现收纳的文章目录“田”

### 文章列表

当文章列表出现在左侧而不是收纳起来的，可以通过ctrl+鼠标中键滚动来放大网页，这样左边侧栏就会收纳，要它出现的话，可以点击右上角的箭头图标

### 张内搜索

站内搜索在左侧边栏（如果没有出现，可以点击右上角的箭头图标打开）的右上角，目前只能显示含有搜索内容的文章标题。

### _posts文章自动生成

在你的博客目录下，在终端命令行下输入bash new.sh根据提示操作即可；对于windows下可以输入new即可

### 多说评论

请自己申请多说评论ID，然后修改_includes文件夹下面的post.html和diary.html里面的多说的相关内容，可以使用搜索shuo定位然后修改

### 增加写日记功能（含逐条评论功能）

在你的博客目录下，在终端命令行下输入bash diary.sh根据提示操作即可；对于windows下可以输入diary即可。

### 自动更新博客

可能你需要修改upload.sh或upload.bat（windows下）的内容，比如替换成你的分支。
在你的博客目录下，在终端命令行下输入bash upload.sh根据提示操作即可；对于windows下可以输入upload即可

### 设置 `_config.yml`

`_config.yml` 除基本的站点设置外，新加入了社交链接与评论设置。将需要添加的社交帐号填入对应设置，并取消注释，会在头像下方增加一条社交帐号的链接。支持 Twitter, Weibo, Github, Codepen 以及 Dribbble。此外，填入 Disqus 的 shortname 也会启用 Disqus 评论。 `filter` 选项选择使用 `tag` 或 `category` 作为文章分类。

### 修改样式

样式相关的 Sass 变量都存储在 `/css/main.sass` 文件中，修改这个文件可以满足大部分样式定制的需求。建议首先修改 `$gradient-start` 与 `$gradient-end` 两个变量，给自己的博客使用独一无二的侧边栏背景。

### 替换图片

请不要忘记替换 `/assets/img/` 内的图片。`avatar.jpg` 是侧边栏头像的图片，`qrcode.jpg` 会在提示浏览器不兼容时使用。[QR Code 生成器](https://www.unitag.io/qrcode)

#感谢3-jekyll Theme

## 使用

### 设置 `_config.yml`

`_config.yml` 除基本的站点设置外，新加入了社交链接与评论设置。将需要添加的社交帐号填入对应设置，并取消注释，会在头像下方增加一条社交帐号的链接。支持 Twitter, Weibo, Github, Codepen 以及 Dribbble。此外，填入 Disqus 的 shortname 也会启用 Disqus 评论。 `filter` 选项选择使用 `tag` 或 `category` 作为文章分类。

### 修改样式

样式相关的 Sass 变量都存储在 `/css/main.sass` 文件中，修改这个文件可以满足大部分样式定制的需求。建议首先修改 `$gradient-start` 与 `$gradient-end` 两个变量，给自己的博客使用独一无二的侧边栏背景。

### 替换图片

请不要忘记替换 `/assets/img/` 内的图片。`avatar.jpg` 是侧边栏头像的图片，`qrcode.jpg` 会在提示浏览器不兼容时使用。[QR Code 生成器](https://www.unitag.io/qrcode)
