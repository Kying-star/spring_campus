<template>
  <div class="fill-blank">
    <Question :index="index" :showText="showText" :isShowWrong="isShowWrong" />
    <div class="edit">
      <div class="tip">请点击选项进行填空</div>
      <div class="answers">
        <div
          class="answer"
          :class="{
            active: item.selected,
            three: answersForSelect.length === 3,
            four: answersForSelect.length === 4
          }"
          v-for="item of answersForSelect"
          :key="item.index"
          @click="select(item.answer, item.index)"
        >
          {{ item.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import Question from "./Question";
export default {
  components: { Question },
  props: {
    question: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    answers: {
      type: Array,
      required: true
    },
    isShowTip: Boolean
  },
  setup(props, ctx) {
    const answersForSelect = computed(() => {
      return props.answers.map((item, index) => ({
        answer: item,
        selected: false,
        index
      }));
    });
    const selectAnswer = ref([]);
    const isShowWrong = ref(false);
    const showText = computed(() => {
      let html = props.question;
      for (let i = 0; i < props.answers.length; i++) {
        html = html.replace(
          /keyword/,
          `<span class="blank ${
            props.isShowTip ? "tip" : ""
          }" style="width:${20 * props.answers[i].length}px">${
            props.isShowTip ? props.answers[i] : selectAnswer.value[i] || ""
          }</span>`
        );
      }
      return html;
    });
    const select = (answer, index) => {
      ctx.emit("onselecting");
      const item = answersForSelect.value[index];
      if (item.selected) {
        item.selected = false;
        const replaceIndex = selectAnswer.value.indexOf(item.answer);
        selectAnswer.value[replaceIndex] = "";
      } else {
        for (let i = 0; i < answersForSelect.value.length; i++) {
          if (!selectAnswer.value[i]) {
            answersForSelect.value[index].selected = true;
            selectAnswer.value[i] = answer;
            return;
          }
        }
      }
    };
    const check = () =>
      selectAnswer.value.every((item, index) => {
        return item === props.answers[index];
      });
    const showWrong = () => {
      isShowWrong.value = true;
      console.log(1);
      setTimeout(() => {
        isShowWrong.value = false;
      }, 2000);
    };
    watch(
      selectAnswer,
      () => {
        if (
          selectAnswer.value.length === props.answers.length &&
          selectAnswer.value.every(item => item !== "")
        ) {
          if (check()) {
            ctx.emit("next");
          } else {
            showWrong();
            selectAnswer.value = selectAnswer.value.map(() => "");
            for (const item of answersForSelect.value) {
              item.selected = false;
            }
          }
        }
      },
      { deep: true }
    );
    return {
      showText,
      select,
      answersForSelect,
      isShowWrong,
      selectAnswer
    };
  }
};
</script>

<style lang="scss" scoped>
.edit {
  margin-top: 55px;
  .tip {
    font-size: 28px;
    font-family: SJbangshu;
    color: #f53012;
    margin-left: 31px;
  }
  .answers {
    margin-top: 21px;
    box-sizing: border-box;
    background-color: #fff;
    width: 683px;
    height: 562px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px #fff475 solid;
    .answer {
      box-sizing: border-box;
      width: 342px;
      height: 101px;
      line-height: 101px;
      text-align: center;
      font-size: 46px;
      font-family: SJbangshu;
      font-weight: 400;
      color: #ffffff;
      background: #ff8033;
      border: 1px solid #a2b2ee;
      border-radius: 20px;
      &.three {
        margin-bottom: 40px;
      }
      &.four {
        margin-bottom: 18px;
      }
      &.active {
        background-color: #ff4e00;
      }
    }
  }
}
</style>
