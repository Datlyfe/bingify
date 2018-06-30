<template>
  <div class="top animated fadeIn">
   <Feed :task="'discover'"/>
  </div>
</template>


<script>
import Feed from './Feed';
import Movie from './Movie';

export default {
  name:'top',
  components:{
    Feed,
    Movie
  }
}
</script>
