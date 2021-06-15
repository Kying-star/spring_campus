<template>
  <div class="user-info mask">
    <!--    <div class="toast" v-show="isShowToast">-->
    <!--      <div class="mask"></div>-->
    <!--      <div class="content">{{ toast }}</div>-->
    <!--    </div>-->
    <div class="box">
      <div class="title">个人信息</div>
      <div class="form">
        <div class="item name">
          <div class="errorInfo">{{ errorInfo.name }}</div>
          <div class="label">姓名：</div>
          <input
            type="text"
            class="input"
            v-model="name"
            placeholder="请填写姓名"
          />
          <div class="outline"></div>
        </div>
        <div class="item phone">
          <div class="errorInfo">{{ errorInfo.phone }}</div>
          <div class="label">手机：</div>
          <input
            type="tel"
            class="input"
            @input="inputPhone"
            v-model="phone"
            placeholder="请填写联系电话"
          />
          <div class="outline"></div>
        </div>
        <div class="item school">
          <div class="errorInfo">{{ errorInfo.school }}</div>
          <div class="label">学校：</div>
          <div class="select">
            <!--            {{ school }}-->
            <input
              type="school"
              class="input schoolInput"
              v-model="school"
              placeholder="请选择所属学校"
              @input="searchSchoolFun"
              @focus="selecting = true"
            />
            <ul class="contaniner" v-show="selecting">
              <li
                v-for="item of searchSchoolList"
                :key="item"
                class="option"
                @click="select(item)"
              >
                {{ item }}
              </li>
            </ul>

            <div :class="selecting ? `selectTab` : `unSelectTab`"></div>
          </div>
          <div class="outline"></div>
        </div>
      </div>
      <!--      <div class="tips">完善个人信息有利于最后的活动 领奖通知哦~</div>-->
      <div class="submit" @click="submit"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getSchools, updateUserInfo } from "@/services/api";

