<template>
  <div class="login-wrapper">
    <div class="box">
      <div class="input-box">
        <span>邮箱:</span>
        <a-input
          @change="handleChange($event, 'email')"
          placeholder="请输入邮箱"
        />
      </div>

      <div class="input-box">
        <span>密码:</span>
        <a-input
          type="password"
          @change="handleChange($event, 'password')"
          placeholder="请输入密码"
        />
      </div>

      <div class="input-box">
        <span>用户名:</span>
        <a-input
          placeholder="请输入用户名"
          @change="handleChange($event, 'username')"
        />
      </div>

      <div class="input-box code">
        <span>验证码:</span>
        <a-input
          placeholder="请输入验证码"
          @change="handleChange($event, 'code')"
        />
        <a-button
          type="primary"
          size="small"
          @click="getCode"
          :disabled="isdisabled"
          >{{ value }}</a-button
        >
      </div>

      <div class="br"></div>
      <a-button type="primary" ghost class="btn" @click="handlClick"
        >注册</a-button
      >
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 状态
 */
interface IState {
  email: Ref<string>;
  password: Ref<string>;
  code: Ref<string>;
  username: Ref<string>;
  isdisabled: Ref<boolean>;
  value: Ref<number | string>;
  handlClick: () => void;
  getCode: () => void;
  handleChange: (e: any, type: string) => void;
}
/**
 * 网络请求返回的结果
 */
interface IResulr {
  status: string;
  msg: string;
}

import { ref, defineComponent, Ref } from "vue";
import { message } from "ant-design-vue";
import router from "../router";
import axios from "../Http/index";
import URLS from "../Http/URLS";
import { AxiosResponse } from "axios";
import { setTimer, httpCode } from "../js/login";

const isdisabled: Ref<boolean> = ref(false); // 按钮是否为禁用状态
const value: Ref<number | string> = ref("点击获取验证码"); // 倒计时获取验证码
const email: Ref<string> = ref(""); // 邮箱
const password: Ref<string> = ref(""); // 密码
const code: Ref<string> = ref(""); // 验证码
const username: Ref<string> = ref(""); // 用户名

export default defineComponent({
  setup(): IState {
    /**
     * 点击注册
     */
    const handlClick = async () => {
      if (!email.value || !password.value || !code.value || !username.value) {
        message.info("信息有错误或缺失");
        return;
      }
      const res: AxiosResponse<IResulr> = await axios.post(URLS.Registered, {
        email: email.value,
        password: password.value,
        code: code.value,
        username: username.value,
        // role: "customer",
      });
      if (res.data.status === "success") {
        message.success("注册成功");
        router.push("/login");
      } else {
        message.success(res.data.msg);
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
      } else if (type === "username") {
        username.value = e.target.value;
      }
    };
    /**
     * 点击获取验证码
     *
     */
    const getCode = async () => {
      /**
       * 开始倒计时
       */
      setTimer(isdisabled, value);
      /**
       * 发送请求
       */
      httpCode(email).then((res) => {
        console.log(res);
      });
    };
    return {
      email,
      password,
      code,
      username,
      value,
      isdisabled,
      handlClick,
      getCode,
      handleChange,
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
.br {
  width: 100%;
  border-top: 1px dashed rgba(255, 255, 255, 0.11);
  margin-top: 5px;
  margin-bottom: 15px;
}
.btn {
  margin-left: 141px;
}
.input-box.code input {
  width: 198px;
  margin-right: 15px;
}
</style>