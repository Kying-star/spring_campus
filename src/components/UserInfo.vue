<template>
  <div class="user-info mask">
    <div class="toast" v-show="isShowToast">
      <div class="mask"></div>
      <div class="content">
        {{ toast }}
      </div>
    </div>
    <div class="box">
      <div class="title">个人信息完善</div>
      <div class="form">
        <div class="item name">
          <div class="label">姓名：</div>
          <input type="text" class="input" v-model="name" />
        </div>
        <div class="item school">
          <div class="label">学校：</div>
          <div class="select">
            <select v-model="school">
              <option :value="item" v-for="item of schoolList" :key="item">
                {{ item }}
              </option>
            </select>
          </div>
        </div>
        <div class="item phone">
          <div class="label">电话：</div>
          <input type="tel" class="input" @input="inputPhone" v-model="phone" />
        </div>
      </div>
      <div class="tips">完善个人信息有利于最后的活动 领奖通知哦~</div>
      <div class="submit" @click="submit"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { updateUserInfo, getUserInfo } from "@api/api.js";
export default {
  setup(props, ctx) {
    const schoolList = [
      "重庆大学",
      "西南大学",
      "西南政法大学",
      "重庆医科大学",
      "重庆师范大学",
      "重庆邮电大学",
      "重庆交通大学",
      "重庆工商大学",
      "四川外国语大学",
      "四川美术学院",
      "重庆理工大学",
      "重庆三峡学院",
      "重庆文理学院",
      "长江师范学院",
      "重庆科技学院",
      "重庆第二师范学院",
      "重庆警察学院",
      "重庆人文科技学院",
      "重庆工程学院",
      "重庆对外经贸学院",
      "重庆财经学院",
      "重庆工商大学派斯学院",
      "重庆外语外事学院",
      "重庆信息学院",
      "重庆城市科技学院",
      "重庆电力高等专科学校",
      "重庆医药高等专科学校",
      "重庆三峡医药高等专科学校",
      "重庆航天职业技术学院",
      "重庆电子工程职业学院",
      "重庆工业职业技术学院",
      "重庆城市管理职业学院",
      "重庆工程职业技术学院",
      "重庆三峡职业学院",
      "重庆工贸职业技术学院",
      "重庆水利电力职业技术学院",
      "重庆城市职业学院",
      "重庆工商职业学院",
      "重庆青年职业技术学院",
      "重庆财经职业学院",
      "重庆建筑工程职业学院",
      "重庆商务职业学院",
      "重庆化工职业学院",
      "重庆旅游职业学院",
      "重庆安全技术职业学院",
      "重庆传媒职业学院",
      "重庆信息技术职业学院",
      "重庆海联职业技术学院",
      "重庆建筑科技职业学院",
      "原重庆房地产职业学院",
      "重庆机电职业技术大学",
      "重庆应用技术职业学院",
      "重庆科创职业学院",
      "重庆电讯职业学院",
      "重庆能源职业学院",
      "重庆交通职业学院",
      "重庆公共运输职业学院",
      "重庆艺术工程职业学院",
      "重庆轻工职业学院",
      "重庆电信职业学院",
      "重庆经贸职业学院",
      "重庆幼儿师范高等专科学校",
      "重庆文化艺术职业学院",
      "重庆科技职业学院",
      "重庆资源与环境保护职业学院",
      "重庆护理职业学院",
      "重庆理工职业学院",
      "重庆健康职业学院",
      "重庆智能工程职业学院"
    ];
    const nameReg = /^(?:[\u4e00-\u9fa5·]{2,16})$/;
    const phoneReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
    const name = ref("");
    const school = ref("");
    const phone = ref("");
    const toast = ref("");
    const isShowToast = ref(false);
    const inputPhone = () => {
      phone.value = phone.value.replace(/[^0-9]/g, "");
    };
    const showToast = () => {
      isShowToast.value = true;
      setTimeout(() => {
        isShowToast.value = false;
      }, 3000);
    };
    const isComplete = () => {
      //屎一样的判断
      if (!name.value && !school.value && !phone.value) {
        toast.value = "请填写姓名、电话号码，并选择学校";
        return false;
      } else if (!name.value && !school.value) {
        toast.value = "请填写姓名并选择学校";
        return false;
      } else if (!name.value && !phone.value) {
        toast.value = "请填写姓名以及电话号码";
        return false;
      } else if (!school.value && !phone.value) {
        toast.value = "请选择学校并填写电话号码";
        return false;
      } else if (!name.value) {
        toast.value = "请填写姓名";
        return false;
      } else if (!school.value) {
        toast.value = "请选择学校";
        return false;
      } else if (!phone.value) {
        toast.value = "请填写电话号码";
        return false;
      } else {
        if (!nameReg.test(name.value)) {
          toast.value = "请填写正确的姓名";
          return false;
        } else if (!phoneReg.test(phone.value)) {
          toast.value = "请填写正确的电话号码";
          return false;
        } else {
          return true;
        }
      }
    };
    const fetchUserInfo = async () => {
      const { data } = await getUserInfo();
      if (data) {
        name.value = data.name;
        school.value = data.school;
        phone.value = data.phone;
      }
    };
    const submit = () => {
      if (isComplete()) {
        updateUserInfo({
          name: name.value,
          school: school.value,
          phone: phone.value
        });
        ctx.emit("after-submit");
      } else {
        showToast();
      }
    };
    fetchUserInfo();
    return {
      schoolList,
      school,
      phone,
      inputPhone,
      submit,
      toast,
      isShowToast,
      name
    };
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: SJbangshu;
  src: url(~@assets/font/SJbangshu.TTF);
}
.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: SJbangshu;
  .toast {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    .content {
      position: absolute;
      top: 406px;
      left: 185px;
      right: 185px;
      box-sizing: border-box;
      padding: 20px 60px 31px;
      background-image: url(~@assets/images/home/user/toast_bg.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      font-size: 42px;
      color: #ff7562;
      text-align: center;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(61, 45, 43, 0.2);
    }
  }
  .box {
    width: 638px;
    height: 1015px;
    background-color: #fff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .title {
      font-size: 59px;
      font-family: SJbangshu;
      color: #ff4f35;
      margin-top: 73px;
    }
    .form {
      margin-top: 96px;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 56px;
        &:last-child {
          margin-bottom: 0;
        }
        .label {
          font-size: 40px;
          color: #ff8979;
          margin-right: 18px;
        }
        .input {
          box-sizing: border-box;
          width: 448px;
          height: 88px;
          color: #fff;
          padding: 30px 0 30px 20px;
          border: none;
          outline: none;
          background-image: url(~@assets/images/home/user/input_bg.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .select {
          box-sizing: border-box;
          select {
            width: 448px;
            height: 88px;
            background-color: transparent;
            border: none;
            outline: none;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            font-size: 23px;
            color: #fff;
            padding: 30px 0 30px 20px;
            option {
              color: #fff;
              font-size: 23px;
              background-color: #333;
            }
          }
          box-sizing: border-box;
          width: 448px;
          height: 88px;
          color: #fff;
          background-image: url(~@assets/images/home/user/select_bg.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          position: relative;
          &:after {
            content: '';
            width: 41px;
            height: 27px;
            background: url(~@assets/images/home/user/square.png);
            background-repeat: no-repeat;
            background-size: contain;
            position: absolute;
            right: 15px;
            top: 31px;
            pointer-events: none;
          }
        }
      }
      .name {
        .input {
          font-size: 32px;
        }
      }
      .phone {
        .input {
          font-size: 31px;
        }
      }
    }
    .tips {
      width: 452px;
      height: 80px;
      font-size: 30px;
      color: #ffa99d;
      line-height: 51px;
      text-align: center;
      margin-top: 69px;
    }
    .submit {
      width: 243px;
      height: 106px;
      background-image: url(~@assets/images/home/user/button.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-top: 73px;
    }
  }
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(61, 45, 43, 0.5);
}
</style>
