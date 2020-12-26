<!--
 * @Author: your name
 * @Date: 2020-12-26 23:04:50
 * @LastEditTime: 2020-12-26 23:53:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/src/components/RollItem.vue
-->
<template>
  <div class="item">
    <img class="rank" src="~@assets/images/BlockSelect/first.png" />
    <img class="Avatar"  src="~@assets/images/BlockSelect/avatar.png" />
    <div class="nickname">卷卷一号</div>
    <img class="clock" src="~@assets/images/BlockSelect/darkClock.png"  alt="">
    <div class="time">00:10:20</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.item {
  width: 623px;
  height: 99px;
  background-color: #ffeeee;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .rank {
    width: 61px;
    height: 70px;
  }
  .Avatar{
    width: 75px;
    height: 75px;
  }
  .nickname {
    font-size: 23px;
    font-family: FZYaZhuTiS;
    font-weight: bold;
    color: #FF2404;
    line-height: 38px;
  }
  .clock {
    width: 38px;
    height: 38px;
  }
  .time {
    font-size: 22px;
    font-family: FZYaZhuTiS;
    font-weight: bold;
    color: #2064FF;
    line-height: 38px;
  }
}
</style>
