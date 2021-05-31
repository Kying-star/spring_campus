<template>
  <div class="history-card-header">
    <div class="card-list">
      <div class="cards" v-for="(item, index) in cardListInner" :key="index">{{ item }}</div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";

export default {
  name: "HistoryCardHeader",
  setup() {
    const cardListInner = ["1982-1991", "1992-2001", "2001-2011", "2011-2021"];
    return {
      cardListInner
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
}
</style>
