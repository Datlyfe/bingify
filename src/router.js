import Vue from 'vue'
import Router from 'vue-router'
import Home from "./components/Home";
import Top from "./components/Top";
import Movie from "./components/Movie";
import Search from "./components/Search";
import Genres from "./components/Genres";





Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
   {
     path:'/',
     name:'home',
     component:Home,
   },
   {
     path:'/top',
     name:'top',
     component:Top
   },
   {
     path:'/genres/:id',
     name:'genre',
     component:Genres
   },
   {
     path:'/genres',
     name:'genres',
     component:Genres
   },
   {
    path:'/movie/:id',
    name:'movie',
    props:true,
    component:Movie
  },
  {
    path:'/search/:term',
    name:'search',
    component:Search
  }
  ]
})
