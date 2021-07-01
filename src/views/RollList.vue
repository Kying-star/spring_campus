<!--
 * @Author: your name
 * @Date: 2020-12-26 15:47:00
 * @LastEditTime: 2021-07-01 18:05:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/src/views/RollList.vue
-->
<template>
  <div class='rollhome'>
    <div class='bgRoll'></div>
    <div class='flower'></div>
    <header>
      <div class='score-head'>
        <div class='score-head-inner'>
          <div
            v-for='(item, index) in array'
            :key='item.index'
            @click='showList(index)'
            :class='index === show_index ? `on` : `default`'
          >{{ item }}</div>
        </div>
      </div>
      <div class='score'>
        <div class='title'>我的成绩</div>
        <div class='scoreInfo' v-if='!isOnRank'>未完成该版块</div>
        <div class='score-inner' v-if='isOnRank'>
          <div>
            <p>{{ score * 2 }}分</p>
            <p>分数</p>
          </div>
          <div>
            <p>{{ format(time) }}</p>
            <p>用时</p>
          </div>
          <div>
            <p>{{ order }}</p>
            <p>排名</p>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class='inner'>
        <div class='tip'>
          {{ buttonList[title_index].info }}
          <br />答题排行榜
        </div>
        <div class='list' v-if='!IsVoid'>
          <RollItem
            v-for='item in rollList'
            :key='item'
            :order='item.order'
            :nickname='item.nickname'
            :time='item.time'
            :Avatar='item.avatar'
            :score='title_index === 0 ? item.score / 2 : item.score * 2'
          />
        </div>
        <div class='listVoid' v-if='IsVoid'>
          <p>目前还没有人完成该版块 排行榜空空如也</p>
        </div>
        <div class='back' @click='back()'></div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getRank, getUserRank } from "@/services/api";
import RollItem from "@components/RollItem";
import { format } from "@/tools/format";
export default {
  components: { RollItem },
  setup() {
    // 板块基本信息修改
    const lockTime = [
      1624118400, 1625068800, 1633017600, 1633017600, 1633881600,
    ];
    const array = ["板块一", "板块二", "板块三", "板块四", "总排行"];
    const buttonList = ref([
      { info: "总排行" },
      { info: "新民主主义革命史" },
      { info: "社会主义革命建设史" },
      { info: "改革开放与社会主义现代化建设史" },
      { info: "新时代中国特色社会主义史" },
    ]);
    const order = ref(0);
    const score = ref(0);
    const time = ref(0);
    const title_index = ref(1);
    const show_index = ref(0);
    const router = useRouter();
    const IsVoid = ref(false);
    const rollList = ref([
      // { order: 1, nickname: "卷卷一号", time: "00:10:20", avatar: "" },
    ]);
    const isOnRank = ref(true);
    // const type_index = ref(4);
    const back = () => router.push("/block");
    const fetchScore = async () => {
      const { data } = await getUserRank(title_index.value);
      console.log(1);
      console.log(data.data);
      order.value = data.data.ranking;
      if (data.data.ranking < 0) {
        isOnRank.value = false;
      }
      score.value = data.data.score;
      time.value = data.data.spendTime;
    };
    const fetchRank = async () => {
      const { data } = await getRank();
      // console.log(data, index);
      let temp = [];
      if (data.data[title_index.value].data == null) {
        IsVoid.value = true;
      }
      data.data[title_index.value].data.forEach((e) => {
        //console.log(e);
        let item = {};
        item.order = e.ranking;
        item.nickname = e.nick_name;
        item.avatar = e.avatar;
        item.score = e.score;
        item.time = e.spend_time;
        temp.push(item);
      });

      console.log(temp);
      rollList.value = temp;
    };
    const showList = (index) => {
      // console.log(index);
      if (index > 1) return;
      let nowIndex = index == 4 ? 0 : index + 1;
      console.log(lockTime[nowIndex], Date.parse(new Date()) / 1000);
      // if (lockTime[nowIndex] > Date.parse(new Date()) / 1000) {
      //   return;
      // }
      show_index.value = index;
      // 写的跟屎一样的刷新，回来再改
      title_index.value = index == 4 ? 0 : index + 1;
      fetchScore(title_index.value);
      fetchRank(title_index.value);
    };
    fetchRank(title_index.value);
    fetchScore();
    const sayhi = () => {
      console.log(1);
    };
    return {
      isOnRank,
      title_index,
      buttonList,
      rollList,
      RollItem,
      back,
      showList,
      IsVoid,
      order,
      score,
      time,
      format,
      array,
      sayhi,
      show_index,
    };
  },
};
</script>

