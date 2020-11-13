const path = require('path');
module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },

  //新建一个开发服务器，并且当代码更新的时候自动刷新浏览器。
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },

  // module.loaders 是最关键的一块配置。它告知 webpack每一种文件都需要使用什么加载器来处理：
  module: {
    rules: [
      //解析.css文件
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // 将 JS 字符串生成为 style 节点
        }, {
          loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
        }, {
          loader: "sass-loader" // 将 Sass 编译成 CSS
        }]
      },
      { test: /\.js$/, loader: "source-map-loader" },
      { test: /\.tsx?$/, loader: "ts-loader" },

    ]

    // preLoaders: [
    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    // { test: /\.js$/, loader: "source-map-loader" }
    // ]
  },

  // 其它解决方案配置
  resolve: {
    extensions: ['.ts', '.js', '.html', '.css', '.scss'], // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    alias: {                            // 模块别名定义，方便后续直接引用别名，无须多写长长的地址//后续直接 require('AppStore') 即可
      "@": path.join(__dirname, "src")
    },
  }
  // Other options...
};