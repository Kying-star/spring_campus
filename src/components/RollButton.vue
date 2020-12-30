<!--
 * @Author: your name
 * @Date: 2020-12-26 15:57:08
 * @LastEditTime: 2020-12-30 21:07:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/src/components/RollButton.vue
-->
<template>
  <div :class="getButtonClass()">
    <div
      :class="getClass(isbuttonDown)"
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
    info: String,
    index: Number
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
    const getClass = (show) => {
      if (props.index > 1){
        return show ? `inner gary` : `inner down onclick gary`
      }
      return show ? `inner` : `inner down onclick`
    }
    const getButtonClass = () => props.index > 1? "button graySandow" : "button"
    return {
      isbuttonDown,
      buttonDown,
      txt,
      getClass,
      getButtonClass
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
  .gary {
    background: #6977ff;
  }
  .graySandow {
    background-color: #ee3978;
  }
}

</style>
