<!--
 * @Author: your name
 * @Date: 2021-01-01 15:08:43
 * @LastEditTime: 2021-06-21 19:34:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nineteenth-committee-fe/src/components/ActivityRule.vue
-->
<template>
  <div class='activity-rule mask'>
    <div class='box'>
      <div class='title'>活动规则</div>
      <div class='rules'>
        <p
          class='rule'
        >1、本次“追忆党史‘邮’我来”分为”新民主主义革命史”、“社会主义革命建设史”、“改革开放与社会主义现代化建设史”、“新时代中国特色社会主义史”四个板块，每个板块内含50道选择题，你需根据题目信息进行作答。</p>
        <p class='rule'>2、四个板块的解锁时间为6月22日、7月1日、10月1日、10月11日。活动时间为解锁时间后一周内。活动结束后，用户答题成绩将不记录在排行榜中。</p>
        <p
          class='rule'
        >3、每次答题开始后，系统将自动开始记录用户的答题时间以及答题正确率，当获得卡片时，计时停止。选择继续作答后，计时继续。用户完成板块中的50道题目后，系统会自动保存用户的答题正确率以及答题时间。当用户在答题中途退出答题时，系统会自动保存用户答题进度。</p>
        <p class='rule'>4、对于每个板块，用户有三次冲击排行榜的机会。排行榜根据用户的分数以及总用时进行排名，以分数为主要依据，相同分数下，用时少的用户排名更前。</p>
        <p class='rule'>5、用户每完成5道题目，即可获得卡片。用户可以自行选择是否保存卡片。</p>
        <p class='rule'>6、每个板块排行榜前10名的用户将获得网校原创徽章一套。另外，每个板块90分以上的用户（5名）将有机会获得1套网校原创徽章。</p>
        <p class='rule'>7、活动的解释权归红岩网校工作站所有，活动获奖信息请关注红岩网校工作站微信公众号“重邮小帮手”后续信息。</p>
      </div>
      <div class='close' @click='close'>确认{{ grtInfo(clickNum) }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: {
    start: Boolean,
  },
  setup(props, ctx) {
    const startState = ref(props.start);
    const clickNum = ref(10);
    const clicked = ref(false);
    const close = () => (clicked.value ? ctx.emit("close") : "");
    let reciprocal = () => {
      let timer = setInterval(() => {
        clickNum.value--;
        if (clickNum.value < 1) {
          clicked.value = true;
          clearInterval(timer);
        }
        console.log(clicked.value);
      }, 1000);
    };
    const grtInfo = (num) => (num >= 1 ? `(${num})` : ``);
    reciprocal();
    return {
      close,
      clickNum,
      startState,
      clicked,
      grtInfo,
    };
  },
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
      font-size: 28px;
      font-family: 华康少女;
      font-weight: 400;
      color: #ff753f;
      line-height: 35px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    .title {
      margin-top: 151px;
      font-size: 59px;
      margin-bottom: 30px;
      font-size: 48px;
      font-family: HappyZcool-2016;
      font-weight: bold;
      color: #ee5d2a;
      text-align: center;
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
