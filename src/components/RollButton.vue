<!--
 * @Author: your name
 * @Date: 2020-12-26 15:57:08
 * @LastEditTime: 2020-12-26 22:52:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/src/components/RollButton.vue
-->
<template>
  <div class="button">
    <div
      :class="isbuttonDown ? `inner` : `inner down onclick`"
      @click="buttonDown()"
    >
      <div class="txt">{{ txt }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    info: String
  },
  setup(props) {
    const isbuttonDown = ref(true);
    const txt = ref(props.info);
    console.log(props);
    const buttonDown = () => {
      isbuttonDown.value = !isbuttonDown.value;
      setTimeout(() => {
        isbuttonDown.value = true;
      }, 400);
    };
    return {
      isbuttonDown,
      buttonDown,
      txt
    };
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: SJbangshu;
  src: url(~@assets/font/SJbangshu.TTF);
}
.button {
  width: 135px;
  height: 92px;
  background: #e76c59;
  border-radius: 15px;
  .inner {
    width: 135px;
    height: 92px;
    background: #f4806e;
    transform: translateY(-10px);
    border: 1px solid #b3eeff;
    border-radius: 15px;
    transition: all 0.4s;
    font-size: 25px;
    font-family: SJbangshu;
    font-weight: 400;
    color: #ffffff;
    line-height: 43px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .txt {
    width: 80px;
    height: 92px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .down {
    transform: translateY(0px);
    transition: all 0.4s;
  }
  .onclick {
    background-color: #ff5136;
  }
}
</style>
