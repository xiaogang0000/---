const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,  //追加这句话，用于关闭语法检查
  //第一种配置代理的方式
 /* devServer:{
    proxy:'http://sph-h5-api.atguigu.cn'
  }*/
  //第二种配置代理的方式
  devServer: {
    proxy: {
      '/sph': {
        target: 'http://sph-h5-api.atguigu.cn',
        ws: true,
        changeOrigin: true,
        pathRewrite:{'^/sph':''}

      },
      '/yulu': {
        target: 'https://api.uixsj.cn',
        ws: true,
        changeOrigin: true,
        pathRewrite:{'^/yulu':''}
      }
    }
  }  
})
