<!--
 * @Author: myjdml
 * @Date: 2021-05-31 14:10:20
 * @LastEditors: myjdml
 * @LastEditTime: 2021-06-13 17:21:02
 * @Description: 
-->
<template>
 
  <div class="card">
    <div class="background">
      <!-- <div class="icon"></div> -->
      <div class="collection-state">
        {{ collectionState ? "已收集" : "未收集" }}
      </div>
      <div :class="collectionState ? 'collection-state-icon-check':'collection-state-icon-false'"></div>
      <p class="tip">左右滑动切换卡片</p>
      <div class="content">
        <img :src="imageSrc" alt="" />
        <p class="title">{{ title }}</p>
      </div>
      <p class="save-tip">长按图片即可保存到相册</p>

      <div class="cover" v-if="!collectionState"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    // imgSrc: String,
    title: String,
    imageSrc: String,
    collectionState: Boolean
  },
  setup(props) {
    console.log(props);
    return {};
  }
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
  font-family: 华康少女, serif;
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
    .collection-state {
      width: 110px;
      height: 61px;
      position: absolute;
      left: 440px;
      top: 60px;
      color: white;
      font-size: 30px;
      line-height: 61px;
      text-align: center;
    }
    .collection-state-icon-check {
      width: 40px;
      height: 25px;
      position: absolute;
      left: 555px;
      top: 76px;
      background: url(~@assets/images/HistoryCard/check.png);
      background-size: 100%;
    }
    .collection-state-icon-false {
      width: 27px;
      height: 28px;
      position: absolute;
      left: 555px;
      top: 76px;
      background: url(~@assets/images/HistoryCard/false.png);
      background-size: 100%;
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
      color: white;
      font-size: 26px;
      position: absolute;
      bottom: 34px;
      right: 84px;
    }
    .content {
      width: 522px;
      height: 644px;
      margin-left: 74px;
      margin-top: 113px;
      background: url(~@assets/images/HistoryCard/content.png);
      background-size: 100%;
      // background-color: #fcddbc;
      border-radius: 10px;
      position: relative;
      img {
        width: 468px;
        height: 334px;
        border-radius: 5px;
        position: absolute;
        left: 26px;
        top: 37px;
      }
      .title {
        color: #EE742A;
        font-size: 28px;
        position: absolute;
        top: 426px;
        left: 42px;
      }
    }
    .cover {
      width: 522px;
      height: 644px;
      background-color: rgba($color: #000000, $alpha: .35);
      border-radius: 10px;
      position: absolute;
      top: 113px;
      left: 74px;
    }
    .save-tip {
      color: #fbe6ad;
      font-size: 28px;
      position: absolute;
      bottom: -30px;
      right: 51px;
    }
  }
}
</style>
