<template>
  <div v-if="mv_fallback" class="movie">
    <Trailer @close="open = false" v-if="open" :key="v_id" :vid="v_id" />
    <div :style="getBgImg(mv_fallback.poster_path, 342)" class="movie_banner"></div>
    <div class="movie_info">
      <div class="details">
        <h2 class="title">{{ mv_fallback.title }}</h2>
        <Star :disabled="true" :value="Math.ceil(mv_fallback.vote_average / 2)"></Star>

        <span class="d">({{ mv_fallback.vote_count }})</span>
        <span class="d">{{ mv_fallback.release_date }}</span>
        <br v-if="genres.length > 2" />
        <span :key="g.id" class="g" v-for="g in genres">{{ g }}</span>
        <p class="overview">{{ mv_fallback.overview }}</p>
        <div class="cntr">
          <button :disabled="true" @click="like(mv_fallback)" class="btn" type="button">
            <i class="bx bx-heart"></i> Like
          </button>
          <button :disabled="true" class="btn" type="button">
            <i class="bx bx-plus"></i> Add to watchlist
          </button>
        </div>
      </div>
      <div class="trailer js-loading">
        <div class="overlay"></div>
        <img @load="load" @error="noimage" class="backdrop animated fadeIn" :src="thumb" alt />
        <div class="play">
          <img
            @click="open = true"
            v-if="!loading"
            class="play-btn"
            src="@/assets/img/play-button.png"
            alt
          />
          <i v-else class="bx bx-loader bx-spin"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "./Star";
import genresIds from "../static/genres";
import movieService from "../services/movie.service";

import Trailer from "./Trailer";
export default {
  components: {
    Trailer,
    Star
  },
  resource: "Movies",
  props: ["id", "mv"],
  data() {
    return {
      movie: null,
      loading: true,
      v_id: null,
      thumb: null,
      v_src: null,
      open: false,
      mv_fallback: this.mv
    };
  },
  async beforeMount() {
    if (!this.mv) {
      this.mv_fallback = await movieService.getMovie(this.id);
    }
    let response = await movieService.getMovieMeta(this.id);
    this.v_id = response.results[0].key;
    this.thumb = `https://img.youtube.com/vi/${this.v_id}/hqdefault.jpg`;
    this.v_src = `https://www.youtube.com/watch?v=${this.v_id}`;
  },

  computed: {
    genres() {
      let genres = [];
      let temp = null;
      if (this.mv_fallback) {
        let genre_ids = this.mv_fallback.genre_ids
          ? this.mv_fallback.genre_ids
          : this.mv_fallback.genres;

        genre_ids.forEach(something => {
          let id = something.id ? something.id : something;
          temp = genresIds.filter(object => object.id == id)[0];
          genres.push(temp.name);
        });
      }
      return genres;
    }
  },

  methods: {
    like() {},
    noimage() {
      this.thumb = `https://img.youtube.com/vi/${this.v_id}/hqdefault.jpg`;
    },
    load(e) {
      e.target.parentNode.classList.toggle("js-loading");
      this.loading = false;
    },
    getBgImg(src, size) {
      let url = `https://image.tmdb.org/t/p/w${size}/${src}`;
      return { backgroundImage: `url(${url})` };
    },
    getImageLink(src, size) {
      return `https://image.tmdb.org/t/p/w${size}/${src}`;
    }
  }
};
</script>
