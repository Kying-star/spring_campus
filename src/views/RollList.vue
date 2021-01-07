<!--
 * @Author: your name
 * @Date: 2020-12-26 15:47:00
 * @LastEditTime: 2021-01-07 11:55:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/src/views/RollList.vue
-->
<template>
  <div class="home">
    <div class="bgRoll"></div>
    <header>
      <RollButton
        v-for="(button, index) in buttonList"
        :key="button"
        :info="button.info"
        :index="index"
        @click="showList(index - 1)"
      />
    </header>
    <main>
      <div class="inner">
        <div class="tip">党的十九届五中{{ titleList[0] }}答题排行榜</div>
        <div class="list">
          <RollItem
            v-for="item in rollList"
            :key="item"
            :order="item.order"
            :nickname="item.nickname"
            :time="item.time"
            :Avatar="item.avatar"
          />
        </div>
      </div>
    </main>
    <footer>
      <div class="back" @click="back()"></div>
    </footer>
  </div>
</template>

<script>
import { ref } from "vue";
import RollButton from "@components/RollButton";
import RollItem from "@components/RollItem";
import { useRouter } from "vue-router";
import { getRank } from "@/services/api";
export default {
  components: { RollButton, RollItem },
  setup() {
    // 板块基本信息修改
    const buttonList = ref([
      { info: "全会 情况" },
      { info: "十三五成就" },
      { info: "远景 目标" },
      { info: "十四五规划" },
      { info: "总排行" }
    ]);
    const titleList = ref([
      { info: "全会基本情况" },
      { info: "十三五成就" },
      { info: "远景目标" },
      { info: "十四五规划" },
      { info: "总排行" }
    ]);
    const router = useRouter();
    const rollList = ref([
      // { order: 1, nickname: "卷卷一号", time: "00:10:20", avatar: "" },
      // { order: 2, nickname: "卷卷一号", time: "00:10:20", avatar: "" },
      // { order: 3, nickname: "卷卷一号", time: "00:10:20", avatar: "" },
      // { order: 4, nickname: "卷卷一号", time: "00:10:20", avatar: "" },
      // { order: 5, nickname: "卷卷一号", time: "00:10:20", avatar: "" },
      // { order: 6, nickname: "卷卷一号", time: "00:10:20", avatar: "" },
      // { order: 7, nickname: "卷卷一号", time: "00:10:20", avatar: "" },
      // { order: 8, nickname: "卷卷一号", time: "00:10:20", avatar: "" },
      // { order: 9, nickname: "卷卷一号", time: "00:10:20", avatar: "" },
      // { order: 10, nickname: "卷卷一号", time: "00:10:20", avatar: "" }
    ]);
    const type_index = ref(0);
    const back = () => router.push("/block");
    const fetchRank = async index => {
      const { data } = await getRank();
      // console.log(data, index);
      let temp = [];
      // console.log(data[index].data);
      if (data[index].data) {
        data[index].data.forEach(e => {
          let item = {};
          item.order = e.ranking;
          item.nickname = e.nickname;
          item.avatar = e.avatar;
          item.time = e.score / 1000;
          temp.push(item);
        });
      }
      rollList.value = temp;
    };
    const showList = index => {
      // console.log(index);
      type_index.value = index === -1 ? 0 : index;
      if (type_index.value > 0) {
        return;
      }
      // 写的跟屎一样的刷新，回来再改
      fetchRank(type_index.value);
    };
    // const getMin = ms => {
    //   const minutes = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60));
    //   const seconds = (ms % (1000 * 60)) / 1000;
    //   return `${minutes * 60 + seconds}S`;
    // };
    fetchRank(type_index.value);
    return {
      buttonList,
      titleList,
      rollList,
      back,
      showList
    };
  }
};
</script>

<style lang="scss" socped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  .bgRoll {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-image: url(~@assets/images/game/bg.png);
    background-size: cover;
    background-repeat: no-repeat;
  }
  header {
    margin: 49px 20px 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  main {
    width: 100%;
    margin-top: 30px;
    .inner {
      margin: 20px auto;
      width: 683px;
      height: 877px;
      background-color: #ffffff;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .tip {
        width: 683px;
        margin-top: 58px;
        margin-bottom: 48px;
        font-size: 35px;
        font-family: SJbangshu;
        font-weight: 400;
        color: #fe4d4d;
        line-height: 45px;
        text-align: center;
      }
      .list {
        width: 623px;
        height: 660px;
        overflow-y: scroll;
        overflow-x: hidden;
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
    .back {
      margin: 0 auto 32px auto;
      width: 249px;
      height: 109px;
      background-image: url(~@assets/images/BlockSelect/button.png);
      background-size: contain;
      background-repeat: no-repeat;
    }
    .ref {
      margin-bottom: 16px;
    }
  }
}
</style>
