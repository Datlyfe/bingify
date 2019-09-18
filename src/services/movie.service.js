import axios from "axios";
import cache from "memory-cache";

const cacheInstance = new cache.Cache();

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",

  params: {
    api_key: "b600fefffa6a832f227803554ed023d7"
  }
});

class MovieService {
  async getPopular() {
    const path = "movie/popular";
    const cacheHit = cacheInstance.get(path);
    if (cacheHit) {
      return cacheHit;
    }
    const { data } = await axiosInstance.get(path);
    cacheInstance.put(path, data);
    return data;
  }
  async discover(page = 1) {
    const path = `discover/movie?page=${page}`;
    const cacheHit = cacheInstance.get(path);
    if (cacheHit) {
      return cacheHit;
    }
    const { data } = await axiosInstance.get(path);
    cacheInstance.put(path, data);
    return data;
  }
  async getMoviesByGenre(genreId) {
    const path = `discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}%2C12`;
    const cacheHit = cacheInstance.get(path);
    if (cacheHit) {
      return cacheHit;
    }
    const { data } = await axiosInstance.get(path);
    cacheInstance.put(path, data);
    return data;
  }
  async getMovieMeta(id) {
    const path = `movie/${id}/videos`;
    const cacheHit = cacheInstance.get(path);
    if (cacheHit) {
      return cacheHit;
    }
    const { data } = await axiosInstance.get(path);
    cacheInstance.put(path, data);
    return data;
  }

  async getMovie(id) {
    const path = `movie/${id}`;
    const cacheHit = cacheInstance.get(path);
    if (cacheHit) {
      return cacheHit;
    }
    const { data } = await axiosInstance.get(path);
    cacheInstance.put(path, data);
    return data;
  }
  async search(searchTerm, page = 1) {
    const path = `search/movie?query=${searchTerm}&page=${page}&include_adult=false`;
    const cacheHit = cacheInstance.get(path);
    if (cacheHit) {
      return cacheHit;
    }
    const { data } = await axiosInstance.get(path);
    cacheInstance.put(path, data);
    return data;
  }
}

export default new MovieService();
