<template>
  <div id="app">
    <!-- 设置路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
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
