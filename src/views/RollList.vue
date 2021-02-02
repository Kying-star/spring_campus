<!--
 * @Author: your name
 * @Date: 2020-12-26 15:47:00
 * @LastEditTime: 2021-02-02 20:28:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/src/views/RollList.vue
-->
<template>
  <div class='home'>
    <div class='bgRoll'></div>
    <header>
      <RollButton
        v-for='(button, index) in buttonList'
        :key='button'
        :info='button.info'
        :index='index'
        @click='showList(index)'
      />
    </header>
    <main>
      <div class='inner'>
        <div class='tip'>{{ titleList[title_index].info }}</div>
        <div class='list'>
          <RollItem
            v-for='item in rollList'
            :key='item'
            :order='item.order'
            :nickname='item.nickname'
            :time='item.time'
            :Avatar='item.avatar'
          />
        </div>
      </div>
    </main>
    <footer>
      <div class='back' @click='back()'></div>
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
      { info: "总排行" },
    ]);
    const title_index = ref(3);
    const titleList = ref([
      { info: "党的十九届五中全会基本情况答题排行榜" },
      { info: "“十三五”时期成就答题排行榜" },
      { info: "2035年远景目标排行榜" },
      { info: "十四五规划答题排行榜" },
      { info: "党的十九届五中全会学习填填乐答题排行榜" },
    ]);
    const router = useRouter();
    const rollList = ref([
      // { order: 1, nickname: "卷卷一号", time: "00:10:20", avatar: "" },
    ]);
    const fix_data = ref([
      {
        avatar:
          "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ9jEUeJNj6LoKch1Vl0P8L7U7gnIBlpRsga7w4snMzzzNkUsUeaCPVsXVGTCE9f9bXJhOKueIXow/132",
        nickname: "问道",
        ranking: 1,
        score: 9222,
      },
      {
        avatar:
          "https://wx.qlogo.cn/mmopen/vi_32/IVVCc8ic4z4jklljYn1CGBUliaiaOibuscEZvQPgFoqrJHDAcxHL2TFqmhZQ87mYEqgtgOLOKEBMmmsHCDHVyNXVaQ/132",
        nickname: "钓大猫的鱼",
        ranking: 2,
        score: 9619,
      },
      {
        avatar:
          "https://wx.qlogo.cn/mmopen/vi_32/9IzMwj4qW0Oape9GIsE1MRlLxKcIUXMVju9kbEicB8fMzrliaJm1mSQ558SqU3qmRcDMlkNPglMjLicibh6fqPjUibA/132",
        nickname: "Cheng",
        ranking: 3,
        score: 10386,
      },
      {
        avatar:
          "https://wx.qlogo.cn/mmopen/vi_32/ClFmz4j5GV29zjw5j1D3NibdjCguBiaewiaOicZTjeXSWfVDvmaWOicyNe97B4vVaXZYFkTd2bjiabKAD2cbNgIwYC5A/132",
        nickname: "Chiang-Dreamboat",
        ranking: 4,
        score: 10772,
      },
      {
        avatar:
          "https://wx.qlogo.cn/mmopen/vi_32/QqQDcmw0yDZ524ibFpSYVRPaTK2nhzCb9n6ibMQwbrpov8DIy4QNEjnxGIdetUELjhBBsnnicsdsH16alicc3Dks1g/132",
        nickname: "唐潮潮",
        ranking: 5,
        score: 10982,
      },
      {
        avatar:
          "https://wx.qlogo.cn/mmopen/vi_32/5KBXHnmaOlK25L4eBqZglfQDCXV7y9VTq0aLtwGKib1ZyEyU7WFwurCEcQCXvloLRzrwxrjaejFVv1ticN94j9dw/132",
        nickname: "湖烟渺`",
        ranking: 6,
        score: 10994,
      },
      {
        avatar:
          "https://wx.qlogo.cn/mmopen/vi_32/3FYfxf3k1DUlaTYewribA6GOL1aRibuAByVppylPZuYe6EwRjf7NDCdTSjQwYibj1nGJcCPzSDfcRse0uAphAlkDg/132",
        nickname: "年年好运",
        ranking: 7,
        score: 11048,
      },
      {
        avatar:
          "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKaDHPt5uk1ysEVyNiaJP3HzD7KM90jIQaiareFf4j3icUvzlcOSic6CKJicM70TWTVGTUACLlEFq9pnUw/132",
        nickname: "fufu",
        ranking: 8,
        score: 11055,
      },
      {
        avatar:
          "https://wx.qlogo.cn/mmopen/vi_32/oZIDYJoZcDw0s6AjEpm15yhcdic503ncFaYtYznSI2feHoyDLlQcUGMuexgibkWCa69boZCecGcBDcoyebRW81mg/132",
        nickname: "Young",
        ranking: 9,
        score: 11404,
      },
      {
        avatar:
          "https://wx.qlogo.cn/mmopen/vi_32/kBHicOia4GJeX7c1xeuIKYleLAKJWfbI7BeVoaj9Bpj7YONVB6AvFnvnWcMCia3tkSNpcARqj6Nhz7YEUD6uEacvw/132",
        nickname: "至味",
        ranking: 10,
        score: 11499,
      },
    ]);
    const type_index = ref(3);
    const back = () => router.push("/block");
    const fetchRank = async (index) => {
      const { data } = await getRank();
      // console.log(data, index);
      let temp = [];
      // console.log(data[index].data);
      if (data[index].data) {
        if (index === 0) {
          fix_data.value.forEach((e) => {
            let item = {};
            item.order = e.ranking;
            item.nickname = e.nickname;
            item.avatar = e.avatar;
            item.time = e.score / 1000;
            temp.push(item);
          });
        } else {
          data[index].data.forEach((e) => {
            let item = {};
            item.order = e.ranking;
            item.nickname = e.nickname;
            item.avatar = e.avatar;
            item.time = e.score / 1000;
            temp.push(item);
          });
        }
      }
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
      titleList,
      rollList,
      back,
      showList,
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
