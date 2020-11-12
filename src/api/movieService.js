import axios from "axios";

const MovieService = {
  apiUrl: "http://www.omdbapi.com/?",
  apiKey: "2c811136",
  params: {
    name: "",
    type: null,
    year: "",
    page: "1",
  },
  movieId: null,

  getMovieList() {
    return axios
      .post(
        `${MovieService.apiUrl}s=${MovieService.params.name}&y=${MovieService.params.year}&type=${MovieService.params.type}&page=${MovieService.params.page}&apikey=${MovieService.apiKey}`
      )
      .then((resp) => {
        return resp.data;
      });
  },

  getMovieDetails() {
    return axios
      .post(
        `${MovieService.apiUrl}i=${MovieService.movieId}&apikey=${MovieService.apiKey}`
      )
      .then((resp) => {
        return resp.data;
      });
  },
};

export default MovieService;
