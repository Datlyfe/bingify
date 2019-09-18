<template>
  <div class="top animated fadeIn">
    <Feed :task="'discover'" />
  </div>
</template>

<script>
import Feed from "../components/Feed";

export default {
  name: "top",
  components: {
    Feed
  }
};
</script>
