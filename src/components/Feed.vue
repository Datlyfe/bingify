<template>
  <div class="top__feed">
    <transition-group ref="op" tag="ul" :name="transition" class="top__list animated">
      <li class="grid-item" v-for="mv in movies" :key="mv.id">
        <div @click="goToMovie(mv)" class="cover js-loading">
          <img
            @load="load"
            :class="{ 'animated fadeIn': page > 1 }"
            :src="getImgLink(mv.poster_path, 342)"
            alt
          />
          <div class="text">
            <h3 class="subtext">{{ shorten(mv.title, 25) }}</h3>
          </div>
        </div>
      </li>
    </transition-group>

    <div v-if="task == 'discover'" class="pager">
      <i v-if="page > 1" @click="nav('prev')" class="bx bx-chevron-left"></i>
      <span class="index">{{ page }}</span>
      <i class="bx bx-chevron-right" @click="nav('next')"></i>
    </div>
  </div>
</template>

<script>
import movieService from "../services/movie.service";
import { shorten } from "../helpers";

export default {
  resource: "Movies",
  props: ["task", "term"],
  data() {
    return {
      movies: [],
      transition: "preview-appear",
      mode: "list",
      loading: false
    };
  },
  computed: {
    page() {
      return this.$store.state.page;
    }
  },
  methods: {
    shorten,
    load(e) {
      e.target.parentNode.classList.toggle("js-loading");
    },
    goToMovie(mv) {
      this.$router.push({ name: "movie", params: { id: mv.id, mv } });
    },
    getImgLink(src, size) {
      return `https://image.tmdb.org/t/p/w${size}/${src}`;
    },
    async getMovies(page) {
      if (this.task == "search") return movieService.search(this.term, 1);

      return movieService.discover(page);
    },
    async nav(dir) {
      let num = 0;
      if (dir == "next") {
        num = this.page + 1;
      } else {
        num = this.page - 1;
      }
      this.$store.commit("setPage", num);
      this.transition = "none";
      if (num <= 0) return;
      this.movies = [];
      let response = await this.getMovies(num);
      this.movies = response.results;
    }
  },

  async beforeMount() {
    this.$store.commit("setPage", 1);
    if (this.task == "search") {
      let response = await movieService.search(this.term, 1);
      let movies = response.results;
      this.movies = movies;
    } else {
      let response = await movieService.discover(this.page);
      let movies = response.results;
      this.movies = movies;
    }
  }
};
</script>
