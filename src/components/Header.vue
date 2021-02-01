<template>
  <div class="herder-wrapper">
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>{{ path }}</a-breadcrumb-item>
    </a-breadcrumb>

    <a-popconfirm
      title="是否退出登录"
      ok-text="Yes"
      cancel-text="No"
      placement="bottomLeft"
      @confirm="confirm"
      @cancel="cancel"
    >
      <a href="#">{{ userRef }}</a>
    </a-popconfirm>
  </div>
</template>

<script lang="ts">
interface IState {
  path: Ref<string>;
  userRef: Ref<string>;
  confirm: () => void;
}

import { defineComponent, Ref, ref, watchEffect, computed } from "vue";
import { Store, useStore } from "vuex";
import { IStoreState } from "../store";
import { MenuFoldOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  components: {
    MenuFoldOutlined,
  },

  setup(): IState {
    const route = useRoute(); // 使用路由的信息
    const router = useRouter(); // 路由
    const path = ref(""); // 显示在页面的路由文字
    const store: Store<IStoreState> = useStore(); // 仓库

    const confirm = () => {
      store.commit("setUser", "");
      router.push("/login");
    };

    /**
     * 用户账号
     */
    const userRef = computed(() => {
      return store.state.user;
    });

    /**
     * 监控路由的变化
     */
    watchEffect(() => {
      path.value = route.path.substring(1);
    });
    return {
      path,
      confirm,
      userRef,
    };
  },
});
</script>

<style scoped>
.herder-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 49px;
  box-sizing: border-box;
  padding: 0 15px;
  border-bottom: 1px solid rgb(214, 214, 214);
}
</style>