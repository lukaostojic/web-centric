<template>
  <div>
    <div v-show="!isLoading">
      <list-item
        v-for="(movie, index) in favoritesList"
        :key="index"
        :movieInfo="movie"
        :isFavoritesView="true"
      ></list-item>
    </div>
    <div v-show="isLoading">
      <loader></loader>
    </div>
  </div>
</template>

<script>
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";
import MovieService from "../api/movieService";
import { EventBus } from "../global-events/event-bus";

export default {
  components: {
    ListItem,
    Loader,
  },

  data() {
    return {
      favorites: [],
      movieId: "",
      favoritesList: [],
      isLoading: false,
    };
  },

  methods: {
    async getMovies() {
      this.isLoading = true;
      let iterations = this.favorites.length;
      for await (let item of this.favorites) {
        MovieService.movieId = item;
        MovieService.getMovieDetails().then((resp) => {
          this.favoritesList.push(resp);
          iterations--;
          if (iterations == 0) {
            this.isLoading = false;
          }
        });
      }
    },
  },

  watch: {
    $route() {
      this.favoritesList = [];
    },
  },

  mounted() {
    EventBus.$on("FAVORITES", (payload) => {
      this.favorites = payload;
      this.getMovies();
    });
  },
};
</script>
