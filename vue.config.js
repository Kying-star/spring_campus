/*
 * @Author: your name
 * @Date: 2021-05-28 11:23:49
 * @LastEditTime: 2021-06-11 21:22:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /spring_campus/vue.config.js
 */
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: false,
  outputDir: "build",
  publicPath: process.env.NODE_ENV === "production" ? "/spring-campus/" : "./",
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@api", resolve("src/services"))
      .set("@tools", resolve("src/tools"));
  },
  // css: {
  //   sourceMap: true,
  //   loaderOptions: {
  //     scss: {
  //       prependData: `@import "~@/assets/style/variables.scss";`
  //     }
  //   }
  // },
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "https://be-prod.redrock.team/spring-campus", // 设置调用的接口域名和端口号 ( 设置代理目标)
        changeOrigin: true,
        ws: true, //代理websockets
        pathRewrite: {
          "^/api": "" // 这是一个通配符，设置完了之后每个接口都要在前面加上/api（特别注意这一点）
        }
      }
    }
  }
};
