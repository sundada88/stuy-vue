/**
 * Created by jw on 2020/3/12.
 */
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: 'app/project',
  publicPath: '',
  devServer: {
    port: 8087
  },
  // 添加svg的loader
  chainWebpack (config) {
    config.module.rule('svg')
      .exclude.add(resolve('./src/assets'))

    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/assets')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
  }
}
