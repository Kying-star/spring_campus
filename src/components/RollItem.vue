<!--
 * @Author: your name
 * @Date: 2020-12-26 23:04:50
 * @LastEditTime: 2021-05-30 17:43:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/src/components/RollItem.vue
-->
<template>
  <div class='item'>
    <div class='personDetail'>
      <div class='rank'>{{ rank }}</div>
      <img class='Avatar' :src='Avatar' />
      <div class='nickname'>{{ nick }}</div>
    </div>
    <div class='times'>
      <div class='score'>{{score}}分</div>
      <div class='time'>{{ time }}s</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    order: Number,
    nickname: String,
    time: String,
    Avatar: String,
    score: Number,
  },
  setup(props) {
    const rank = ref(props.order);
    const nick = ref(props.nickname);
    const scoreNum = ref(props.score);
    console.log(nick);
    const isShowNum = ref(true);
    console.log(rank);
    const getRankClass = () => {
      let style = "default";
      console.log(rank.value);
      switch (rank.value) {
        case 1:
          style = "default first";
          break;
        case 2:
          style = "default second";
          break;
        case 3:
          style = "default third";
          break;
        default:
          break;
      }
      if (rank.value <= 3) {
        isShowNum.value = false;
      }
      return style;
    };
    const getClockClass = () =>
      rank.value <= 3 ? "clock" : "clock lightClock";
    return {
      getClockClass,
      getRankClass,
      rank,
      isShowNum,
      nick,
      scoreNum,
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 580px;
  height: 99px;
  margin: 10px auto;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .personDetail {
    display: flex;
    align-items: center;
  }
  .default {
    width: 61px;
    height: 70px;
    background-size: cover;
    margin-left: 20px;
    font-size: 29px;
    font-family: SJbangshu;
    font-weight: 400;
    color: #ff5a00;
    line-height: 70px;
    text-align: center;
  }

  .rank {
    margin-left: 25px;
    font-size: 32px;
    font-family: 华康少女;
    font-weight: bold;
    color: #ff753f;
    line-height: 35px;
  }
  .Avatar {
    margin-left: 34px;
    width: 75px;
    height: 75px;
  }
  .nickname {
    width: 200px;
    margin-left: 24px;
    font-size: 28px;
    font-family: 华康少女;
    font-weight: 400;
    color: #ff753f;
    line-height: 35px;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
  .score {
    margin-right: 20px;
    font-size: 28px;
    font-family: 华康少女;
    font-weight: 400;
    color: #ff753f;
    line-height: 35px;
  }
  .times {
    width: 200px;
    display: flex;
    justify-content: flex-end;
  }
  .time {
    margin-right: 10px;
    font-size: 28px;
    font-family: 华康少女;
    font-weight: 400;
    color: #ff753f;
    line-height: 35px;
  }
}
</style>
