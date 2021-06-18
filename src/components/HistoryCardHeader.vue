<!--
 * @Author: myjdml
 * @Date: 2021-05-30 20:21:01
 * @LastEditors: myjdml
 * @LastEditTime: 2021-06-18 16:44:08
 * @Description: 校史卡片板块头部
-->
<template>
  <div class="history-card-header">
    <div class="card-list">
      <div
        :class="item.state ? `cards selectTab` : `cards unSelectTab`"
        v-for="(item, index) in cardListInner"
        :key="index"
        @click="clickModule(index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "HistoryCardHeader",
  setup(props, ctx) {
    const lockTime = [1624118400, 1625068800, 1633017600, 1633017600];
    const cardListInner = ref([
      {
        name: "板块一",
        state: true
      },
      {
        name: "板块二",
        state: false
      },
      {
        name: "板块三",
        state: false
      },
      {
        name: "板块四",
        state: false
      }
    ]);
    /**
     * @description: 点击事件，切换Tab的CSS样式
     * @param {*} index
     * @return {*}
     * @author: myjdml
     */
    const clickModule = index => {
      if (lockTime[index] > Date.parse(new Date()) / 1000) {
        return;
      }
      cardListInner.value.forEach(item => {
        item.state = false;
      });
      cardListInner.value[index].state = true;
      // 向外传递点击事件点击的板块
      ctx.emit("clickModuleIndex", index);
    };
    const imageUpdate = () => {};
    console.log(props, ctx);
    return {
      cardListInner,
      clickModule,
      imageUpdate
    };
  }
};
</script>

<style lang="scss" scoped>
.history-card-header {
  height: 80px;
  background: url(~@assets/images/HistoryCard/rope.png);
  background-size: 100%;
  position: relative;
  font-family: HappyZcool-2016, serif;
}
.card-list {
  .cards {
    width: 168px;
    height: 136px;
    background: url(~@assets/images/HistoryCard/board.png);
    background-size: 100%;
    color: #ff8251;
    text-align: center;
    line-height: 136px;
    font-size: 28px;
    position: absolute;
    top: 500px;
  }
  .cards:nth-child(1) {
    top: 10px;
    left: 32px;
    transform: rotate(5deg);
  }
  .cards:nth-child(2) {
    top: 18px;
    left: 220px;
    transform: rotate(0deg);
  }
  .cards:nth-child(3) {
    top: 28px;
    left: 405px;
    transform: rotate(0deg);
  }
  .cards:nth-child(4) {
    top: 33px;
    left: 578px;
    transform: rotate(-2deg);
  }
  .selectTab {
    background: url(~@assets/images/HistoryCard/board-select.png);
    background-size: 100%;
    color: white;
  }
  .unSelectTab {
    background: url(~@assets/images/HistoryCard/board.png);
    background-size: 100%;
  }
}
</style>
