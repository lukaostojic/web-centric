<template>
  <div>
    <p>favorites</p>
    <list-item
      v-for="(movie, index) in favoritesList"
      :key="index"
      :movieInfo="movie"
      :isFavoritesView="true"
    ></list-item>
  </div>
</template>

<script>
import ListItem from "../components/ListItem";
import MovieService from "../api/movieService";
import { EventBus } from "../global-events/event-bus";

export default {
  components: {
    ListItem,
  },

  data() {
    return {
      favorites: [],
      movieId: "",
      favoritesList: [],
    };
  },

  methods: {
    async getMovies() {
      for await (let i of this.favorites) {
        MovieService.movieId = i;
        MovieService.getMovieDetails().then((resp) => {
          this.favoritesList.push(resp);
        });
      }
    },
  },

  watch: {
    $route() {
      this.favoritesList = [];
      this.favorites = [];
    },
  },

  mounted() {
    EventBus.$on("FAVORITES", (payload) => {
      this.favorites = payload;
      this.getMovies();
    });
  },

  beforeDestroy() {
    this.favoritesList = [];
  },
};
</script>
