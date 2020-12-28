<template>
  <div class="block">
    <div class="background"></div>
    <ActivityRule
      v-show="isShowActivityRule"
      @close="showActivityRule(false)"
    />
    <header>
      <div class="backHome" @click="gotoHome"></div>
      <div class="catalogue" @click="showActivityRule(true)"></div>
    </header>
    <main>
      <div class="title"></div>
      <div class="blocks">
        <div
          class="block"
          v-for="block in blockList"
          :key="block"
          @click="toGame(block.type)"
        >
          <TipBlock v-show="block.isAnswer" :count="block.count" />
          <img
            :src="require(`../assets/images/BlockSelect/${block.type}.png`)"
          />
          <div class="blockTitle">{{ block.txt }}</div>
          <div class="blockFooter">{{ block.footer }}</div>
        </div>
      </div>
    </main>
    <footer>
      <div class="roll" @click="gotoRoll()"></div>
    </footer>
  </div>
</template>

<script>
import ActivityRule from "@components/ActivityRule";
import TipBlock from "@components/TipBlock";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  components: { ActivityRule, TipBlock },
  setup() {
    const isShowActivityRule = ref(false);
    const router = useRouter();
    const toGame = type => router.push(`/game?type=${type}`);
    const showActivityRule = status => {
      isShowActivityRule.value = status;
    };
    const gotoRoll = () => router.push(`/roll`);
    const blockList = ref([
      {
        isAnswer: true,
        count: 1,
        type: "basic",
        txt: "全会基本情况",
        footer: "[等你答题]"
      },
      {
        isAnswer: true,
        count: 1,
        type: "Achievements",
        txt: "“十三五”时期成就"
      },
      {
        isAnswer: true,
        count: 1,
        type: "target",
        txt: "2035年远景目标",
        footer: "[最终成绩32.54秒]"
      },
      {
        isAnswer: true,
        count: 1,
        type: "develop",
        txt: "“十四五”发展规划",
        footer: "[解锁时间：2020年12月25日]"
      }
    ]);
    const gotoHome = () => router.push("/");
    return {
      isShowActivityRule,
      showActivityRule,
      blockList,
      toGame,
      gotoRoll,
      gotoHome
    };
  }
};
</script>

<style lang="scss" socped>
.block {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-image: url(~@assets/images/BlockSelect/background.png);
    background-size: cover;
    background-repeat: no-repeat;
  }
  header {
    margin: 35px 35px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .backHome {
      width: 39px;
      height: 42px;
      background-image: url(~@assets/images/BlockSelect/backHome.png);
      background-size: cover;
    }
    .catalogue {
      width: 57px;
      height: 60px;
      background-image: url(~@assets/images/BlockSelect/Catalogue.png);
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  main {
    width: 100%;
    .title {
      margin: 21px auto 33px;
      width: 563px;
      height: 169px;
      background-image: url(~@assets/images/home/title.png);
      background-size: contain;
      background-repeat: no-repeat;
    }
    .blocks {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .block {
        position: relative;
        width: 290px;
        height: 344px;
        margin: 0px 12.5px 30px 12.5px;
        background: #ffffff;
        border: 2px solid #fff0bf;
        border-radius: 15px;
        img {
          width: 288px;
          height: 257px;
          background-size: cover;
        }
        .blockTitle {
          margin: 10px 0px 0px 0;
          height: 30px;
          width: 290px;
          font-size: 22px;
          font-family: SJbangshu;
          font-weight: bold;
          color: #ff4f35;
          line-height: 21px;
          text-align: center;
        }
        .blockFooter {
          transform: translateY(2px);
          width: 290px;
          height: 40px;
          background: #ff462a;
          border-radius: 0px 0px 15px 15px;
          font-size: 16px;
          font-family: FZYaZhuTiS;
          font-weight: bold;
          color: #ffedea;
          line-height: 40px;
          text-align: center;
        }
      }
    }
  }
  footer {
    width: 100%;
    margin: auto 0 0;
    text-align: center;
    font-size: 24px;
    color: #ffb5a9;
    font-weight: 500;
    .roll {
      margin: 0 auto 32px auto;
      width: 249px;
      height: 109px;
      background-image: url(~@assets/images/BlockSelect/RollButton.png);
      background-size: contain;
      background-repeat: no-repeat;
    }
    .ref {
      margin-bottom: 16px;
    }
  }
}
</style>
