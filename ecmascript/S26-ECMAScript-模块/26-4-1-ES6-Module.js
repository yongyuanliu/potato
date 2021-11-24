console.log('load module.js');

/*
  与传统的脚本不同，所有模块都会像 <script defer> 家在的脚本一样，按顺序执行。
  解析到 Script type 为 module 标签后会立即下载模块文件，但执行会延迟到文档解析完成。
  
  无论是嵌入的模块代码还是引入的外部模块文件，都是这样，<script type="module"> 在也没中出现的顺序
  就是它们执行的顺序，更改模块标签的位置无论是<head>或<body>中，只会影响文件什么时候加载，而不会影响到模块什么时候加载

  第二个加载
  <script type="module" src="foo.js"></script>
  第三个加载
  <script type="module" src="bar.js"></script>

  第一个加载
  <script>
    ...
  </script>
 */