<style lang="scss" socped>
.rollhome {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: "SimHei";
  .flower {
    position: absolute;
    width: 110px;
    height: 105px;
    left: 617px;
    top: 343px;
    background-image: url(~@assets/images/roll/flower.png);
    background-size: cover;
  }
  .bgRoll {
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
    margin: 49px 20px 0px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .score-head-inner {
      height: 91px;
      width: 800px;
      display: flex;
    }
    .score-head {
      width: 660px;
      height: 91px;
      display: flex;
      overflow-x: auto;
      box-sizing: content-box;
      padding-right: 17px;
      .on {
        width: 135px;
        height: 81px;
        margin-left: 19px;
        font-size: 32px;
        font-family: HappyZcool-2016;
        font-weight: 400;
        color: #fff9f2;
        line-height: 81px;
        text-align: center;
        background-image: url(~@assets/images/roll/on.png);
        background-size: cover;
      }
      .default {
        width: 135px;
        height: 81px;
        margin-left: 19px;
        font-size: 32px;
        font-family: HappyZcool-2016;
        font-weight: 400;
        color: #ff914f;
        line-height: 81px;
        text-align: center;
        background-image: url(~@assets/images/roll/off.png);
        background-size: cover;
      }
    }
    .score {
      margin: 0 auto;
      width: 660px;
      height: 265px;
      background-image: url(~@assets/images/roll/score-bk.png);
      background-size: cover;
      display: flex;
      flex-direction: column;
      text-align: center;

      .title {
        width: 660px;
        height: 36px;
        margin-top: 80px;
        font-size: 40px;
        font-family: HappyZcool-2016;
        font-weight: bold;
        color: #ee5d2a;
        word-break: keep-all;
        line-height: 12px;
      }
      .scoreInfo {
        margin-top: 37px;
        font-size: 30px;
        font-family: 华康少女;
        font-weight: 400;
        color: #ff753f;
        line-height: 35px;
      }
      .score-inner {
        margin-top: 15px;
        display: flex;
        justify-content: center;
        div {
          width: 200px;
          p:nth-child(1) {
            font-size: 38px;
            font-family: 华康少女;
            font-weight: 400;
            color: #fc6d34;
            line-height: 30px;
          }
          p:nth-child(2) {
            margin-top: 20px;
            font-size: 30px;
            font-family: 华康少女;
            font-weight: 400;
            color: #fc9456;
            line-height: 30px;
          }
        }
      }
    }
  }
  main {
    width: 100%;
    margin-top: 15px;
    .inner {
      margin: 0px auto;
      width: 660px;
      height: 774px;
      background-image: url(~@assets/images/roll/roll-bk.png);
      background-size: cover;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .tip {
        width: 480px;
        margin-top: 58px;
        margin-bottom: 48px;
        font-size: 40px;
        font-family: HappyZcool-2016;
        font-weight: 400;
        color: #ee5d2a;
        line-height: 42px;
        text-align: center;
      }
      .list {
        width: 623px;
        height: 400px;
        overflow-y: scroll;
        overflow-x: hidden;
      }
      .listVoid {
        width: 623px;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          text-align: center;
          width: 357px;
          height: 62px;
          font-size: 30px;
          font-family: 华康少女;
          font-weight: 400;
          color: #ff753f;
          line-height: 35px;
        }
      }
      .back {
        margin: 0 auto 32px auto;
        width: 341px;
        height: 192px;
        background-image: url(~@assets/images/roll/back.png);
        background-size: contain;
        background-repeat: no-repeat;
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
    .ref {
      margin-bottom: 16px;
    }
  }
}
</style>
