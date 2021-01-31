import { message } from "ant-design-vue";
import { AxiosResponse } from "axios";
import { Ref } from "vue";
import axios from "../Http";
import URLS from "../Http/URLS";

/**
 * 网络请求返回的结果
 */
export interface IResulr {
    status: string;
    msg: string;
}
/**
 * 点击验证码按钮，开始倒计时
 * @param disabledRef 获取验证码的按钮是否可用
 * @param valueRef 倒计时的数字
 */
export function setTimer(disabledRef: Ref<boolean>, valueRef: Ref<string | number>) {
    disabledRef.value = true;
    valueRef.value = 60;
    const timer = setInterval(() => {
        if (valueRef.value <= 0) {
            valueRef.value = "点击获取验证码";
            disabledRef.value = false;
            clearInterval(timer);
        }
        if (typeof valueRef.value === "number") {
            valueRef.value--;
        }
    }, 1000);
}

/**
 * 发送验证码的请求
 * @param email 邮箱Ref
 */
export async function httpCode(email: Ref<string>) {
    const res: AxiosResponse<IResulr> = await axios.post(URLS.getCode, {
        email: email.value,
    });
    if (res.data.status === "success") {
        message.success(res.data.msg);
    } else {
        message.error(res.data.msg);
    }
    return res;
}