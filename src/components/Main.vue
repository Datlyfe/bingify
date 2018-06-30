<template>
  <div class="main">
    <!-- HEADER -->
    <Header/>
    <!-- ROUTER TAKES OVER -->
    <router-view></router-view>
    
  </div> 
</template>


<script>
import Header from './Header';
import Home from './Home';


export default {
  name:'app',
  components:{
    Header,
    Home
  }
}
</script>

 