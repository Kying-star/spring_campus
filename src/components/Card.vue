<template>
  <div class="card">
    <div class="background">
      <p class="title">{{ title }}</p>
      <div class="icon"></div>
      <div class="collection-state">
        {{ collectionState ? "已收集" : "未收集" }}
      </div>
      <p class="tip">左右滑动切换卡片</p>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    // imgSrc: String,
    title: String,
    collectionState: Boolean
  },
  setup(props) {
    console.log(props);
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
  font-family: HappyZcool-2016, serif;
  display: flex;
  justify-content: center;
  align-items: center;
  .background {
    width: 676px;
    height: 842px;
    margin-left: 25px;
    background: url(~@assets/images/HistoryCard/card-bk.png);
    background-size: 100%;
    position: relative;
    .title {
      color: #f66430;
      font-size: 34px;
      position: absolute;
      top: 70px;
      left: 85px;
    }
    .collection-state {
      width: 110px;
      height: 61px;
      position: absolute;
      right: 94px;
      top: 58px;
      background: url(~@assets/images/HistoryCard/circle.png);
      background-size: 100%;
      color: #fc9456;
      font-size: 26px;
      line-height: 61px;
      text-align: center;
    }
    .icon {
      width: 140px;
      height: 140px;
      background: url(~@assets/images/HistoryCard/icon.png);
      background-size: 100%;
      position: absolute;
      right: 53px;
      bottom: 62px;
    }
    .tip {
      color: #f9b549;
      font-size: 26px;
      position: absolute;
      bottom: 34px;
      right: 114px;
    }
    .content {
      width: 500px;
      height: 610px;
      margin-left: 72px;
      margin-top: 157px;
      background-color: #fcddbc;
      border-radius: 10px;
    }
  }
}
</style>