getSchools().then(e => {
  console.log(e);
});
console.log();
export default {
  setup(props, ctx) {
    const schoolList = ref([]);
    const searchSchoolList = ref([]);
    const nameReg = /^(?:[\u4e00-\u9fa5·]{2,16})$/;
    const phoneReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
    const errorInfo = ref({
      name: "",
      phone: "",
      school: ""
    });
    const name = ref("");
    const school = ref("");
    const phone = ref("");
    const toast = ref("");
    const selecting = ref(false);
    const isSelect = ref(false);
    const isShowToast = ref(false);
    const select = item => {
      school.value = item;
      isSelect.value = true;
      selecting.value = false;
    };
    const inputPhone = () => {
      phone.value = phone.value.replace(/[^0-9]/g, "");
    };
    const showToast = () => {
      isShowToast.value = true;
      setTimeout(() => {
        isShowToast.value = false;
      }, 1500);
    };
    const isComplete = () => {
      //屎一样的判断
      if (!name.value) {
        errorInfo.value.name = "请填写姓名";
      } else if (!nameReg.test(name.value)) {
        errorInfo.value.name = "请填写正确的姓名";
      } else {
        errorInfo.value.name = "";
      }
      if (!phone.value) {
        errorInfo.value.phone = "请填写手机号码";
      } else if (!phoneReg.test(phone.value)) {
        errorInfo.value.phone = "请填写正确的手机号码";
      } else {
        errorInfo.value.phone = "";
      }
      if (!school.value) {
        errorInfo.value.school = "请选择学院";
      } else {
        errorInfo.value.school = "";
      }
      // if (!name.value && !school.value && !phone.value) {
      //   toast.value = "请填写姓名、手机号码，并选择学校";
      //   return false;
      // } else if (!name.value && !school.value) {
      //   toast.value = "请填写姓名并选择学校";
      //   return false;
      // } else if (!name.value && !phone.value) {
      //   toast.value = "请填写姓名以及手机号码";
      //   return false;
      // } else if (!school.value && !phone.value) {
      //   toast.value = "请选择学校并填写手机号码";
      //   return false;
      // } else if (!name.value) {
      //   toast.value = "请填写姓名";
      //   return false;
      // } else if (!school.value) {
      //   toast.value = "请选择学校";
      //   return false;
      // } else if (!phone.value) {
      //   toast.value = "请填写手机号码";
      //   return false;
      // } else {
      //   if (!nameReg.test(name.value)) {
      //     toast.value = "请填写正确的姓名";
      //     return false;
      //   } else if (!phoneReg.test(phone.value)) {
      //     toast.value = "请填写正确的手机号码";
      //     return false;
      //   } else {
      //     return true;
      //   }
      // }
    };
    // const fetchUserInfo = async () => {
    //   const { data } = await getUserInfo();
    //   name.value = data.name;
    //   school.value = data.school;
    //   phone.value = data.phone;
    // };
    const fetchSchoolInfo = async () => {
      const { data } = await getSchools();
      schoolList.value = data.data;
      searchSchoolList.value = searchSchoolInfo
        .search([...schoolList.value], school.value)
        .map(item => {
          return item.replace(/["("]/g, "").replace(/[")"]/g, "");
        });
      // eslint-disable-next-line vue/no-ref-as-operand
      console.log(searchSchoolList.value);
    };
    const searchSchoolInfo = (() => {
      let escapeRegExp = /[-#$^*()+[\]{}|\\,.?\s]/g;
      let escapeReg = reg => reg.replace(escapeRegExp, "\\$&");
      //groupLeft 与 groupRight是对结果进一步处理所使用的分割符，可以修改
      let groupLeft = "(",
        groupRight = ")";
      let groupReg = new RegExp(escapeReg(groupRight + groupLeft), "g");
      let groupExtractReg = new RegExp(
        "(" + escapeReg(groupLeft) + "[\\s\\S]+?" + escapeReg(groupRight) + ")",
        "g"
      );
      //从str中找到最大的匹配长度
      let findMax = (str, keyword) => {
        let max = 0;
        keyword = groupLeft + keyword + groupRight;
        str.replace(groupExtractReg, m => {
          //keyword完整的出现在str中，则优秀级最高，排前面
          if (keyword === m) {
            max = Number.MAX_SAFE_INTEGER;
          } else if (m.length > max) {
            //找最大长度
            max = m.length;
          }
        });
        return max;
      };
      let keyReg = key => {
        let src = ["(.*?)("];
        let ks = key.split("");
        if (ks.length) {
          while (ks.length) {
            src.push(escapeReg(ks.shift()), ")(.*?)(");
          }
          src.pop();
        }
        src.push(")(.*?)");
        src = src.join("");
        let reg = new RegExp(src, "i");
        let replacer = [];
        let start = key.length;
        let begin = 1;
        while (start > 0) {
          start--;
          replacer.push("$", begin, groupLeft + "$", begin + 1, groupRight);
          begin += 2;
        }
        replacer.push("$", begin);

        return {
          regexp: reg,
          replacement: replacer.join("")
        };
      };

      return {
        search(list, keyword) {
          //生成搜索正则
          let kr = keyReg(keyword);
          let result = [];
          for (let e of list) {
            //如果匹配
            if (kr.regexp.test(e)) {
              //把结果放入result数组中
              result.push(
                e.replace(kr.regexp, kr.replacement).replace(groupReg, "")
              );
            }
          }
          //对搜索结果进行排序
          //1. 匹配关键字大小写一致的优先级最高，比如搜索up, 结果中的[user-page,beginUpdate,update,endUpdate]，update要排在最前面，因为大小写匹配
          //2. 匹配关键字长的排在前面
          result = result.sort(
            (a, b) => findMax(b, keyword) - findMax(a, keyword)
          );
          return result;
        }
      };
    })();
    const searchSchoolFun = e => {
      const searchInfo = searchSchoolInfo
        .search([...schoolList.value], e.target.value)
        .map(item => {
          return item.replace(/["("]/g, "").replace(/[")"]/g, "");
        });
      // console.log(e);
      // console.log(searchInfo);
      if (searchInfo.length > 0) {
        searchSchoolList.value = searchInfo;
      }
    };
    const submit = () => {
      console.log(123);
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
    //fetchUserInfo();
    fetchSchoolInfo();
    return {
      schoolList,
      searchSchoolList,
      school,
      phone,
      inputPhone,
      submit,
      toast,
      errorInfo,
      isShowToast,
      name,
      selecting,
      isSelect,
      select,
      searchSchoolFun
    };
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  //font-family: SJbangshu;
  overflow: hidden;
  font-family: HappyZcool-2016, serif;
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
    width: 550px;
    height: 1126px;
    padding: 0 50px;
    background-image: url(~@assets/images/home/popup-bk.png);
    background-size: 100%;
    background-repeat: no-repeat;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-weight: 600;
    font-family: HappyZcool-2016, serif;
    .title {
      font-size: 48px;
      //font-family: SJbangshu;
      color: #ff4f35;
      margin-top: 173px;
    }
    .form {
      margin-top: 76px;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 56px;
        position: relative;
        &:last-child {
          margin-bottom: 0;
        }
        .errorInfo {
          position: absolute;
          top: 80px;
          left: 180px;
          color: #fc8449;
          font-size: 28px;
        }
        .label {
          font-size: 38px;
          color: #f06a39;
          //margin-right: 18px;
          margin-left: 40px;
        }
        .input {
          box-sizing: border-box;
          width: 380px;
          height: 88px;
          color: #ffc171;
          padding: 30px 0 30px 20px;
          border: none;
          outline: none;
          //background-image: url(~@assets/images/home/user/input_bg.png);
          background-color: rgba(0, 0, 0, 0);
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .schoolInput {
          margin-left: -20px;
          margin-top: -40px;
          width: 320px;
        }
        .select {
          box-sizing: border-box;
          font-size: 32px;
          font-weight: 500;
          color: #ffc171;
          padding: 30px 0 30px 25px;
          position: relative;
          border-radius: 20px;
          box-sizing: border-box;
          width: 380px;
          height: 88px;
          //background-image: url(~@assets/images/home/user/select_bg.png);
          //border: black solid 1px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          position: relative;
          .contaniner {
            position: absolute;
            left: 0;
            top: 88px;
            list-style: none;
            width: 100%;
            background-color: #fffbf6;
            border-radius: 20px;
            z-index: 0;
            height: 450px;
            overflow: auto;
            padding-bottom: 10px;
          }
          .option {
            color: #ffc171;
            width: 100%;
            font-size: 23px;
            margin: 20px 20px 0;
            padding: 10px 0 10px 5px;
            border-radius: 20px;
            &:hover,
            &:active {
              background-color: #ff533b;
            }
          }
          .arrow {
          }
          .left {
            background: url(~@assets/images/home/user/left-arrow.png);
          }
          .bottom-arrow {
          }
          //&:after {
          //  content: "";
          //  width: 41px;
          //  height: 27px;
          //  background: url(~@assets/images/home/user/square.png);
          //  background-repeat: no-repeat;
          //  background-size: contain;
          //  position: absolute;
          //  right: 15px;
          //  top: 31px;
          //  pointer-events: none;
          //}
        }
        .outline {
          position: absolute;
          top: 75px;
          left: 170px;
          width: 304px;
          height: 3px;
          background: url("~@assets/images/home/user/bottom-line.png");
          background-size: 100%;
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
      .school {
        .select {
          position: relative;
          .selectTab {
            width: 14px;
            height: 17px;
            position: absolute;
            top: 40px;
            left: 300px;
            background: url("~@assets/images/home/user/left-arrow.png");
            background-size: 100%;
            background-repeat: no-repeat;
            transform: rotate(-90deg);
            transition: all 0.5s;
          }
          .unSelectTab {
            width: 14px;
            height: 17px;
            position: absolute;
            top: 40px;
            left: 300px;
            background: url("~@assets/images/home/user/left-arrow.png");
            background-size: 100%;
            background-repeat: no-repeat;
            transition: all 0.5s;
          }
        }
      }
      ::-webkit-input-placeholder {
        color: #ffc171;
      }
      :-moz-placeholder {
        /* Firefox 18- */
        color: #ffc171;
      }
      ::-moz-placeholder {
        /* Firefox 19+ */
        color: #ffc171;
      }
      :-ms-input-placeholder {
        color: #ffc171;
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
      width: 346px;
      height: 145px;
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
