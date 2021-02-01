<template>
  <div class="login-wrapper">
    <div class="box">
      <div class="input-box">
        <span>账号:</span>
        <a-input
          placeholder="请输入邮箱账号"
          @input="handleChange($event, 'email')"
        />
      </div>

      <div class="input-box">
        <span>密码:</span>
        <a-input
          type="password"
          placeholder="请输入密码"
          :value="password"
          @input="handleChange($event, 'password')"
        />
      </div>

      <div class="input-box code" v-if="type === 'retrieve'">
        <span>验证码:</span>
        <a-input
          placeholder="请输入验证码"
          @input="handleChange($event, 'code')"
        />
        <a-button
          type="primary"
          size="small"
          @click="getCode"
          :disabled="isdisabled"
          >{{ timerValue }}</a-button
        >
      </div>

      <div class="forgetPwd" @click="forgetPwd">忘记密码</div>
      <div class="br"></div>
      <a-button type="primary" class="loginBtn" @click="ok">{{
        type === "retrieve" ? "确定" : "登录"
      }}</a-button>
      <a-button type="primary" ghost @click="to">注册</a-button>
    </div>
  </div>
</template>

<script lang="ts">
interface IState {
  email: Ref<string>;
  password: Ref<string>;
  code: Ref<string>;
  timerValue: Ref<string | number>;
  isdisabled: Ref<boolean>;
  type: Ref<"login" | "retrieve">; // 只有两个状态 登录 和 忘记密码
  to: () => void;
  handleChange: (e: any, type: string) => void;
  getCode: () => void;
  forgetPwd: () => void;
  ok: () => void;
}
import { ref, defineComponent, Ref } from "vue";
import router from "../router";
import { setTimer, httpCode } from "../js/login";
import { message } from "ant-design-vue";
import axios from "../Http/index";
import URLS from "../Http/URLS";
import { IResulr } from "../js/login";
import { AxiosResponse } from "axios";
import { useStore } from "vuex";

const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
const code: Ref<string> = ref("");
const timerValue: Ref<string | number> = ref("点击获取验证码");
const isdisabled: Ref<boolean> = ref(false);
const type: Ref<"login" | "retrieve"> = ref("login");

export default defineComponent({
  setup(): IState {
    const store = useStore();
    /**
     * 点击注册按钮
     */
    const to = () => {
      router.push("/Registered");
    };

    /**
     * 获取验证码
     */
    const getCode = () => {
      setTimer(isdisabled, timerValue);
      httpCode(email);
    };

    /**
     * 忘记密码的函数
     */
    const forgetPwd = () => {
      type.value = "retrieve";
      message.info("请填写新的密码，账号不变");
    };

    const ok = async () => {
      /**
       * 修改密码
       */
      if (type.value === "retrieve") {
        const res: AxiosResponse<IResulr> = await axios.post(URLS.findBack, {
          email: email.value,
          password: password.value,
          code: code.value,
        });
        if (res.data.status === "success") {
          message.success("修改成功，请重新登录");
          type.value = "login";
          code.value = "";
          password.value = "";
        } else {
          message.success("信息不全");
        }
      } else {
        /**
         * 直接登录
         */
        const res: AxiosResponse<IResulr> = await axios.post(URLS.login, {
          email: email.value,
          password: password.value,
        });
        if (res.data.status === "success") {
          message.success(res.data.msg);
          // 登录成功跳转 保存信息到vuex
          store.commit("setUser", email.value);
          router.push('/')
          password.value = '';
        } else {
          message.success(res.data.msg);
        }
      }
    };

    /**
     * 赋值
     */
    const handleChange = (e: any, type: string) => {
      if (type === "email") {
        email.value = e.target.value;
      } else if (type === "password") {
        password.value = e.target.value;
      } else if (type === "code") {
        code.value = e.target.value;
      }
    };

    return {
      email,
      password,
      code,
      timerValue,
      isdisabled,
      type,
      to,
      handleChange,
      getCode,
      forgetPwd,
      ok,
    };
  },
});
</script>

<style scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgb(82, 82, 82);
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.342);
  border-radius: 10px;
  padding: 15px;
  padding-top: 30px;
}
.input-box {
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.input-box span {
  display: inline-block;
  width: 50px;
  color: #fff;
}
.input-box input {
  width: 300px;
}
.forgetPwd {
  color: rgb(208, 245, 205);
  font-size: 12px;
  text-align: right;
  padding-right: 19px;
  cursor: pointer;
}
.loginBtn {
  margin-left: 51px;
  margin-right: 171px;
}
.br {
  width: 100%;
  border-top: 1px dashed rgba(255, 255, 255, 0.11);
  margin-top: 5px;
  margin-bottom: 15px;
}
.input-box.code input {
  width: 198px;
  margin-right: 15px;
}
</style>