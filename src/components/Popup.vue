<!--
 * @Author: myjdml
 * @Date: 2021-06-16 14:15:22
 * @LastEditors: myjdml
 * @LastEditTime: 2021-06-16 21:05:27
 * @Description: 
-->
<template>
  <div class="popup">
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  setup(props, ctx) {
    console.log(ctx);
    return {
      ...props
    };
  }
};
</script>

<style lang="scss" scoped>
.popup {
  width: 359px;
  height: 102px;
  font-family: HappyZcool-2016;
  background-image: url(~@assets/images/home/popup-bac.png);
  background-size: 100%;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-174.5px);
  transition: all 1s;
  p {
    text-align: center;
    line-height: 102px;
    font-size: 35px;
    color: white;
  }
}
</style>
