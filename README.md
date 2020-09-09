# 该脚本提供以下功能：

- 屏蔽与规范化广告
- 去除相关关键词等冗杂内容
- 提供自定义的图片或纯色背景
- 提供开关导航栏（“网页 资讯 视频 ……”）的开关
- 搜索结果采用毛玻璃圆角卡片
- 搜索结果以双列布局方式呈现

双列布局采用紧密布局，不会出现某个搜索结果有过多空白。

# 高亮：

- 鼠标悬停的搜索结果，其卡片将会高亮
- 搜索建议除了背景高亮，还有缩进高亮

# 允许的背景来源:

- 纯色
- 本地图片 (以Data URL方式存储,可能在打开时造成些许卡顿,但是之后会变得流畅，全过程无需联网)
- URL (载入速度取决于网络环境)

背景以及开关导航栏的设置，在**页面右上角的“美化选项”菜单**中。

欣赏模式默认开启，双击背景没有被遮挡的部分，可以隐藏元素，以欣赏背景。该模式可以在设置中关闭。
注意：元素只是隐藏，但是还是**可以交互**，例如链接还是可以点击。点击页面任意一处以重现隐藏的元素。

## 匹配接口

目前仅仅匹配以下接口，若有幸得接口，欢迎提供

- \*//www.baidu.com/s?*
- \*//www.baidu.com/baidu?*

## 注意

1. 由于百度搜索页面在**2020年6月28日**，以及**2020年7月22日**进行了更新，故旧版本的脚本样式**可能并不适用，并与截图略有出入**，建议更新脚本至最新。若有其它建议，欢迎留言。

2. 该脚本仅仅对原始页面右侧的广告以及推荐内容进行移除，对原有页面左侧的**搜索结果以及其中混杂的广告保留**，并将格式统一为毛玻璃卡片。

3. 本插件**仅仅为美化插件**，去除广告与其它冗杂内容（如原始页面右侧的广告与推荐）的目的是**防止破坏页面的美观性，仅此而已**。如果需要更加精准的广告屏蔽方案，建议查找其它的功能强大的插件。毕竟不同插件相互配合，各取所需，也是模块化的目的之一。

4. 使用Chrome浏览器，从文件选择背景时，可能会出现文件选择器闪退的现象，此**非该脚本的问题**，所有的文件选择器均会如此，此时重启浏览器或者重启计算机可修复。

5. 建议使用暗色调的背景，与白色毛玻璃的主题更配哦~

6. 毛玻璃效果会导致掉帧现象的出现，可以在设置中关闭。

7. 默认开启宽度限定，否则搜索结果的宽度将会占满整个浏览器宽度。这可以在设置中关闭。

## 关于兼容性

|浏览器|双列排版|毛玻璃|自定义背景|
|:---|:---:|:---:|:---:|
|Chrome|支持|支持|支持|
|Edge|支持|不支持|支持|
|新Edge|支持|支持|支持|