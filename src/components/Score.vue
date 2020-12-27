<template>
  <div class="activity-rule mask">
    <div class="box">
      <div class="title">成绩单</div>
      <div class="text">
        <p>
          恭喜你完成了<span class="type">{{ name }}</span
          >的学习。
        </p>
        <p>
          你的成绩是<span class="info">{{ score }}</span>
        </p>
        <p>
          祝贺你进入了<span class="info">{{ rank }}</span
          >你的成绩已经超过了<span class="info">{{ percent }}</span
          >的同学
        </p>
        <p>希望你在接下来的学习中继续努力，保持优秀！</p>
      </div>
    </div>
    <div class="control">
      <div class="back button" @click="complete('/block')"></div>
      <div class="rank button" @click="complete('/roll')"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    score: String,
    rank: String,
    percent: String,
  },
  setup(props, ctx) {
    const close = () => ctx.emit("close");
    const complete = (router) => ctx.emit("complete", router);
    return {
      close,
      complete
    };
  }
};
</script>

<style lang="scss" scoped>
.activity-rule {
  z-index: 999;
  .box {
    box-sizing: border-box;
    margin: 62px 56px 0;
    background-color: #fff;
    border-radius: 15px;
    padding: 74px 30px 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: #ff4f35;
    .title {
      font-size: 59px;
      margin-bottom: 67px;
      font-family: SJbangshu;
    }
    .text {
      p {
        font-size: 34px;
        font-family: FZYaZhuTiS;
        color: #ff4f35;
        line-height: 48px;
        margin-bottom: 30px;
        &:last-child {
          margin-bottom: 0;
        }
        .type {
          color: #ff1717;
          font-size: 36px;
        }
        .info {
          font-size: 40px;
          color: #6977ff;
        }
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
      background-image: url(~@assets/images/game/back.png);
    }
    .rank {
      background-image: url(~@assets/images/game/rank.png);
    }
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
