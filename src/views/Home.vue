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
      ></list-item>
    </section>
    <section v-show="isLoading">
      <loader></loader>
    </section>
    <section>
      <div class="pagination">
        <button :disabled="page == 1" @click="page--">Prev</button>
        <button :disabled="disableNextButton" @click="page++">Next</button>
      </div>
    </section>
  </div>
</template>

<script>
import SearchFilter from "../components/SearchFilter";
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";
import MovieService from "../api/movieService";

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

  mounted() {
    this.getLoadingStatus();
  },
};
</script>

<style lang="scss">
body {
  background: $color_bg;
}
</style>
