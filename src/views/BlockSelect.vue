<template>
  <div class="block">
    <div class="background"></div>
    <ActivityRule
      v-show="isShowActivityRule"
      :start="isShowActivityRule"
      @close="showActivityRule(false)"
    />
    <header>
      <!-- <div class='backHome' @click='gotoHome'></div> -->
      <div class="catalogue" @click="showActivityRule(true)"></div>
    </header>
    <main>
      <div class="blocks">
        <div class="flower"></div>
        <div
          class="block"
          v-for="(block, index) in blockList"
          :key="block"
          @click="toGame(index + 1)"
        >
          <!-- <TipBlock v-show='block.isAnswer' :count='block.count' /> -->
          <div class="blockInner">
            <div class="blockTitle">{{ block.txt }}</div>
            <div class="blockBottom">
              <div
                class="blockAccuracy"
                v-if="block.isOpen && block.opportunity != 3"
              >
                正确率：{{ block.accuracy }}/50
              </div>
              <div
                class="blockFooter"
                v-if="block.isOpen && block.time != 0 && block.opportunity != 3"
              >
                用时：{{ format(block.time) }}
              </div>
              <div
                class="blockFooter"
                v-if="block.isOpen && block.opportunity == 3"
              >
                未完成
              </div>
              <div
                class="blockFooter"
                v-if="block.isOpen && block.id < 49 && block.id != 0"
              >
                完成进度：{{ block.id }}/50
              </div>
              <div
                class="blockChance"
                v-if="block.isOpen && block.opportunity != 0"
              >
                剩余次数: {{ block.opportunity }}
              </div>
              <div class="blockFooter" v-if="!block.isOpen">版块解锁时间：</div>
              <div class="blockFooter" v-if="!block.isOpen">
                {{ lockTime[index] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="roll" @click="gotoRoll()"></div>
      <div class="checkCard" @click="gotoHistoryCard()"></div>
    </footer>
  </div>
</template>

<script>
import ActivityRule from "@components/ActivityRule";
// import TipBlock from "@components/TipBlock";
import { getProgress, getScore } from "@/services/api";
import { ref } from "vue";
import { format } from "../tools/format";
import { useRouter } from "vue-router";
export default {
  components: { ActivityRule },
  setup() {
    const isShowActivityRule = ref(false);
    const router = useRouter();
    getScore().then(e => {
      console.log(e);
    });
    const toGame = type => {
      router.push(`/game?type=${type}`);
    };
    const showActivityRule = status => {
      isShowActivityRule.value = status;
    };
    const gotoRoll = () => router.push(`/roll`);
    const gotoHistoryCard = () => router.push(`/history-card`);
    const blockList = ref([
      {
        isAnswer: true,
        count: 1,
        type: "basic",
        txt: "新民主主义 革命史",
        footer: "[等你答题]",
        accuracy: "正确率：24/50",
        time: "用时：05:22:09",
        opportunity: 1
      },
      {
        isAnswer: true,
        count: 1,
        type: "Achievements",
        txt: "社会主义革命 建设史",
        footer: "[解锁时间：2020年12月25日]",
        accuracy: "正确率：24/50",
        time: "用时：05:22:09",
        opportunity: 3
      },
      {
        isAnswer: true,
        count: 1,
        type: "target",
        txt: "改革开放 与社会主义 现代化建设史",
        footer: "[解锁时间：2020年12月25日]",
        accuracy: "正确率：24/50",
        time: "用时：05:22:09",
        opportunity: 0
      },
      {
        isAnswer: true,
        count: 1,
        type: "plan",
        txt: "新时代 中国特色 社会主义史",
        footer: "[解锁时间：2020年12月25日]",
        accuracy: "正确率：24/50",
        time: "用时：05:22:09",
        opportunity: 0
      }
    ]);

    const txt = [
      "新民主主义 革命史",
      "社会主义革命 建设史",
      "改革开放 与社会主义 现代化建设史",
      "新时代 中国特色 社会主义史"
    ];
    const lockTime = ["6月20日", "7月1日", "10月1日", "10月1日"];
    const gotoHome = () => router.push("/");
    const getBlockDetail = async () => {
      const { data } = await getScore();
      console.log(data);
      let temp = [];
      let id = [];
      for (let i = 1; i < 5; i++) {
        const { data } = await getProgress(i);
        console.log(data.data);
        data.data == null ? id.push(0) : id.push(data.data.id);
      }
      console.log(id);
      data.data.forEach(async (e, index) => {
        const item = {};
        item.opportunity = e.opportunity;
        item.footer = getMin(e.score, index);
        item.score = e.score;
        item.accuracy = e.score;
        item.time = e.spend_time;
        item.type = e.type;
        item.txt = txt[index];
        item.isOpen = e.is_open;
        item.id = id[index];
        temp.push(item);
      });
      console.log(temp);
      blockList.value = temp;
      // blockList.value = data
    };
    const getMin = (ms, index) => {
      let temp;
      const minutes = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = (ms % (1000 * 60)) / 1000;
      if (index > 3) {
        temp = lockTime.value[index - 1];
        console.log(temp);
        return `[${temp}解锁]`;
      } else if (minutes === 0 && seconds === 0) {
        temp = "[等你答题!]";
      } else {
        temp = `[成绩${minutes * 60 + seconds}S]`;
      }
      return temp;
    };
    getBlockDetail();
    return {
      isShowActivityRule,
      showActivityRule,
      blockList,
      toGame,
      gotoRoll,
      gotoHome,
      gotoHistoryCard,
      format,
      lockTime
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
    background-image: url(~@assets/images/base/inner-bk.png);
    background-size: cover;
    background-repeat: no-repeat;
  }
  header {
    margin: 35px 35px 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .backHome {
      width: 39px;
      height: 42px;
      background-image: url(~@assets/images/BlockSelect/backHome.png);
      background-size: cover;
    }
    .catalogue {
      width: 84px;
      height: 84px;
      background-image: url(~@assets/images/BlockSelect/Catalogue.png);
      background-size: contain;
      background-repeat: no-repeat;
    }
    .catalogue::after {
      white-space: nowrap;
      position: relative;
      top: 84px;
      left: -1px;
      content: "活动规则";
      font-size: 22px;
      font-family: HappyZcool-2016;

      color: #ffdf6e;
    }
  }
  main {
    width: 100%;
    transform: translateY(10px);
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
      margin-top: 13px;
      .flower {
        position: absolute;
        width: 79px;
        height: 112px;
        left: 0px;
        top: 400px;
        z-index: 10;
        background-image: url(~@assets/images/home/flower.png);
        background-size: cover;
      }
      .block {
        position: relative;
        width: 329px;
        height: 401px;
        margin: 0px 12.5px 30px 12.5px;
        border-radius: 15px;
        background-image: url(~@assets/images/BlockSelect/block-bk.png);
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        .blockBottom {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .blockInner {
          width: 262px;
          height: 269px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
        .blockTitle {
          margin-top: 15px;
          font-size: 36px;
          font-family: HappyZcool-2016;
          font-weight: 400;
          color: #ee5d2a;
          text-align: center;
          word-break: keep-all;
        }
        .blockAccuracy {
          font-size: 30px;
          font-family: 华康少女;
          font-weight: 400;
          color: #ff753f;
          line-height: 38px;
        }
        .blockFooter {
          font-size: 30px;
          font-family: 华康少女;
          font-weight: 400;
          color: #ff753f;
          white-space: nowrap;
        }
        .blockChance {
          font-size: 30px;
          font-family: 华康少女;
          font-weight: 400;
          color: #ff753f;
        }
      }
    }
  }
  footer {
    width: 100%;
    text-align: center;
    font-size: 24px;
    color: #ffb5a9;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .roll {
      margin: 0 auto 32px auto;
      width: 381px;
      height: 174px;
      background-image: url(~@assets/images/BlockSelect/RollButton.png);
      background-size: contain;
      background-repeat: no-repeat;
    }
    .checkCard {
      margin: 0 auto 32px auto;
      width: 381px;
      height: 174px;
      background-image: url(~@assets/images/BlockSelect/check-btn.png);
      background-size: contain;
      background-repeat: no-repeat;
    }
    .ref {
      margin-bottom: 16px;
    }
  }
}
</style>
