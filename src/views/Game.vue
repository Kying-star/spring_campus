<template>
  <div class="game">
    <header>
      <div class="time">
        <div class="icon"></div>
        <div class="text">1.32s</div>
      </div>
      <div class="tip_button"></div>
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
        @next="next"
      />
    </main>
  </div>
</template>

<script>
import FillBlank from "@components/FillBlank";
import { useRoute } from "vue-router";
import { getQuestion } from "@api/api.js";
import { computed, ref } from "vue";
export default {
  components: { FillBlank },
  setup() {
    const route = useRoute();
    const showIndex = ref(0);
    const questions = ref([]);
    const components = computed(() => {
      return questions.value.map(item => {
        if (item.topic_type === "click") return "FillBlank";
        else if (item.topic_type === "number") return "FillNumber";
        else if (item.topic_type === "choice") return "choice";
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
    fetchQuestion();
    return {
      questions,
      showIndex,
      components,
      next
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
