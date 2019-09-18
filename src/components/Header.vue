<template>
  <div class="header">
    <!-- SEARCH -->
    <div class="search">
      <i @click="back" class="bx bx-chevron-left"></i>
      <i class="bx bx-chevron-right"></i>
      <i class="bx bx-search"></i>
      <!-- <form @submit="search"> -->
      <input
        @keyup.enter="search"
        autocomplete="off"
        v-model="term"
        name="search"
        placeholder="Black Panther..."
        class="search__input"
        type="text"
      />
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      term: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    search(e) {
      e.preventDefault();
      this.$router.push({ name: "search", params: { term: this.term } });
    }
  }
};
</script>
