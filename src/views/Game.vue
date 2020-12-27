<template>
  <div class="game">
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
        :answerKey="questions[index].key"
        v-show="questions[index].order === showIndex + 1"
        @next="next"
      />
    </main>
  </div>
</template>

<script>
import FillBlank from "@components/FillBlank";
import Choice from "@components/Choice"
import { useRoute } from "vue-router";
import { getQuestion } from "@api/api.js";
import { computed, onMounted, reactive, ref } from "vue";
export default {
  components: { FillBlank, Choice },
  setup() {
    const route = useRoute();
    const clock = reactive({
      second: 0,
      ms: 0,
      timer: null
    });
    const isShowTip = ref(false);
    const showIndex = ref(0);
    const questions = ref([]);
    const components = computed(() => {
      return questions.value.map(item => {
        if (item.topic_type === "click") return "FillBlank";
        else if (item.topic_type === "number") return "FillNumber";
        else if (item.topic_type === "choice") return "Choice";
      });
    });
    const next = () => {
      showIndex.value++;
    };
    const fetchQuestion = async () => {
      const { type } = route.query;
      const { data } = await getQuestion(type);
      questions.value = data.data;
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
      isShowTip.value = status;
      if (status) {
        stop();
      } else {
        start();
      }
      console.log(+new Date());
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
    onMounted(() => {
      start();
    });
    return {
      questions,
      showIndex,
      components,
      next,
      clock,
      showTip,
      toDub,
      isShowTip
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
