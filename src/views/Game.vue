<template>
  <div class="game" v-if="!destory">
    <header>
      <div class="time">
        <div class="icon"></div>
        <div class="text">{{ clock.second }}.{{ toDub(clock.ms / 10) }}s</div>
      </div>
      <div class="tip_time" v-if="stayTime < 10000">
        {{ Math.ceil((10000 - stayTime) / 1000) }}s
      </div>
      <div v-else class="tip_button" @click="showTip(!isShowTip)"></div>
    </header>
    <main>
      <component
        :is="item"
        v-for="(item, index) of components"
        :key="questions[index].order"
        :index="questions[index].order"
        :question="questions[index].question"
        :answers="questions[index].answer"
        :answerKey="questions[index].right_answer[0].value"
        v-show="questions[index].order === showIndex + 1"
        @next="showQuestionTip(true)"
        :isShowTip="isShowTip"
        @onselecting="showTip(false)"
      />
    </main>
    <QuestionTip
      @close="showQuestionTip(false)"
      v-show="isShowQuestionTip"
      :imgUrl="questionTip[showIndex].url"
      :text="questionTip[showIndex].data"
      :last="isComplete"
    />
    <Score
      v-show="isShowScore"
      :name="score.name"
      :score="score.score"
      :rank="score.ranking"
      :percent="score.percent"
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
import { useRoute } from "vue-router";
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import {
  getAnalysis,
  getQuestion,
  getScore,
  updateScore
} from "@/services/api";
import router from "@/router";
export default {
  components: { FillBlank, QuestionTip, Score, Choice },
  setup() {
    const route = useRoute();
    const { type } = route.query;
    const destory = ref(false);
    const clock = reactive({
      second: 0,
      ms: 0,
      timer: null,
      enter: 0,
      timeStamp: 0
    });
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
      return questions.value.map(item => {
        if (item.topic_type === "click") return "FillBlank";
        else if (item.topic_type === "number") return "FillNumber";
        else if (item.topic_type === "choice") return "Choice";
      });
    });
    const stayTime = computed(() => clock.timeStamp - clock.enter)
    const hideScore = to => {
      isShowScore.value = false;
      destory.value = true;
      router.push(to);
    };
    const fetchQuestion = async () => {
      const { data } = await getQuestion(type);
      questions.value = data;
      console.log(questions.value);
    };
    const fetchAnalysis = async () => {
      const { data } = await getAnalysis(type);
      questionTip.value = data.data;
    };
    const fetchScore = async () => {
      const { data } = await getScore(type, clock.timeStamp);
      score.name = data.name;
      score.score = data.score;
      score.ranking = data.ranking;
      score.percent = data.percent;
    };
    const postScore = async () => {
      await updateScore(type, clock.timeStamp);
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
      clock.timer = setInterval(timer, 10);
    };
    const timer = () => {
      clock.ms += 10;
      clock.timeStamp += 10;
      if (clock.ms >= 1000) {
        clock.ms = 0;
        clock.second++;
      }
    };
    fetchQuestion();
    fetchAnalysis();
    onMounted(() => {
      start();
    });
    onUnmounted(() => {
      console.log("leave");
    });
    return {
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
      stayTime
    };
  }
};
</script>

<style lang="scss">
.game {
  width: 100%;
  min-height: 100vh;
  background-image: url(~@assets/images/game/bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
  header {
    padding-top: 31px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .time {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        width: 38px;
        height: 38px;
        margin-right: 18px;
        background-image: url(~@assets/images/game/clock.png);
        background-repeat: no-repeat;
        background-size: contain;
      }
      .text {
        width: 130px;
        text-align: center;
        font-size: 46px;
        font-family: SJbangshu;
        color: #f85127;
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
      font-size: 40px;
      line-height: 60px;
      text-align: center;
      margin-left: 208px;
      margin-right: 43px;
      font-family: SJbangshu;
      color: #f85127;
    }
  }
  main {
    padding: 46px 35px 0;
  }
}
</style>
