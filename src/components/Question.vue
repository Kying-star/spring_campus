<template>
  <div class="question">
    <div class="title">第{{ index }}/10题</div>
    <div class="content" v-html="showText"></div>
    <div class="wrong">回答错误，请重新作答</div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: String,
      required: true
    },
    showText: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.question {
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  border-radius: 20px;
  padding: 31px 41px 0;
  text-align: center;
  border: 1px #d1f9e1 solid;
  .title {
    font-size: 49px;
    font-family: SJbangshu;
    font-weight: bold;
    color: #ff9000;
    margin-bottom: 58px;
  }
  .content {
    font-size: 31px;
    font-family: FZYaZhuTiS;
    color: #ff462a;
    line-height: 45px;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
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
</style>
