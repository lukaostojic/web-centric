<template>
  <div>
    <div v-show="!isLoading">
      <list-item
        v-for="movie in favoritesList"
        :key="movie.imdbID"
        :movieInfo="movie"
        :isFavoritesView="true"
      ></list-item>
    </div>
    <div v-show="isLoading">
      <loader></loader>
    </div>
    <p class="text-center" v-show="isEmpty && !isLoading">
      Your list is empty.
    </p>
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
      isEmpty: true,
    };
  },

  methods: {
    async getMovies() {
      this.isLoading = true;
      this.isEmpty = true;
      let iterations = this.favorites.length;
      if (this.favorites.length == 0) {
        this.isLoading = false;
      }
      for await (let item of this.favorites) {
        MovieService.movieId = item;
        MovieService.getMovieDetails().then((resp) => {
          this.favoritesList.push(resp);
          iterations--;
          if (iterations == 0) {
            this.isLoading = false;
            this.isEmpty = false;
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
