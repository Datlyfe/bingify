<template>
  <div class="app_wrapper">
    <div class="fixed_wrap"></div>
    <div class="app_container">
      <Menu/>
      <Main/>
    </div>
  </div>
</template>

<script>
import Main from './components/Main'
import Menu from './components/Menu'

export default {
  name:'app',
  components:{
    Main,
    Menu
  }
}
</script>
