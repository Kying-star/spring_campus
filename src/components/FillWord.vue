<template>
  <div v-html="showText" class="container"></div>
</template>
<script>
import { computed, ref } from "vue";
export default {
  setup() {
    const question = ref("ab{{cd}}ef{{gha}}ijk{{1}}");
    const reg = /\{\{\w+\}\}/g;
    const keyword = ref("123");
    const answers = computed(() =>
      question.value.match(reg).map(item => item.slice(2, -2))
    );
    const html = computed(() => {
      let strArr = [];
      let str = "";
      let count = 0;
      for (let i = 0; i < answers.value.length; i++) {
        for (let j = 0; j < answers.value[i].length; j++) {
          str += `<span class='placeholder' style=' border-bottom: 1px solid #333;display: inline-block;width:20px;height: 100%;text-align:center;margin:0 5px;'>${keyword
            .value[count] || " "}</span>`;
          count++;
        }
        strArr.push(str);
        str = "";
      }
      return strArr;
    });
    const showText = computed(() => {
      const reg = /\{\{\w+\}\}/;
      let str = question.value;
      for (let i = 0; i < answers.value.length; i++) {
        str = str.replace(reg, html.value[i]);
      }
      return str;
    });
    return {
      question,
      showText
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: flex-end;
}
.button_container {
  width: 100vw;
}
</style>
