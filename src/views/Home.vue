<template>
  <div class="home">
    <div class="bg"></div>
    <UserInfo v-show="isShowUserInfo" @after-submit="showUserInfo(false)" />
    <header>
      <div class="icon">
        <div class="redrock"></div>
        <div class="school"></div>
      </div>
      <div class="user" @click="showUserInfo(true)"></div>
    </header>
    <main>
      <div class="start" @click="toSelect"></div>
    </main>
    <footer>
      <!-- <p class="ref">©红岩网校工作站</p> -->
    </footer>
    <popup title="个人信息保存成功" v-show="isShowPopup"></popup>
  </div>
</template>

<script>
import UserInfo from "@components/UserInfo";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getUserInfo } from "@/services/api";
import Popup from "@/components/Popup.vue";
export default {
  components: {
    UserInfo,
    Popup
  },
  setup() {
    const isShowUserInfo = ref(false);
    const isShowPopup = ref(false);
    const router = useRouter();
    const showUserInfo = status => {
      isShowUserInfo.value = status;
      if (!status) {
        showPopup(true);
      }
    };
    const fetchUserInfo = async () => {
      const { data } = await getUserInfo();
      console.log(data);
      if (!data.data) isShowUserInfo.value = true;
    };
    const showPopup = status => {
      isShowPopup.value = status;
      console.log("qqqqqqq");
      setTimeout(() => {
        isShowPopup.value = !status;
      }, 2000);
    };

    const toSelect = () => {
      router.push("/block");
    };
    fetchUserInfo();
    return {
      isShowUserInfo,
      isShowPopup,
      showUserInfo,
      showPopup,
      toSelect
    };
  }
};
</script>

<style lang="scss" socped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-image: url(~@assets/images/home/bg.png);
    background-size: cover;
    background-repeat: no-repeat;
  }
  header {
    margin: 35px 35px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      display: flex;
      .school,
      .study,
      .redrock {
        width: 66px;
        height: 66px;
        background-size: contain;
        background-repeat: no-repeat;
        margin-right: 22px;
      }
      .school {
        background-image: url(~@assets/images/home/icon_school.png);
      }
      .study {
        background-image: url(~@assets/images/home/icon_study.png);
      }
      .redrock {
        background-image: url(~@assets/images/home/icon_redrock.png);
      }
    }
    .user {
      width: 84px;
      height: 84px;
      background-image: url(~@assets/images/home/user.png);
      background-size: contain;
      background-repeat: no-repeat;
    }
    .user::before {
      z-index: -1;
      position: relative;
      top: 74px;
      content: "个人信息";
      font-size: 22px;
      font-family: HappyZcool-2016;
      font-weight: 400;
      color: #a1bb16;
      word-break: keep-all;
    }
  }
  main {
    width: 100%;
    .start {
      margin: 710px auto 0 auto;
      width: 577px;
      height: 265px;
      background-image: url(~@assets/images/home/start_button.png);
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  footer {
    width: 100%;
    margin: auto 0 0;
    text-align: center;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #fff0f0;
    line-height: 12px;
    .ref {
      margin-bottom: 34px;
    }
  }
}
</style>
