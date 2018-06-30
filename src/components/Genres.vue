<template lang="html">
  <div class="Discover">
    <!-- <div class="g-header">
        <h1 class="header__label">Discover</h1>
      </div> -->
      <!-- Navigation -->
      <nav class="genres">
        <ul class="genres__list">
          <li @click="getGenre(genre.id)" v-for="genre in genres" :key="genre.id" class="genres__list__item" :class="{'g-active':$route.params.id==genre.id}">
            <span class="genres__list__link">{{genre.name}}</span>
          </li>
        </ul>
      </nav>
      <!-- <Feed task='discover'/> -->
      <div class="loved">
        <div v-if="loading" class="signal"></div>
        <ul v-show="!loading" class="loved__list animated fadeIn">
          <li @click="goToMovie(mv)" v-for="mv in feed" :key="mv.id" class="loved__item js-loading">
       <img @load="load"  class="image animated fadeIn" :src="getImgLink(mv.poster_path,342)" alt="">
       <div class="text">
        <h3 class="subtext">{{shorten(mv.title,25)}}</h3>
      </div>
          </li>
        </ul>
    </div>

      <!-- Pager -->
      <div class="pager">
        <i v-if="page>1" @click="nav('prev')" class="fa fa-chevron-left"></i>
        <span class="index" >{{page}}</span>
        <i class="fa fa-chevron-right" @click="nav('next')"></i>
      </div>
  </div>
</template>

<script>
import genres from "../static/genres";
import Feed from "./Feed";
import {shorten} from '../helpers';


export default {
  resource:'Movies',
  components:{
    Feed
  },
  computed:{
    page(){
      return this.$store.state.page;
    }
  },
  watch:{
    '$route.params.id'(to,from){
      this.update(to);
    }
  },
  mounted(){
  //  this.$db.likes.find({},(err,doc)=>{
  //    console.log(doc);
  //  })
  },
  data(){
    return{
      genres:genres,
      feed:[],
      loading:false
    }
  },
  methods:{
    shorten,
    nav(dir){

    },
    load(e){
      e.target.parentNode.classList.toggle('js-loading');
    },
    goToMovie(mv){
      this.$router.push({name:'movie',params:{id:mv.id,mv}})
    },
    getImgLink(src,size){
      return `http://image.tmdb.org/t/p/w${size}/${src}`;
    },
    async update(id){
      this.loading=true;
      let res = await this.$getResource('moviesByGenre',id);
      this.feed=res.results;
      setTimeout(()=>{ this.loading=false; }, 200);
    },
    getGenre(id){
      this.$router.push({name:'genre',params:{id}});
    }
  },
  async beforeMount(){
    this.update(28);
  }
}
</script>

<style lang="css">
</style>
