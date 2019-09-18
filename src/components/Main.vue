<template>
  <div class="main">
    <!-- HEADER -->
    <Header />
    <!-- ROUTER TAKES OVER -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./Header";

export default {
  name: "app",
  components: {
    Header
  }
};
</script>
