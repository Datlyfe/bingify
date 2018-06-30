<template>
  <div class="header">
    <!-- SEARCH -->
    <div class="search">
      <i @click="back" class="fa fa-chevron-left"></i>
      <i class="fa fa-chevron-right"></i>
      <i class="fa fa-search"></i>
      <!-- <form @submit="search"> -->
      <input @keyup.enter="search" autocomplete="off" v-model="term" name="search" placeholder="Black Panther..." class="search__input" type="text">
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      term:''
    }
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    search(e){
      e.preventDefault();
      this.$router.push({name:'search',params:{term:this.term}})
    }
  }
}
</script>

