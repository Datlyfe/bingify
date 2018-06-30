<template>
<div class="Home animated fadeIn">
  <div class="banner">
    <div class="sep">
        <div class="sep__controlls">
          <i @click="slide('left')" class="fa fa-chevron-left"></i>
          <i @click="slide('right')" class="fa fa-chevron-right"></i>
        </div>
      </div>
  </div>

  <div class="mini-feed">
  <!-- <div v-if="loading" class="signal"></div> -->
    <transition-group ref="ul" tag="ul" :name="'preview'"  class="feed">
      <li ref="movie" v-for="mv in movies" class="movie" :key="mv.id">
        <figure class="movie__figure" :style="getBgImg(mv.poster_path,342)">
          <div class="text">
            <h3 class="subtext">{{shorten(mv.title,25)}}</h3>
          </div>
        </figure>
      </li>
    </transition-group>
  </div>
</div>  
</template>


<script>
import {shorten} from '../helpers';
export default {
  name:'slider',
  resource:'Movies',
  data(){
    return{
       movies:null,
       loading:true
    }
  },
  async beforeMount(){
    this.loading=true;
    let response =await this.$getResource('popular');
    this.movies=response.results;
    this.loading=false;
  },
  methods:{
    shorten,
    slide(direction){
      let poster=this.$refs.movie[0].getBoundingClientRect();
      let posterWidth = poster.width;
      let offset = direction=='right'?(posterWidth)*4:(posterWidth)*-4;
      let pos = this.$refs.ul.$el.scrollLeft;
      this.$refs.ul.$el.scrollTo({
        top:0,
        left:pos+offset,
        behavior:'smooth'
      })
    },
    getBgImg(src,size){
      let url=`http://image.tmdb.org/t/p/w${size}/${src}`
      return { backgroundImage: `url(${url})` }
    },
  }
  
}
</script>

