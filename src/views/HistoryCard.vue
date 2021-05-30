<template>
  <div class="history-card">
    <history-card-header></history-card-header>
  </div>
</template>

<script>
// import { ref } from "vue";
import HistoryCardHeader from "@/components/HistoryCardHeader";

export default {
  name: "HistoryCard",
  components: { HistoryCardHeader },
  setup () {
    return {

    }
  }
};
</script>

<style lang="scss" scoped>
.history-card {
  height: 100vh;
  background: url(~@assets/images/base/inner-bk.png);
  background-size: 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
}
</style>
