<!--
 * @Author: your name
 * @Date: 2020-12-26 23:04:50
 * @LastEditTime: 2020-12-30 09:57:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/src/components/RollItem.vue
-->
<template>
  <div class="item">
    <div class="personDetail">
      <div :class="getRankClass()">{{ isShowNum ? rank : " " }}</div>
      <img class="Avatar" :src="Avatar" />
      <div class="nickname">{{ nick }}</div>
    </div>

    <div class="times">
      <div :class="getClockClass()" alt=""></div>
      <div class="time">{{ time }}</div>
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
    Avatar: String
  },
  setup(props) {
    const rank = ref(props.order);
    const nick = ref(props.nickname);
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
      nick
    };
  }
};
</script>

<style lang="scss" scoped>
.item {
  width: 623px;
  height: 99px;
  margin: 15px;
  background-color: #ffeeee;
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
  .first {
    background-image: url("../assets/images/BlockSelect/first.png");
  }
  .second {
    width: 57px;
    height: 70px;
    background-image: url("../assets/images/BlockSelect/second.png");
  }
  .third {
    width: 56px;
    height: 69px;
    background-image: url("../assets/images/BlockSelect/third.png");
  }
  .Avatar {
    margin-left: 32px;
    width: 75px;
    height: 75px;
  }
  .nickname {
    margin-left: 14px;
    font-size: 23px;
    font-family: SJbangshu;
    font-weight: bold;
    color: #ff2404;
    line-height: 38px;
  }
  .times {
    width: 160px;
    display: flex;
    align-content: flex-start;
  }
  .clock {
    margin-right: 16px;
    width: 37px;
    height: 39px;
    background-image: url(~@assets/images/BlockSelect/darkClock.png);
    background-size: cover;
  }
  .lightClock {
    background-image: url(~@assets/images/BlockSelect/lightClock.png);
  }
  .time {
    margin-right: 32px;
    font-size: 22px;
    font-family: SJbangshu;
    font-weight: bold;
    color: #2064ff;
    line-height: 38px;
  }
}
</style>
