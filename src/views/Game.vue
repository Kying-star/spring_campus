<template>
  <div class="game" v-if="!destory">
    <div class="activity-rule mask" v-if="isShowPhotoPopup">
      <div class="box">
        <div class="title">
          <p>恭喜你 获得了一张校史卡片！</p>
        </div>
        <div class="inner">
          <img :src="nowPopImage" alt />
          <div class="hr"></div>
          <div class="inner-txt">{{ nowPopInfo }}</div>
          <div class="inner-footer">
            <div class="left-txt">©重庆邮电大学档案馆</div>
            <dir class="right-icon"></dir>
          </div>
        </div>
        <div class="box-footer">长按卡片即可保存到相册</div>
      </div>
      <div class="btn" v-if="isOk" @click="close"></div>
      <div class="get-btn" v-if="!isOk" @click="gotoScore"></div>
    </div>
    <header>
      <div class="time">
        <div class="icon">计时</div>
        <div class="text">{{ format(clock.timeStamp) }}</div>
      </div>
      <!-- <div class='tip_time' v-if='stayTime < 10000'>{{ Math.ceil((10000 - stayTime) / 1000) }}s</div> -->
      <!-- <div v-else class='tip_button' @click='showTip(!isShowTip)'></div> -->
    </header>
    <main>
      <component
        :is="item"
        v-for="(item, index) of components"
        :key="questions[index].order"
        :index="questions[index].order - (type - 1) * 50"
        :question="questions[index].question"
        :answers="questions[index].answer"
        :answerKey="
          questions[index].topic_type === `click`
            ? ``
            : questions[index].right_answer
        "
        v-show="questions[index].order - (type - 1) * 50 === showIndex + 1"
        @next="nextQuestion"
        :isShowTip="isShowTip"
        @onselecting="showTip(false)"
        :total="questions.length"
      />
    </main>
    <!-- <QuestionTip
      @close='showQuestionTip(false)'
      v-show='isShowQuestionTip'
      :imgUrl='questionTip[showIndex].url'
      :text='questionTip[showIndex].data'
      :last='isComplete'
    />-->
    <Score
      v-show="isShowScore"
      :name="txt[type - 1]"
      :score="correctNum"
      :rank="ranking"
      :percent="score.percent"
      :time="clock.timeStamp"
      @complete="hideScore"
      :type="type"
    />
  </div>
</template>

