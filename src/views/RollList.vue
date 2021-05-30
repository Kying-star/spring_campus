<!--
 * @Author: your name
 * @Date: 2020-12-26 15:47:00
 * @LastEditTime: 2021-05-30 17:34:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/src/views/RollList.vue
-->
<template>
  <div class='home'>
    <div class='bgRoll'></div>
    <header>
      <div class='score'>
        <div class='title'>我的成绩</div>
        <div class='scoreInfo'>未完成全部版块</div>
      </div>
    </header>
    <main>
      <div class='inner'>
        <div class='tip'>“校园之春”党史知识问答 排行榜</div>
        <div class='list' v-if='!IsVoid'>
          <RollItem
            v-for='item in rollList'
            :key='item'
            :order='item.order'
            :nickname='item.nickname'
            :time='item.time'
            :Avatar='item.avatar'
            :score='item.score'
          />
        </div>
        <div class='listVoid' v-if='IsVoid'>
          <p>
            目前还没有人完成全部版块
            排行榜空空如也
          </p>
        </div>
        <div class='back' @click='back()'></div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getRank } from "@/services/api";
import RollItem from "@components/RollItem";
export default {
  components: { RollItem },
  setup() {
    // 板块基本信息修改
    const buttonList = ref([
      { info: "全会 情况" },
      { info: "十三五成就" },
      { info: "远景 目标" },
      { info: "十四五规划" },
      { info: "总排行" },
    ]);
    const title_index = ref(4);
    const router = useRouter();
    const IsVoid = ref(false);
    const rollList = ref([
      // { order: 1, nickname: "卷卷一号", time: "00:10:20", avatar: "" },
    ]);
    const type_index = ref(4);
    const back = () => router.push("/block");
    const fetchRank = async () => {
      const { data } = await getRank();
      // console.log(data, index);
      let temp = [];
      // console.log(data[index].data);
      data.data.forEach((e) => {
        let item = {};
        item.order = e.ranking;
        item.nickname = e.nick_name;
        item.avatar = e.avatar;
        item.score = e.score / 2;
        item.time = e.score / 1000;
        temp.push(item);
      });
      IsVoid.value = temp.length == 0;
      console.log(temp);
      rollList.value = temp;
    };
    const showList = (index) => {
      // console.log(index);
      type_index.value = index;
      if (type_index.value > 4) {
        return;
      }
      // 写的跟屎一样的刷新，回来再改
      title_index.value = index;
      fetchRank(type_index.value);
    };
    // const getMin = ms => {
    //   const minutes = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60));
    //   const seconds = (ms % (1000 * 60)) / 1000;
    //   return `${minutes * 60 + seconds}S`;
    // };
    fetchRank(type_index.value);
    return {
      title_index,
      buttonList,
      rollList,
      RollItem,
      back,
      showList,
      IsVoid,
    };
  },
};
</script>

<style lang="scss" socped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: "SimHei";
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
    justify-content: space-between;
    align-items: center;
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
        margin-top: 80px;
        font-size: 40px;
        font-family: HappyZcool-2016;
        font-weight: bold;
        color: #ee5d2a;
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
    }
  }
  main {
    width: 100%;
    margin-top: 30px;
    .inner {
      margin: 20px auto;
      width: 660px;
      height: 842px;
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
