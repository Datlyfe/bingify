<template>
  <div class="top__feed">
    <transition-group ref="op" tag="ul" :name="transition" class="top__list animated">
      <li class="grid-item " v-for="mv in movies" :key="mv.id">

          <div @click="goToMovie(mv)" class="cover js-loading">
            <img @load="load"  :class="{'animated fadeIn':page>1}" :src="getImgLink(mv.poster_path,342)" alt="">
             <div class="text">
              <h3 class="subtext">{{shorten(mv.title,25)}}</h3>
            </div>
          </div>

      </li>
    </transition-group>

    <div v-if="task=='discover'" class="pager">
      <i v-if="page>1" @click="nav('prev')" class="fa fa-chevron-left"></i>
      <span class="index" >{{page}}</span>
      <i class="fa fa-chevron-right" @click="nav('next')"></i>
    </div>
  </div>
</template>


<script>
import {shorten} from '../helpers';

export default {
  resource:'Movies',
  props:['task','term'],
  data(){
    return{
       movies:[],
       transition: 'preview-appear',
       mode:'list',
       loading:false
    }
  },
  computed:{
    page(){
      return this.$store.state.page;
    }
  },
  methods:{
    shorten,
    load(e){
      e.target.parentNode.classList.toggle('js-loading');
    },
    getBgImg(src,size){
      let url=`http://image.tmdb.org/t/p/w${size}/${src}`
      return { backgroundImage: `url(${url})` }
    },
    goToMovie(mv){
      this.$router.push({name:'movie',params:{id:mv.id,mv}})
    },
    getLink(id){
      return `/movie/${id}`;
    },
    getImgLink(src,size){
      return `http://image.tmdb.org/t/p/w${size}/${src}`;
    },
    stackPosts(movies) {
      let interval
      const stack = () => {
        this.movies.push(movies.shift())

        if (!movies.length) {
          this.transition = 'preview'
          clearInterval(interval)
        }
      }

      interval = setInterval(stack,50)
    },
    async getMovies(page){
      if(this.task=='search') return this.$getResource(this.task,this.term,1);
      return  this.$getResource(this.task,page);
    },
    async nav(dir){
      let num=0;
      if(dir=='next'){
        num=this.page+1;
      }else{
        num=this.page-1;
      }
      this.$store.commit('setPage',num);
      this.transition="none";
      if(num<=0) return;
      this.movies=[];
      let response = await this.getMovies(num);
      this.movies=response.results;;
      this.getMovies(num+1);
    }
  },

  async beforeMount(){
    this.$store.commit('setPage',1);
    if(this.task=='search'){
      let response =await this.$getResource(this.task,this.term,1);
      let movies=response.results;
      // this.stackPosts(movies)
      this.movies=movies;
    }
    else{
      let response =await this.$getResource(this.task,this.page);
      let movies=response.results;
      // this.stackPosts(movies)
      this.movies=movies;
      this.$getResource(this.task,this.page+1);
    }

  },
}
</script>
