<template>
  <Feed :key="$route.params.term" :task="'search'" :term="$route.params.term" />
</template>

<script>
import Feed from "../components/Feed";

export default {
  name: "search",
  components: {
    Feed
  }
};
</script>
