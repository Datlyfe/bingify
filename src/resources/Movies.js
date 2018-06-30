export default {
    popular: () => {
      return {
        path: `movie/popular`,
        resolve: (data, mappers) => mappers.pipe(data)
      }
    },
    discover: (page=1) => {
      return {
        path: `discover/movie?page=${page}`,
        resolve: (data, mappers) => mappers.pipe(data)
      }
    },
    moviesByGenre:(genreId)=>{
      return{
        path:`discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}%2C12`,
        resolve:(data,mappers)=>mappers.pipe(data)
      }
    },
    movie(id){
      return{
        path:`movie/${id}/videos`,
        resolve:(data,mappers)=>mappers.pipe(data)
      }
    },
    search(searchTerm,page=1){
      return{
        path:`search/movie?query=${searchTerm}&page=${page}&include_adult=false`,
        resolve:(data,mappers)=>mappers.pipe(data)
      }
    }
  }