<script>
import FillBlank from "@components/FillBlank";
import QuestionTip from "@components/QuestionTip";
import Score from "@components/Score";
import Choice from "@components/Choice";
import photoPopup from "@components/photoPopup";
// import FillWord from "@components/FillWord";
import { useRoute } from "vue-router";
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import {
  // getAnalysis,
  getQuestion,
  getScore,
  updateScore,
  getCardPic,
  updateProgress,
  getUserRank,
  getProgress
} from "@/services/api";
import router from "@/router";
export default {
  components: { FillBlank, QuestionTip, Score, Choice, photoPopup },
  setup() {
    const route = useRoute();
    const { type } = route.query;
    const destory = ref(false);
    const clock = reactive({
      timer: null,
      enter: 0,
      timeStamp: 0,
      pre: +new Date()
    });
    const txt = [
      "新民主主义革命史",
      "社会主义革命建设史",
      "改革开放与社会主义现代化建设史",
      "新时代中国特色社会主义史"
    ];
    const isSubmit = ref(false);
    const isShowPhotoPopup = ref(false);
    const showPhotoPopup = state => {
      isShowPhotoPopup.value = state;
    };
    const nowPopImage = ref("");
    const nowPopInfo = ref("");
    const close = () => {
      console.log(1);
      showPhotoPopup(false);
      start();
    };
    const correctNum = ref(0);
    const score = reactive({
      name: "",
      score: "",
      ranking: "",
      percent: ""
    });
    const isShowTip = ref(false);
    const isShowQuestionTip = ref(false);
    const isShowScore = ref(false);
    const showIndex = ref(0);
    const questions = ref([]);
    const questionTip = ref([]);
    const isComplete = computed(
      () => showIndex.value === questions.value.length - 1
    );
    const components = computed(() => {
      return questions.value.map(() => {
        return "Choice";
      });
    });
    const stayTime = computed(() => clock.timeStamp - clock.enter);
    const hideScore = to => {
      isShowScore.value = false;
      destory.value = true;
      router.push(to);
    };
    const isOk = ref(true);
    const nextQuestion = async isCorrect => {
      //console.log(isCorrect);
      isCorrect ? correctNum.value++ : "";
      //console.log("正确个数" + correctNum.value);
      //console.log(clock.timeStamp);
      console.log(showIndex.value);
      if (showIndex.value >= 49) {
        stop();
        isOk.value = false;
        showPhotoPopup(true);
        await postScore();
        await getRank();
        await fetchScore();
      } else {
        setTimeout(async () => {
          showIndex.value++;
          console.log("offset" + (parseInt(showIndex.value / 5) + type - 1));
          if (showIndex.value % 5 == 0) {
            let offset = parseInt(showIndex.value / 5);
            offset = offset + parseInt(type) - 1;
            const { data } = await getCardPic(offset);
            nowPopImage.value = data.data.url;
            nowPopInfo.value = data.data.description;
            console.log(nowPopImage.value);
            console.log(nowPopInfo.value);
            stop();
            showPhotoPopup(true);
          }
        }, 500);
      }
    };
    const getRank = async () => {
      const { data } = await getUserRank(type);
      ranking.value = data.data.ranking;
    };
    const fetchQuestion = async () => {
      const { data } = await getQuestion(type);
      console.log(data);
      questions.value = data.data;
    };
    // const fetchAnalysis = async () => {
    //   const { data } = await getAnalysis(type);
    //   questionTip.value = data.data;
    // };
    const format = msTime => {
      let time = msTime / 1000;
      let hour = Math.floor(time / 60 / 60);
      hour = hour.toString().padStart(2, "0");
      let minute = Math.floor(time / 60) % 60;
      minute = minute.toString().padStart(2, "0");
      let second = Math.floor(time) % 60;
      second = second.toString().padStart(2, "0");
      return `${hour}: ${minute}: ${second}`;
    };
    const ranking = ref(0);
    const fetchScore = async () => {
      const { data } = await getScore(type, clock.timeStamp);
      score.name = data.name;
      score.score = data.score;
      score.ranking = data.ranking;
      score.percent = data.percent;
    };
    const postScore = async () => {
      isSubmit.value = true;
      await updateScore(parseInt(type), correctNum.value, clock.timeStamp);
    };
    const postProgress = async () => {
      await updateProgress(
        parseInt(type),
        correctNum.value,
        clock.timeStamp,
        showIndex.value
      );
    };
    const toDub = n => {
      //补0操作
      if (n < 10) {
        return "0" + n;
      } else {
        return "" + n;
      }
    };
    const stop = () => {
      clearInterval(clock.timer);
    };
    const showTip = status => {
      if (stayTime.value >= 10000) {
        isShowTip.value = status;
      }
    };
    const showQuestionTip = async status => {
      isShowQuestionTip.value = status;
      if (status) {
        stop();
      } else {
        if (isComplete.value) {
          isShowQuestionTip.value = false;
          await postScore();
          await fetchScore();
          isShowScore.value = true;
        } else {
          clock.enter = clock.timeStamp;
          start();
          showIndex.value++;
        }
      }
    };
    const start = () => {
      clock.pre = +new Date();
      clock.timer = setInterval(timer, 1000 / 60);
    };
    const timer = () => {
      const interval = +new Date() - clock.pre;
      clock.timeStamp += interval;
      clock.pre = +new Date();
    };
    const gotoScore = () => {
      showPhotoPopup(false);
      isShowScore.value = true;
    };
    const getNowProgress = async () => {
      const { data } = await getProgress(type);
      console.log(data.data);
      if (data.data != null) {
        clock.timeStamp = data.data.spend_time;
        correctNum.value = data.data.score;
        showIndex.value = data.data.id;
        console.log(data.spend_time);
        console.log(data.score);
        console.log(data.id);
      }
    };
    getNowProgress();
    fetchQuestion();
    // fetchAnalysis();
    onMounted(() => {
      start();
    });
    onUnmounted(() => {
      if (!isSubmit.value) {
        postProgress();
      }
    });
    return {
      isOk,
      nextQuestion,
      questions,
      showIndex,
      components,
      clock,
      showTip,
      toDub,
      isShowTip,
      showQuestionTip,
      isShowQuestionTip,
      isShowScore,
      questionTip,
      score,
      hideScore,
      destory,
      isComplete,
      type,
      stayTime,
      format,
      photoPopup,
      isShowPhotoPopup,
      showPhotoPopup,
      close,
      nowPopImage,
      nowPopInfo,
      gotoScore,
      txt,
      ranking,
      correctNum
    };
  }
};
</script>

