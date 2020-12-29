<!--
 * @Author: your name
 * @Date: 2020-12-27 16:02:54
 * @LastEditTime: 2020-12-29 19:10:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/src/components/Choice.vue
-->
<template>
  <div class="fill-blank">
    <Question :index="index" :showText="showText" :isShowWrong="isShowWrong" />
    <div class="edit">
      <div class="tip">选择正确选项</div>
      <div class="answers">
        <div
          :class="getClass(item.answer)"
          v-for="(item,index) of answersForSelect"
          :key="item.index"
          @click="select(index)"
        >
          {{ item.answer }}
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
        html = html.replace(/keyword/, `__________________`);
      }
      return html;
    });
    const getClass = item => {
      // console.log(props.answerKey +"｜" + item);
      if (props.answerKey === item && props.isShowTip) {
        return "answer answerRight";
      }
      return "answer";
    };
    const select = answer => {
      ctx.emit("onselecting");
      // console.log(props.answerKey +"｜" + answer);
      if (props.answerKey === answer) {
        ctx.emit("next");
      } else {
        showWrong();
      }
    };
    const showWrong = () => {
      isShowWrong.value = true;
      console.log(1);
      setTimeout(() => {
        isShowWrong.value = false;
      }, 2000);
    };
    return {
      showText,
      select,
      answersForSelect,
      isShowWrong,
      selectAnswer,
      getClass
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
    box-sizing: border-box;
    width: 683px;
    height: 562px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px #fff475 solid;
    .answerRight {
      border: #f53012 2px solid;
    }
    .answer {
      box-sizing: border-box;
      width: 683px;
      height: 131px;
      margin: 5px;
      line-height: 131px;
      text-align: center;
      font-size: 33px;
      font-family: SJbangshu;
      font-weight: 400;
      color: #ff8e66;
      background: #ffffff;
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
