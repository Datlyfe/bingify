<template>
  <div class="movie">
    <Trailer @close="open=false" v-if="open" :key="v_id" :vid="v_id"/>
    <div :style="getBgImg(mv.poster_path,342)" class="movie_banner">

    </div>
    <div class="movie_info">
      <div class="details">

        <h2 class="title">{{mv.title}}  </h2>
        <Star :disabled="true" :value="Math.ceil(mv.vote_average/2)"></Star>

        <span class="d">({{mv.vote_count}})</span>
        <span class="d">{{mv.release_date}}</span>
        <br v-if="genres.length>2">
        <span :key="g.id" class="g" v-for="g in genres">{{g}}</span>
        <p class="overview">{{mv.overview}}</p>
        <div class="cntr">
          <button :disabled="true" @click="like(mv)" class="btn" type="button"> <i class="fa fa-heart"></i> Like</button>
          <button :disabled="true" class="btn" type="button"> <i class="fa fa-plus"></i> Add to watchlist</button>

        </div>

      </div>
      <div class="trailer js-loading">
        <div class="overlay"></div>
        <img @load="load" @error="noimage" class="backdrop animated fadeIn" :src="thumb" alt="">
        <div class="play">
        <img @click="open=true" v-if="!loading" class="play-btn" src="@/assets/img/play-button.png" alt="">
        <i v-else class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
       </div>
      </div>
    </div>
  </div>
</template>


<script>
import Star from './Star'
import genresIds from '../static/genres'

import Trailer from "./Trailer";
export default {
  components:{
    Trailer,
    Star
  },
  resource:'Movies',
  props:['id','mv'],
  data(){
    return{
      movie:null,
      loading:true,
      v_id:null,
      thumb:null,
      v_src:null,
      open:false
    }
  },
  async beforeMount(){
    let response = await this.$getResource('movie',this.id);
    this.v_id=response.results[0].key;
    this.thumb=`https://img.youtube.com/vi/${this.v_id}/hqdefault.jpg`;
    this.v_src=`https://www.youtube.com/watch?v=${this.v_id}`;
  },

  computed:{
    genres(){
      let genres=[];
      let temp=null;
      this.mv.genre_ids.forEach(id=>{
        temp=genresIds.filter(object=>object.id==id)[0];
        genres.push(temp.name);
      })
      return genres;
    }
  },

  methods:{
    like(movie){
      this.$db.likes.insert(movie);
    },
    noimage(){
      this.thumb=`https://img.youtube.com/vi/${this.v_id}/hqdefault.jpg`;
    },
    load(e){
      e.target.parentNode.classList.toggle('js-loading');
      this.loading=false;
    },
    getBgImg(src,size){
      let url=`http://image.tmdb.org/t/p/w${size}/${src}`
      return { backgroundImage: `url(${url})` }
    },
    getImageLink(src,size){
      return `http://image.tmdb.org/t/p/w${size}/${src}`;
    },
  },

}
</script>
