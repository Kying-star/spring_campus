<template>
  <div class="history-card">
    <history-card-header></history-card-header>
    <swiper
      class="cards"
      :slides-per-view="1"
      :space-between="50"
      loop="true"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide class="card">
        <card></card>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// import { ref } from "vue";
import HistoryCardHeader from "@/components/HistoryCardHeader";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import Card from "@/components/Card";

export default {
  name: "HistoryCard",
  components: {
    Card,
    HistoryCardHeader,
    Swiper,
    SwiperSlide
  },
  setup() {
    return {};
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
.cards {
  height: 70vh;
  width: 100vw;
  margin-top: 100px;
  .card {
    height: 300px;
    width: 100vw;
  }
}
</style>
