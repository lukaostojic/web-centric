<template>
  <div>
    <search-filter
      @searchData="getDataFromFilter"
      @listFetched="renderMovieList"
      @isLoading="getLoadingStatus"
    ></search-filter>
    <section v-show="!isLoading" class="movie-list">
      <list-item
        v-for="(movie, index) in movieList"
        :key="index"
        :movieInfo="movie"
        :isFavoritesView="false"
        @addToFavorites="addToFavorites"
      ></list-item>
    </section>
    <section v-show="isLoading">
      <loader></loader>
    </section>
    <footer
      class="home-footer display-flex--row justify-center align-center position-fixed full-width"
    >
      <div class="">
        <button
          class="home-footer__pagination"
          :disabled="page == 1"
          @click="page--"
        >
          Prev
        </button>
        <button
          class="home-footer__pagination"
          :disabled="disableNextButton"
          @click="page++"
        >
          Next
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
import SearchFilter from "../components/SearchFilter";
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";
import MovieService from "../api/movieService";
// import { EventBus } from "../global-events/event-bus";

export default {
  components: {
    SearchFilter,
    ListItem,
    Loader,
  },

  data() {
    return {
      movieList: [],
      isLoading: false,
      searchQuery: {},
      page: 1,
      favorites: [],
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
      this.$emit("getFavorites", this.favorites);
    },
  },

  computed: {
    disableNextButton() {
      return this.movieList.length < 10;
    },
  },

  watch: {
    page: function(val) {
      this.page = val;
      this.getMovieList();
    },
  },
};
</script>

<style lang="scss">
body {
  background: $color_bg;
}
</style>
