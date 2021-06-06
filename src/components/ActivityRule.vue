<!--
 * @Author: your name
 * @Date: 2021-01-01 15:08:43
 * @LastEditTime: 2021-05-30 21:08:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nineteenth-committee-fe/src/components/ActivityRule.vue
-->
<template>
  <div class="activity-rule mask">
    <div class="box">
      <div class="title">活动规则</div>
      <div class="rules">
        <p class="rule">
          1、本次“校园之春”党史知识问答分为 “新民主主义革命史”、“社会主义革命
          建设史”、“改革开放与社会主义现代化 建设史”、“新时代中国特色社会主义
          史”四个板块，每个板块含50道选择题， 你需根据题目信息进行作答。
        </p>
        <p class="rule">
          2、每次答题开始后，系统将自动开始记
          录用户的答题时间以及答题正确率，用户
          完成板块中的50道题目后，系统会自动保 存用户的答题正确率以及答题时间。
        </p>
        <p class="rule">
          3、用户可以进行多次答题，系统会保存 用户在各个板块中最好的答题成绩。
        </p>
        <p class="rule">
          4、用户只有完成4个板块的答题，才能进
          行排行榜排名。排行榜根据用户的分数以
        </p>
        <p class="rule">
          5、在每个板块中，用户每答完5道题便会获得“校园之春”的纪念卡片。用户可以自行选择是否保存留念。
        </p>
        <p class="rule">
          6、活动结束后，排行榜前xx名可以获得奖励，工作人员会通过用户在个人信息中填写的电话号码进行联系，发布奖品。
        </p>
      </div>
      <div class="close" @click="close">确认{{ grtInfo(clickNum) }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: {
    start: Boolean
  },
  setup(props, ctx) {
    const startState = ref(props.start);
    const clickNum = ref(10);
    const clicked = ref(false);
    const close = () => ctx.emit("close");
    let reciprocal = () => {
      let timer = setInterval(() => {
        clickNum.value--;
        if (clickNum.value < 1) {
          clearInterval(timer);
          clicked.value = true;
        }
      }, 1000);
    };
    const grtInfo = num => (num >= 1 ? `(${num})` : ``);
    reciprocal();
    return {
      close,
      clickNum,
      startState,
      clicked,
      grtInfo
    };
  }
};
</script>

<style lang="scss" scoped>
.activity-rule {
  z-index: 999;
  .box {
    box-sizing: border-box;
    margin: 31px auto;
    width: 630px;
    height: 1080px;
    background-image: url(~@assets/images/home/rule-bk.png);
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
      margin-top: 151px;
      font-size: 59px;
      margin-bottom: 41px;
      font-size: 48px;
      font-family: HappyZcool-2016;
      font-weight: bold;
      color: #ee5d2a;
      line-height: 12px;
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
