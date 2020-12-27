<template>
  <div class="game" v-if="!destory">
    <header>
      <div class="time">
        <div class="icon"></div>
        <div class="text">{{ clock.second }}.{{ toDub(clock.ms / 10) }}s</div>
      </div>
      <div class="tip_button" @click="showTip(!isShowTip)"></div>
    </header>
    <main>
      <component
        :is="item"
        v-for="(item, index) of components"
        :key="questions[index].order"
        :index="questions[index].order"
        :question="questions[index].question"
        :answers="questions[index].answer"
        v-show="questions[index].order === showIndex + 1"
        @next="showQuestionTip(true)"
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
    />
  </div>
</template>

<script>
import FillBlank from "@components/FillBlank";
import QuestionTip from "@components/QuestionTip"
import Score from "@components/Score"
import { useRoute } from "vue-router";
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { getAnalysis, getQuestion, getScore, updateScore } from '@/services/api';
import router from '@/router';
export default {
  components: { FillBlank, QuestionTip, Score },
  setup() {
    const route = useRoute();
    const { type } = route.query;
    const destory = ref(false);
    const clock = reactive({
      second: 0,
      ms: 0,
      timer: null
    });
    const score = reactive({
      name: "",
      score: "",
      ranking: "",
      percent: "",
    })
    const isShowTip = ref(false);
    const isShowQuestionTip = ref(false);
    const isShowScore = ref(false);
    const showIndex = ref(0);
    const questions = ref([]);
    const questionTip = ref([]);
    const isComplete = computed(() => showIndex.value === 3);
    const components = computed(() => {
      return questions.value.map(item => {
        if (item.topic_type === "click") return "FillBlank";
        else if (item.topic_type === "number") return "FillNumber";
        else if (item.topic_type === "choice") return "choice";
      });
    });
    const hideScore = to => {
      isShowScore.value = false;
      destory.value = true;
      router.push(to);
    }
    const fetchQuestion = async () => {
      const { data } = await getQuestion(type);
      questions.value = data.data;
    };
    const fetchAnalysis = async () => {
      const { data } = await getAnalysis(type);
      questionTip.value = data.datas;
    };
    const fetchScore = async () => {
      const { data } = await getScore(type);
      score.name = data.name;
      score.score = data.score;
      score.ranking = data.ranking;
      score.percent = data.percent;
    }
    const postScore = async () => {
      await updateScore(type, clock.second * 1000 + clock.ms)
    }
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
      isShowTip.value = status;
    };
    const showQuestionTip = async (status) => {
      isShowQuestionTip.value = status;
      if (status) {
        stop();
      } else {
        if (isComplete.value) {
          isShowQuestionTip.value = false;
          await postScore()
          await fetchScore();
          isShowScore.value = true;
        } else {
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
    })
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
      isComplete
    };
  }
};
</script>

<style lang="scss">
.game {
  width: 100%;
  height: 100vh;
  background-image: url(~@assets/images/game/bg.png);
  background-repeat: no-repeat;
  background-size: cover;
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
  }
  main {
    padding: 46px 35px 0;
  }
}
</style>
