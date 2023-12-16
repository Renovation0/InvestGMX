const path = require('path')
const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV)
// const JsEncodePlugin = require('./JsEncodePlugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: (config) => {
    // 配置文件路径别名，简化文件路径的书写
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))

    config.module
      .rule('less')
      .test(/\.less$/)
      .oneOf('vue')
      .use('px2rem')
      .loader('px2rem-loader')
      .before('postcss-loader')
      .options({
        remUnit: 75,
        remPrecision: 3,
        min: 2
      })
      .end()
  },
  configureWebpack: (config) => {
    // if (IS_PROD) {
    //   console.log(config)
    //   const plugins = []
    //   plugins.push(
    //     new JsEncodePlugin({
    //       global: '$',
    //       jsReg: /^app\..+\.js$/,
    //       assetsPath:'./dist/js'
    //     })
    //   )
    //   config.plugins = [...config.plugins, ...plugins]
    // }
    const plugins = []
    plugins.push(
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     // 删除注释
      //     output: {
      //       comments: false
      //     },
      //     // 删除console debugger 删除警告
      //     compress: {
      //       drop_console: true, // console
      //       drop_debugger: false,
      //       pure_funcs: ['console.log']// 移除console
      //     },
      //     warnings: false,	//	这样写就不报错  
      //   },
      //   parallel: true
      // })
      // new JavaScriptObfuscator({
      //   // 压缩代码
      //   compact: true,
      //   // 是否启用控制流扁平化(降低1.5倍的运行速度)
      //   controlFlowFlattening: false,
      //   // 随机的死代码块(增加了混淆代码的大小)
      //   deadCodeInjection: false,
      //   // 此选项几乎不可能使用开发者工具的控制台选项卡
      //   debugProtection: false,
      //   // 如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，从而更难使用“开发人员工具”的其他功能。
      //   debugProtectionInterval: false,
      //   // 通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。
      //   disableConsoleOutput: true,
      //   // 标识符的混淆方式 hexadecimal(十六进制) mangled(短标识符)
      //   identifierNamesGenerator: 'hexadecimal',
      //   log: false,
      //   // 是否启用全局变量和函数名称的混淆
      //   renameGlobals: false,
      //   // 通过固定和随机（在代码混淆时生成）的位置移动数组。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
      //   rotateStringArray: true,
      //   // 混淆后的代码,不能使用代码美化,同时需要配置 cpmpat:true;
      //   selfDefending: true,
      //   // 删除字符串文字并将它们放在一个特殊的数组中
      //   stringArray: true,
      //   // stringArrayEncoding: false,
      //   stringArrayEncoding: ['base64'],
      //   stringArrayThreshold: 0.75,
      //   // 允许启用/禁用字符串转换为unicode转义序列。Unicode转义序列大大增加了代码大小，并且可以轻松地将字符串恢复为原始视图。建议仅对小型源代码启用此选项。
      //   unicodeEscapeSequence: false
      // }, [])
    )
    config.plugins = [...config.plugins, ...plugins]
  },
  // css相关配置
  css: {
    // 是否使用css分离插件
    extract: IS_PROD,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      css: {
        localIdentName: '[name]-[hash]',
        camelCase: 'only'
      },
      postcss: {
        plugins: []
      }
    }
  },

  // webpack-dev-server 相关配置
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8089,
    https: false,
    hotOnly: false,
    proxy: null
  },
  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/styles/common.less')
      ]
    }
  }
}
