<template>
  <a-menu
    mode="inline"
    theme="dark"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :inlineCollapsed="collapsed"
  >
    <a-sub-menu key="sub1">
      <template #title>
        <span><HomeOutlined /><span>首页</span></span>
      </template>
      <a-menu-item key="5" @click="to('statistics')"
        ><FormOutlined />统计</a-menu-item
      >
    </a-sub-menu>

    <a-sub-menu key="sub2">
      <template #title>
        <span><AppstoreOutlined /><span>商品</span></span>
      </template>
      <a-menu-item key="4" @click="to('goodslist')"
        ><BarsOutlined />商品列表</a-menu-item
      >
      <a-menu-item key="3" @click="to('addgoods')"
        ><FormOutlined />添加商品</a-menu-item
      >
    </a-sub-menu>
  </a-menu>
</template>

<script lang="ts">
interface IState {
  openKeys: Ref<string[]>;
  selectedKeys: Ref<string[]>;
  collapsed: Ref<boolean>;
  to: (path: string) => void;
}

import {
  HomeOutlined,
  AppstoreOutlined,
  FormOutlined,
  BarsOutlined,
} from "@ant-design/icons-vue";
import { ref, defineComponent, Ref } from "vue";
import router from "../router";

const openKeys = ref(["sub1"]);
const selectedKeys = ref(["5"]);
const collapsed = ref(true);

export default defineComponent({
  components: {
    HomeOutlined,
    AppstoreOutlined,
    FormOutlined,
    BarsOutlined,
  },
  setup(): IState {
    /**
     * 跳转到某个地址
     */
    const to = (path: string) => {
      router.push(`/${path}`);
    };

    /**
     *页面刷新后 回到第一个选项
     */
    router.push(`/statistics`);
    openKeys.value = ["sub1"];
    selectedKeys.value = ["5"];

    return {
      openKeys,
      selectedKeys,
      collapsed,
      to,
    };
  },
});
</script>

<style>
</style>