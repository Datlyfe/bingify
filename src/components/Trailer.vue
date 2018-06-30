<template>
  <div @click.self="close" class="wrap fadeIn animated">
    <div class="wrap__content">
      <youtube :height="742" :width="1164" :video-id="vid" :player-vars="playerVars"></youtube>
    </div>
  </div>
</template>

<script>
export default {
  props:['vid'],
  data(){
    return{
      playerVars:{
        autoplay:1
      }
    }
  },
  methods:{
    close(){
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
    animation-duration: .5s;
    z-index: 9999999;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    background: #0b0b0b;
    background: rgba(0,0,0,.9);
    outline: none!important;
}
.wrap__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
