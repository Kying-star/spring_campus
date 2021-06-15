<template>
  <div class='score mask'>
    <div class='box'>
      <div class='title'>成绩</div>
      <div class='text'>
        <li class='text-title'>
          恭喜你完成了
          <span class='type'>{{ name }}</span>板块的党史知识问答。
        </li>
        <li class='text-accuracy'>
          <p class='text-left'>答题正确率 :</p>
          <p class='text-right'>{{score}}/50</p>
        </li>
        <li class='text-time'>
          <p class='text-left'>答题用时 :</p>
          <p class='text-right'>{{ format(time) }}</p>
        </li>
        <li class='text-roll'>
          <p class='text-left'>排名 :</p>
          <p class='text-right'>{{ rank }}</p>
        </li>
      </div>
      <div class='cy-icon'></div>
    </div>
    <div class='control'>
      <div class='back button' @click='complete(`/block`)'></div>
      <div class='rank button' @click='complete(`/roll`)'></div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { format } from "../tools/format";
export default {
  props: {
    name: String,
    score: String,
    rank: String,
    percent: String,
    type: String,
    time: Number,
  },
  setup(props, ctx) {
    const route = useRoute();
    const rankEndTime = {
      basic: "2021-01-06 00:00:00",
      achievement: "2021-01-06 00:00:00",
      target: "2021-01-06 00:00:00",
      plan: "2021-01-06 00:00:00",
    };
    const isShowRank = computed(
      () =>
        +new Date() < +new Date(rankEndTime[props.type]) &&
        route.query.opportunity > 0
    );
    const close = () => ctx.emit("close");
    const complete = (router) => ctx.emit("complete", router);
    return {
      close,
      complete,
      isShowRank,
      format,
    };
  },
};
</script>

<style lang="scss" scoped>
.score {
  z-index: 999;
  width: 100vw;
  height: 100vh;
  .box {
    width: 630px;
    height: 625px;
    background-image: url(~@assets/images/game/score-bk.png);
    background-size: cover;
    box-sizing: border-box;
    margin: 139px 56px 0;
    background-color: #fff;
    border-radius: 15px;
    padding: 97px 101px 80px 104px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: #ff4f35;
    .cy-icon {
      position: absolute;
      left: 550px;
      top: 630px;
      width: 128px;
      height: 128px;
      background-image: url(~@assets/images/game/cy-icon.png);
      background-size: cover;
    }
    .title {
      font-size: 48px;
      font-family: HappyZcool-2016;
      font-weight: bold;
      color: #ee5d2a;
      line-height: 12px;
    }
    .text {
      .text-title {
        display: inline;
        font-size: 28px;
        font-family: 华康少女;
        font-weight: 400;
        color: #f8ad4b;
        line-height: 38px;
      }
      margin-top: 36px;
      li {
        display: flex;
        list-style: none;
        .text-left {
          width: 216px;
        }
        .text-right {
          font-size: 44px;
          font-family: HappyZcool-2016;
          font-weight: 400;
          color: #f06a39;
          line-height: 12px;
        }
        p {
          list-style: none;
          font-size: 30px;
          font-family: HappyZcool-2016;
          font-weight: 400;
          color: #ff7d3d;
          line-height: 12px;
        }
        &:last-child {
          margin-bottom: 0;
        }
        .type {
          color: #fc9c56;
          font-size: 30px;
        }
        .info {
          font-size: 40px;
          color: #6977ff;
        }
      }
      .text-accuracy {
        margin-top: 63px;
      }
      .text-time {
        margin-top: 51px;
      }
      .text-roll {
        margin-top: 54px;
      }
    }
  }
  .control {
    margin-top: 54px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 115px;
    .button {
      width: 208px;
      height: 112px;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .back {
      width: 297px;
      height: 171px;
      background-image: url(~@assets/images/game/back.png);
    }
    .rank {
      width: 346px;
      height: 171px;
      background-image: url(~@assets/images/game/rank.png);
    }
  }
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -999px;
  background-color: rgba(61, 45, 43, 0.5);
}
</style>
