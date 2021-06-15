<!--
 * @Author: your name
 * @Date: 2021-01-01 15:08:43
 * @LastEditTime: 2021-06-14 12:34:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nineteenth-committee-fe/src/components/ActivityRule.vue
-->
<template>
  <div class="activity-rule mask">
    <div class="box">
      <div class="title">
        <p>恭喜你 获得了一张校史卡片！</p>
      </div>
      <div class="inner">{{ Showindex }}</div>
    </div>
    <div class="btn" @click="close"></div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: {
    index: Number
  },
  setup(props, ctx) {
    const Showindex = ref(props.index);
    const clickNum = ref(10);
    const clicked = ref(false);
    const close = () => ctx.emit("close");
    console.log(props.index);
    return {
      close,
      clickNum,
      Showindex,
      clicked
    };
  }
};
</script>

<style lang="scss" scoped>
.activity-rule {
  z-index: 999;
  .box {
    box-sizing: border-box;
    margin: 51px auto;
    width: 628px;
    height: 919px;
    background-image: url(~@assets/images/game/card_bk.png);
    background-size: cover;
    border-radius: 15px;
    padding: 23px 23px 48px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .rules {
      width: 502px;
      height: 587px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    .title {
      height: 190px;
      width: 628px;
      p {
        margin: 30px 0 0 63px;
        width: 312px;
        height: 66px;
        font-size: 34px;
        font-family: HappyZcool-2016;
        font-weight: 400;
        color: #ffffff;
        line-height: 36px;
        word-break: keep-all;
      }
    }
    .inner {
      width: 522px;
      height: 644px;
      background-color: #fffbf1;
    }
    .rule {
      width: 502px;
      margin: 10px auto;
      font-size: 24px;
      font-family: FZYaZhuTiS;
      font-weight: bold;
      line-height: 34px;
      margin-bottom: 45px;
      text-align: justify;
      font-size: 28px;
      font-family: 华康少女;
      font-weight: 400;
      color: #ff753f;
      line-height: 35px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .btn {
    margin: -20px auto;
    width: 398px;
    height: 178px;
    background: url(~@assets/images/game/next-btn.png);
    background-size: cover;
  }
  .close {
    width: 426px;
    height: 216px;
    margin: 20px auto;
    background: url(~@assets/images/button.png);
    background-repeat: no-repeat;
    background-size: contain;
    font-size: 44px;
    font-family: HappyZcool-2016;
    font-weight: 400;
    color: #f4ffb1;
    text-align: center;
    line-height: 216px;
  }
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(61, 45, 43, 0.5);
}
</style>
