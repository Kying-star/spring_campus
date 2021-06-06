<template>
  <div class="question">
    <div class="title">第{{ index }}/{{ total }}题</div>
    <div class="content" v-html="showText"></div>
    <div class="tip">请选择正确选项</div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    showText: {
      type: String,
      required: true
    },
    isShowWrong: {
      type: Boolean,
      required: true
    },
    total: Number
  }
};
</script>

<style lang="scss" scoped>
.question {
  width: 660px;
  height: 569px;
  transform: translateY(-70px);
  box-sizing: border-box;
  width: 100%;
  border-radius: 20px;
  padding: 31px 41px 97px;
  text-align: center;
  position: relative;
  background-image: url(~@assets/images/game/question-bk.png);
  background-size: cover;
  .title {
    margin-top: 107px;
    font-size: 48px;
    font-family: HappyZcool-2016;
    font-weight: bold;
    color: #ee5d2a;
    line-height: 12px;
    margin-bottom: 58px;
  }
  .content {
    font-size: 30px;
    font-family: 华康少女;
    font-weight: 400;
    color: #ff753f;
    line-height: 36px;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    text-align: left;
  }
  .tip {
    margin-top: 23px;
    text-align: left;
    font-size: 32px;
    font-family: HappyZcool-2016;
    font-weight: 400;
    color: #f06a39;
    line-height: 30px;
  }
}
</style>
<style scoped>
.content >>> .blank {
  border-bottom: 2px solid #ff4d4d;
  display: inline-block;
  font-size: 28px;
  text-align: center;
  box-sizing: border-box;
  height: 45px;
}
.content >>> .tip {
  border-bottom: 2px solid #ff4d4d;
  display: inline-block;
  font-size: 28px;
  text-align: center;
  box-sizing: border-box;
  height: 45px;
  color: #f3cd84;
}
</style>