<style lang="scss">
.game {
  width: 100vw;
  height: 100vh;
  background-image: url(~@assets/images/base/inner-bk.png);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  header {
    padding-top: 31px;
    display: flex;
    justify-content: center;
    align-items: center;
    .time {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 448px;
      height: 99px;
      background-image: url(~@assets/images/game/clock-bk.png);
      background-size: cover;
      .icon {
        text-align: center;
        width: 150px;
        height: 99px;
        margin-right: 18px;
        font-size: 38px;
        font-family: HappyZcool-2016;
        font-weight: 400;
        color: #fc9456;
        line-height: 99px;
      }
      .text {
        text-align: center;
        width: 300px;
        height: 99px;
        font-size: 38px;
        font-family: HappyZcool-2016;
        font-weight: 400;
        color: #fc9456;
        line-height: 99px;
      }
    }
    .tip_button {
      width: 57px;
      height: 60px;
      background-image: url(~@assets/images/game/tips.png);
      background-repeat: no-repeat;
      background-size: contain;
      margin-left: 208px;
      margin-right: 43px;
    }
    .tip_time {
      width: 57px;
      height: 60px;
      font-size: 35px;
      line-height: 60px;
      text-align: center;
      margin-left: 208px;
      margin-right: 43px;
      font-family: SJbangshu;
      color: #6977ff;
    }
  }
  main {
    padding: 36px 35px 0;
  }
}
.activity-rule {
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  .box {
    margin-top: 51px;
    box-sizing: border-box;
    width: 628px;
    height: 919px;
    background-image: url(~@assets/images/game/card_bk.png);
    background-size: cover;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .rules {
      width: 502px;
      height: 587px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    .title {
      height: 190px;
      width: 628px;
      p {
        margin: 69px 0 0 63px;
        width: 312px;
        height: 66px;
        font-size: 34px;
        font-family: HappyZcool-2016;
        font-weight: 400;
        color: #ffffff;
        line-height: 36px;
        word-break: keep-all;
      }
    }
    .inner {
      width: 522px;
      height: 644px;
      background-color: #fffbf1;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 23px;
      img {
        margin-top: 37px;
        width: 468px;
        height: 334px;
        background: #fcddbc;
        border-radius: 4px;
      }
      .hr {
        margin-top: 18px;
        width: 468px;
        height: 4px;
        background-color: #e0e958;
      }
      .inner-txt {
        margin-top: 33px;
        width: 432px;
        height: 97px;
        font-size: 28px;
        font-family: 华康少女;
        font-weight: 400;
        color: #ee742a;
        line-height: 36px;
      }
      .inner-footer {
        width: 468px;
        height: 102px;
        display: flex;
        justify-content: space-between;
        .left-txt {
          margin-top: 74px;
          width: 218px;
          height: 20px;
          font-size: 22px;
          font-family: 华康少女;
          font-weight: 400;
          color: #f7b054;
          word-break: keep-all;
        }
        .right-icon {
          margin: 0;
          padding: 0;
          width: 102px;
          height: 102px;
          background: url(~@assets/images/game/cy-icon.png);
          background-size: cover;
        }
      }
    }
    .box-footer {
      text-align: right;
      margin-top: 15px;
      width: 522px;
      height: 23px;
      font-size: 26px;
      font-family: 华康少女;
      font-weight: 400;
      color: #fffdfa;
      word-break: keep-all;
    }
    .rule {
      width: 502px;
      margin: 10px auto;
      font-size: 24px;
      font-family: FZYaZhuTiS;
      font-weight: bold;
      line-height: 34px;
      margin-bottom: 45px;
      text-align: justify;
      font-size: 28px;
      font-family: 华康少女;
      font-weight: 400;
      color: #ff753f;
      line-height: 35px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .btn {
    margin: -20px auto;
    width: 398px;
    height: 178px;
    background: url(~@assets/images/game/next-btn.png);
    background-size: cover;
  }
  .get-btn {
    margin: -20px auto;
    width: 398px;
    height: 178px;
    background: url(~@assets/images/game/look-score.png);
    background-size: cover;
  }
  .close {
    width: 426px;
    height: 216px;
    margin: 20px auto;
    background: url(~@assets/images/button.png);
    background-repeat: no-repeat;
    background-size: contain;
    font-size: 44px;
    font-family: HappyZcool-2016;
    font-weight: 400;
    color: #f4ffb1;
    text-align: center;
    line-height: 216px;
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
