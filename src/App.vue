<template>
  <div id="app">
    <login />
    <headlist />
    <!-- 设置路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
import login from "@/views/login.vue";
 import headlist from "@/components/headlist.vue";

export default {
  name: "app",
  components: {
    headlist,
    login,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  max-width: 1455px;
}
</style>
