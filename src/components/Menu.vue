<template>
  <div class="menu">
    <!-- Logo -->
    <div class="logo">
      <img class="logo__img" src="@/assets/img/logo.png" alt="Logo" />
      <h1 class="logo__label">bingify</h1>
    </div>
    <!-- Explore -->
    <nav class="nav">
      <h3 class="nav__label">Browse</h3>
      <ul class="nav__list">
        <router-link tag="li" to="/" class="nav__list__item active-bar">
          <i class="bx bxs-movie"></i>
          <span class="nav__list__link">Home</span>
        </router-link>
        <router-link tag="li" to="/top" class="nav__list__item">
          <i class="bx bx-trending-up"></i>
          <span class="nav__list__link">Trending</span>
        </router-link>
        <router-link
          :class="{ 'router-link-exact-active': $route.name == 'genre' }"
          tag="li"
          to="/genres/28"
          :exact="false"
          class="nav__list__item active-bar"
        >
          <i class="bx bxs-collection"></i>
          <span class="nav__list__link">Genres</span>
        </router-link>
      </ul>
    </nav>
    <!-- Services -->
    <nav class="nav services">
      <h3 class="nav__label">Goodies</h3>
      <ul class="nav__list">
        <router-link tag="li" to="/app" class="nav__list__item active-bar">
          <i class='bx bx-list-check' ></i>
          <span class="nav__list__link">Watchlist</span>
        </router-link>
        <router-link tag="li" to="/settings" class="nav__list__item active-bar">
          <i class='bx bxs-like' ></i>
          <span class="nav__list__link">Favorites</span>
        </router-link>
      </ul>
    </nav>
    <!-- Watermark -->
    <div class="watermark">
      <!-- <img src="@/assets/img/sig.png" alt=""> -->
      <a href="https://github.com/MoezBouaggad/bingify" target="_blank" class="watermark__label">
        Github
        <i class="bx bxl-github watermark__icon"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {};
</script>
