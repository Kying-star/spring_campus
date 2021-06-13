/*
 * @Author: myjdml
 * @Date: 2021-05-22 19:21:22
 * @LastEditors: myjdml
 * @LastEditTime: 2021-06-12 19:32:34
 * @Description:
 *
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true
      },
      "vant"
    ]
  ]
};
