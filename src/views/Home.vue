<template>
  <div>
    <search-filter
      @searchData="getDataFromFilter"
      @listFetched="renderMovieList"
      @isLoading="getLoadingStatus"
    ></search-filter>
    <section v-show="!isLoading" class="movie-list">
      <list-item
        v-for="movie in movieList"
        :key="movie.imdbID"
        :movieInfo="movie"
        :isFavoritesView="false"
        @addToFavorites="addToFavorites"
      ></list-item>
    </section>
    <section v-show="isLoading">
      <loader :format="loaderFormat"></loader>
    </section>
    <footer
      class="home-footer display-flex--row justify-center align-center position-fixed full-width"
    >
      <div class="">
        <button
          class="home-footer__pagination"
          :disabled="page == 1 || movieList.length <= 9"
          @click="page--"
        >
          Prev
        </button>
        <button
          class="home-footer__pagination"
          :disabled="movieList.length < 10"
          @click="page++"
        >
          Next
        </button>
      </div>
    </footer>
    <error-message></error-message>
  </div>
</template>

<script>
import SearchFilter from "../components/SearchFilter";
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import MovieService from "../api/movieService";
import { EventBus } from "../global-events/event-bus";

export default {
  components: {
    SearchFilter,
    ListItem,
    Loader,
    ErrorMessage,
  },

  data() {
    return {
      movieList: [],
      isLoading: false,
      loaderFormat: "big",
      searchQuery: {},
      page: 1,
      favorites: [],
      componentKey: 0,
      errorMessage: "",
      favoritesList: [],
    };
  },

  methods: {
    renderMovieList(val) {
      this.movieList = val.Search;
    },

    getDataFromFilter(val) {
      this.searchQuery = val;
    },

    getLoadingStatus(val) {
      this.isLoading = val;
    },

    getMovieList() {
      this.isLoading = true;
      MovieService.params = {
        name: this.searchQuery.name,
        year: this.searchQuery.year,
        type: this.searchQuery.type,
        page: this.page,
      };
      MovieService.getMovieList().then((resp) => {
        this.movieList = resp.Search;
        this.isLoading = false;
      });
    },

    addToFavorites(val) {
      this.favorites.push(val);
      this.sendDataToFavorites();
    },

    sendDataToFavorites() {
      this.favoritesList = this.favorites.sort().filter((key, idx) => {
        return (
          this.favorites.indexOf(key) == idx &&
          (this.favorites.lastIndexOf(key) - this.favorites.indexOf(key)) % 2 ==
            0
        );
      });
    },
  },

  watch: {
    page: function(val) {
      this.page = val;
      this.getMovieList();
    },

    $route: {
      immediate: true,
      handler() {
        EventBus.$emit("FAVORITES", this.favoritesList);
      },
    },
  },
};
</script>

<style lang="scss">
body {
  background: $color_bg;
}
</style>
