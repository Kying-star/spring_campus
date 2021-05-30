<template>
  <div class='game' v-if='!destory'>
    <header>
      <div class='time'>
        <div class='icon'>计时</div>
        <div class='text'>{{ format(clock.timeStamp) }}</div>
      </div>
      <!-- <div class='tip_time' v-if='stayTime < 10000'>{{ Math.ceil((10000 - stayTime) / 1000) }}s</div> -->
      <!-- <div v-else class='tip_button' @click='showTip(!isShowTip)'></div> -->
    </header>
    <main>
      <component
        :is='item'
        v-for='(item, index) of components'
        :key='questions[index].order'
        :index='questions[index].order%50'
        :question='questions[index].question'
        :answers='questions[index].answer'
        :answerKey='
          questions[index].topic_type === `click`
            ? ``
            : questions[index].right_answer
        '
        v-show='questions[index].order%50 === showIndex + 1'
        @next='nextQuestion'
        :isShowTip='isShowTip'
        @onselecting='showTip(false)'
        :total='questions.length'
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
      v-show='isShowScore'
      :name='score.name'
      :score='score.score'
      :rank='score.ranking'
      :percent='score.percent'
      @complete='hideScore'
      :type='type'
    />
  </div>
</template>

<script>
import FillBlank from "@components/FillBlank";
import QuestionTip from "@components/QuestionTip";
import Score from "@components/Score";
import Choice from "@components/Choice";
// import FillWord from "@components/FillWord";
import { useRoute } from "vue-router";
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import {
  // getAnalysis,
  getQuestion,
  getScore,
  updateScore,
} from "@/services/api";
import router from "@/router";
export default {
  components: { FillBlank, QuestionTip, Score, Choice },
  setup() {
    const route = useRoute();
    const { type } = route.query;
    const destory = ref(false);
    const clock = reactive({
      timer: null,
      enter: 0,
      timeStamp: 0,
      pre: +new Date(),
    });

    const correctNum = ref(0);
    const score = reactive({
      name: "",
      score: "",
      ranking: "",
      percent: "",
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
    const hideScore = (to) => {
      isShowScore.value = false;
      destory.value = true;
      router.push(to);
    };
    const nextQuestion = async (isCorrect) => {
      console.log(isCorrect);
      isCorrect ? correctNum.value++ : "";
      console.log("正确个数" + correctNum.value);
      if (isComplete.value) {
        await postScore();
        await fetchScore();
      } else {
        setTimeout(() => {
          showIndex.value++;
        }, 500);
      }
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
    const format = (msTime) => {
      let time = msTime / 1000;
      let hour = Math.floor(time / 60 / 60);
      hour = hour.toString().padStart(2, "0");
      let minute = Math.floor(time / 60) % 60;
      minute = minute.toString().padStart(2, "0");
      let second = Math.floor(time) % 60;
      second = second.toString().padStart(2, "0");
      return `${hour}: ${minute}: ${second}`;
    };
    const fetchScore = async () => {
      const { data } = await getScore(type, clock.timeStamp);
      score.name = data.name;
      score.score = data.score;
      score.ranking = data.ranking;
      score.percent = data.percent;
    };
    const postScore = async () => {
      await updateScore(type, correctNum.value, clock.timeStamp);
    };
    const toDub = (n) => {
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
    const showTip = (status) => {
      if (stayTime.value >= 10000) {
        isShowTip.value = status;
      }
    };
    const showQuestionTip = async (status) => {
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
      // clock.ms += interval;
      // if (clock.ms >= 1000) {
      //   clock.ms = 0;
      //   // clock.timeStamp = 0
      //   clock.second++;
      // }
      clock.pre = +new Date();
    };
    fetchQuestion();
    // fetchAnalysis();
    onMounted(() => {
      start();
    });
    onUnmounted(() => {
      console.log("leave");
    });
    return {
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
    };
  },
};
</script>

<style lang="scss">
.game {
  width: 100%;
  min-height: 100vh;
  background-image: url(~@assets/images/base/inner-bk.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
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
    padding: 46px 35px 0;
  }
}
</style>
