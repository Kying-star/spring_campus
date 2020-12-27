<!--
 * @Author: your name
 * @Date: 2020-12-26 11:57:12
 * @LastEditTime: 2020-12-26 15:04:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/src/components/infoBlock.vue
-->
<template>
  <div class="tip">
    <p>剩余答题</p>
    <p>
      次数为<a>{{ num }}</a>
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    count: Number
  },
  setup(props) {
    console.log(props.count);
    const tip = ref("");
    const num = ref(props.count);
    return {
      tip,
      num
    };
  }
};
</script>

<style lang="scss" scoped>
.tip {
  position: absolute;
  right: 0px;
  width: 93px;
  height: 63px;
  background: #ff5a00;
  border-radius: 0 15px 15px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p,
  a {
    font-family: FZYaZhuTiS;
    font-weight: 400;
    color: #fffffe;
    text-align: center;
  }
  p {
    margin: 0px 0px 0px 0px;
    font-size: 17px;
  }
  a {
    font-size: 30px;
  }
}
</style>
