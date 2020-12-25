<template>
  <div class="activity-rule mask">
    <div class="box">
      <div class="title">活动规则</div>
      <div class="rules">
        <p class="rule">
          1. 本次十九届五中全会大学习分为“十九届五中
          全会基本情况”“十三五成就”“2035年远景目
          标”“十四五规划”四个板块。从2020年12月25日起，每周新增开放一个板块
        </p>
        <p class="rule">
          2. 每个板块内含10道题目，囊括填字题、填空题、
          选择题三种题型，您需根据题目要求进行作答。
        </p>
        <p class="rule">
          3. 每次答题开始后，系统将自动开始记录您的答
          题时间。若回答正确，进入题目解析页面，计时暂
          停。选择开始作答下一题后，计时继续，直至所有
          题目回答完毕。最终计时器记录的时间即为您的个
          人成绩。您需根据题目要求进行作答。
        </p>
        <p class="rule">
          4. 每个板块开放后的一周内，您有三次冲击排行
          榜的机会。答题成绩排在前10名的用户，即可进入排行榜。
        </p>
        <p class="rule">
          5. 在板块排行榜停止记录后或三次冲击排行榜机
          会使用完毕后，你仍可继续答题。但每个板块的最
          终成绩为你在该板块答题最好成绩。
        </p>
      </div>
    </div>
    <div class="close" @click="close"></div>
  </div>
</template>

<script>
export default {
  setup(props, ctx) {
    const close = () => ctx.emit("close");
    return {
      close
    };
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: SJbangshu;
  src: url(~@assets/font/SJbangshu.TTF);
}
@font-face {
  font-family: FZYaZhuTiS;
  src: url(~@assets/font/FZYaZhuTiS.OTF);
}
.activity-rule {
  .box {
    box-sizing: border-box;
    margin: 52px 56px 0;
    background-color: #fff;
    border-radius: 15px;
    padding: 49px 30px 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: #ff4f35;
    .title {
      font-size: 59px;
      margin-bottom: 49px;
      font-family: SJbangshu;
    }
    .rule {
      font-size: 24px;
      font-family: FZYaZhuTiS;
      font-weight: bold;
      line-height: 34px;
      margin-bottom: 44px;
    }
  }
  .close {
    width: 237px;
    height: 104px;
    margin: 54px auto;
    background: url(~@assets/images/button.png);
    background-repeat: no-repeat;
    background-size: contain;
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
