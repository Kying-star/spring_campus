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
        <card title="1982年“校园之春”" :collection-state="true"></card>
      </swiper-slide>
    </swiper>
    <footer>
      <div
        class="btn-save"
        @click="
          saveImg(
            'https://play-lh.googleusercontent.com/IPPHiII0GMURiVumaN0zT9iJRj8OTCP65xllc8ptBQNAhYhlv67ZRsGGxcIhRHbM5c45'
          )
        "
      ></div>
      <div class="btn-bac"></div>
    </footer>
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
    const downloadCanvasImage = (imageSrc, name) => {
      const image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function() {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        const url = canvas.toDataURL("image/png");

        // 生成一个a元素
        const a = document.createElement("a");
        // 创建一个单击事件
        const event = new MouseEvent("click");

        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = name || "下载图片名称";
        // 将生成的URL设置为a.href属性
        a.href = url;
        // 触发a的单击事件
        a.dispatchEvent(event);
      };

      image.src = imageSrc;
    };
    const saveImg = Url => {
      const blob = new Blob([""], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = Url;
      a.download = Url.replace(/(.*\/)*([^.]+.*)/gi, "$2").split("?")[0];
      const e = document.createEvent("MouseEvents");
      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
      URL.revokeObjectURL(url);
    };
    return {
      downloadCanvasImage,
      saveImg
    };
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
  position: relative;
}
.cards {
  height: 70vh;
  width: 100vw;
  margin-top: 100px;
  .card {
  }
}
.btn-save {
  width: 358px;
  height: 181px;
  background: url(~@assets/images/HistoryCard/btn-save.png);
  background-size: 100%;
  position: absolute;
  bottom: 25px;
  left: 34px;
}
.btn-bac {
  width: 322px;
  height: 184px;
  background: url(~@assets/images/HistoryCard/btn-bac.png);
  background-size: 100%;
  position: absolute;
  bottom: 27px;
  right: 35px;
}
</style>
