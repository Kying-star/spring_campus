<!--
 * @Author: your name
 * @Date: 2021-06-11 21:21:52
 * @LastEditTime: 2021-06-16 13:35:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /spring_campus/src/components/QuestionTip.vue
-->
<template>
  <div class='question-tip mask'>
    <div class='box'>
      <div class='title'>题目解析</div>
      <div class='content'>
        <img :src='imgUrl' />
        <p class='text'>{{ text }}</p>
      </div>
    </div>
    <div class='close' @click='close' :class='{ last: last }'></div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: String,
    text: String,
    last: Boolean,
  },
  setup(props, ctx) {
    const close = () => ctx.emit("close");
    return {
      close,
    };
  },
};
</script>

<style lang="scss" scoped>
.question-tip {
  z-index: 999;
  .box {
    box-sizing: border-box;
    margin: 62px 56px 0;
    background-color: #fff;
    border-radius: 15px;
    padding: 77px 63px 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: #ff4f35;
    .title {
      font-size: 59px;
      font-family: SJbangshu;
    }
    .content {
      box-sizing: border-box;
      width: 100%;
      margin-top: 30px;
      img {
        width: 100%;
        height: 341px;
        object-fit: cover;
      }
      .text {
        margin-top: 30px;
        font-size: 34px;
        font-family: FZYaZhuTiS;
        color: #ff4f35;
        line-height: 45px;
        text-align: justify;
      }
    }
  }
  .close {
    width: 237px;
    height: 104px;
    margin: 45px auto;
    background-image: url(~@assets/images/game/next.png);
    background-repeat: no-repeat;
    background-size: contain;
    &.last {
      background-image: url(~@assets/images/game/score.png);
    }
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
