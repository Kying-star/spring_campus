<template>
  <div class="history-card">
    <history-card-header
      @clickModuleIndex="clickModuleIndex"
    ></history-card-header>

    <swipe class="cards" indicator-color="white">
      <swipe-item class="card" v-for="(item, index) in cardImage" :key="index">
        <card
          :title="item.description"
          :imageSrc="item.url"
          :collection-state="item.ok"
        ></card>
        <!-- <card title="alalal" :collection-state="true"></card> -->
      </swipe-item>
    </swipe>
    <footer>
      <div class="btn-bac" @click="back()"></div>
    </footer>
  </div>
</template>

<script>
import { ref } from "vue";
import HistoryCardHeader from "@/components/HistoryCardHeader";
import Card from "@/components/Card";
import { Swipe, SwipeItem } from "vant";
import { useRouter } from "vue-router";
import { getHistoryCardPicList } from "@/services/api";

export default {
  name: "HistoryCard",
  components: {
    HistoryCardHeader,
    Card,
    Swipe,
    SwipeItem
  },
  setup() {
    const cardImage = ref([]);
    const router = useRouter();
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
    const fetchPicList = async type => {
      const { data } = await getHistoryCardPicList(type);
      cardImage.value = data.data;
      console.log(cardImage.value);
    };
    const clickModuleIndex = index => {
      fetchPicList(index + 1);
    };
    const back = () => router.back();
    fetchPicList(1);
    return {
      downloadCanvasImage,
      saveImg,
      clickModuleIndex,
      back,
      cardImage
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
.btn-bac {
  width: 381px;
  height: 178px;
  background: url(~@assets/images/HistoryCard/btn-bac.png);
  background-size: 100%;
  position: absolute;
  bottom: 29px;
  left: 185px;
}
</style>
