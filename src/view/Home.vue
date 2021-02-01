<template>
  <a-layout class="lauout-wrapper">
    <a-layout-sider>
      <Menu />
    </a-layout-sider>

    <a-layout>
      <a-layout-content>
        <Header />
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import Menu from "../components/Menu.vue";
import Header from "../components/Header.vue";
export default defineComponent({
  components: {
    Menu,
    Header,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.lauout-wrapper {
  height: 100%;
}
</style>