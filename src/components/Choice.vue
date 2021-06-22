<!--
 * @Author: your name
 * @Date: 2020-12-27 16:02:54
 * @LastEditTime: 2021-06-21 19:36:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/src/components/Choice.vue
-->
<template>
  <div class="fill-blank">
    <Question
      :index="index"
      :showText="showText"
      :isShowWrong="isShowWrong"
      :total="total"
    />
    <div class="edit">
      <div class="answers">
        <div
          :class="getClass(index, item.isCorrect)"
          v-for="(item, index) of answersForSelect"
          :key="item.index"
          @click="isClicked && select(item.isCorrect, index)"
        >
          <div class="innerTxt">
            {{ String.fromCharCode(index + 65) }}.{{ item.answer }}
          </div>
          <div :class="getIconClass(index, item.isCorrect)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
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
    answerKey: {
      type: String,
      required: true
    },
    total: Number,
    isShowTip: Boolean
  },
  setup(props, ctx) {
    const answersForSelect = computed(() => {
      let array = props.answers.map((item, index) => ({
        answer: item.split(".")[1],
        selected: false,
        index,
        isCorrect: item.split(".")[0] == props.answerKey
      }));
      console.log(array);
      // 洗牌算法，随机打乱
      for (let i = 0; i < array.length; i++) {
        let index = Math.ceil(Math.random() * (array.length - i - 1)) + i;
        let tmp = array[i];
        array[i] = array[index];
        array[index] = tmp;
      }
      props.answers.map(index => array[index]);
      return array;
    });
    const isClicked = ref(true);
    const selectAnswer = ref([]);
    const clickIndex = ref(999);
    const isShowWrong = ref(false);
    const isShowCorrect = ref(false);
    const showText = computed(() => {
      let html = props.question;
      for (let i = 0; i < props.answers.length; i++) {
        html = html.replace(/（）/, `（  ）`);
      }
      return html;
    });
    const getIconClass = (index, isCorrect) => {
      if (isShowWrong.value && index == clickIndex.value) {
        return "errorIcon";
      } else if (isShowCorrect.value && isCorrect) {
        return "correctIcon";
      }
    };
    const getClass = (index, isCorrect) => {
      // console.log(props.answerKey +"｜" + item);
      if (isShowCorrect.value && isCorrect) {
        return "answer answerRight";
      } else if (isShowWrong.value && index == clickIndex.value) {
        return "answer answerError";
      }
      return "answer";
    };
    const select = (isCorrect, index) => {
      isClicked.value = false;
      ctx.emit("onselecting");
      // console.log(props.answerKey +"｜" + answer);
      if (isCorrect) {
        console.log("显示正确");
        isShowCorrect.value = true;
      } else {
        console.log("显示错误");
        isShowCorrect.value = true;
        isShowWrong.value = true;
        clickIndex.value = index;
      }
      ctx.emit("next", isCorrect);
    };
    return {
      getIconClass,
      showText,
      select,
      answersForSelect,
      isShowWrong,
      selectAnswer,
      getClass,
      isClicked
    };
  }
};
</script>

<style lang="scss" scoped>
.edit {
  transform: translateY(-90px);
  .tip {
    font-size: 28px;
    font-family: SJbangshu;
    color: #f53012;
    margin-left: 31px;
  }
  .answers {
    box-sizing: border-box;
    width: 683px;
    height: 562px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .errorIcon {
      margin-left: 30px;
      width: 23px;
      height: 23px;
      background-image: url(~@assets/images/game/error-icon.png);
      background-size: cover;
    }
    .correctIcon {
      margin-left: 30px;
      width: 29px;
      height: 19px;
      background-image: url(~@assets/images/game/correct.png);
      background-size: cover;
    }
    .answerRight {
      background-image: url(~@assets/images/game/correct-bk.png) !important;
    }
    .answerError {
      font-size: 30px !important;
      font-family: 华康少女 !important;
      font-weight: 400 !important;
      color: #fffefe !important;
      line-height: 30px !important;
      opacity: 0.8 !important;
      background-image: url(~@assets/images/game/error-bk.png) !important;
    }
    .answer {
      font-size: 30px;
      font-family: 华康少女;
      font-weight: 400;
      color: #fc6d34;
      line-height: 36px;
      box-sizing: border-box;
      width: 660px;
      height: 121px;
      line-height: 40px;
      background-image: url(~@assets/images/game/default-bk.png);
      background-size: cover;
      background-repeat: round;
      border-radius: 20px;
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .innerTxt {
        margin-left: 34px;
        width: 530px;
      }
    }
  }
}
</style>
