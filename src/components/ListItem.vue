<template>
  <div class="list-item position-relative">
    <div class="list-item__heading display-flex--column align-center">
      <div class="display-flex--row justify-between full-width">
        <h4 class="list-item__heading-header">
          {{ movieInfo.Title || movieDetails.Title }}
        </h4>
        <i
          @click="addToFavorites"
          class="list-item__heading-favorite fa fa-star"
          aria-hidden="true"
          :class="{ added: isFavorite }"
          v-if="!isFavoritesView"
        ></i>
      </div>
      <div
        class="list-item__heading-info display-flex--row justify-between align-center full-width"
      >
        <div class="display-flex--column full-width">
          <span>{{ movieInfo.Year || movieDetails.Year }}</span>
          <span>{{ movieInfo.Type || movieDetails.Type }}</span>
        </div>
        <i @click="getDetails" class="fa fa-info-circle" aria-hidden="true"></i>
      </div>
    </div>
    <div v-if="isLoading && !showDetails">
      <loader :format="loaderFormat"></loader>
    </div>
    <div
      v-if="!isLoading && showDetails"
      class="list-item__details display-flex--column"
    >
      <div class="display-flex--row justify-between align-center">
        <span>{{ movieDetails.Genre }}</span>
        <span
          ><strong>{{ movieDetails.imdbRating }}</strong></span
        >
      </div>

      <p>{{ movieDetails.Plot }}</p>
      <div class="list-item__details-info display-flex--column">
        <img class="" :src="movieInfo.Poster" alt="" />
        <div class="position-relative">
          <p>
            <strong> Director:</strong> &nbsp;<span>{{
              movieDetails.Director
            }}</span>
          </p>
          <p>
            <strong> Actors:</strong> &nbsp;<span>{{
              movieDetails.Actors
            }}</span>
          </p>
          <p>
            <strong> Runtime:</strong> &nbsp;<span>{{
              movieDetails.Runtime
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieService from "../api/movieService";
import Loader from "../components/Loader";

export default {
  components: {
    Loader,
  },

  props: ["movieInfo", "isFavoritesView"],

  data() {
    return {
      movieDetails: {},
      showDetails: false,
      isLoading: false,
      loaderFormat: "small",
      isFavorite: false,
    };
  },

  methods: {
    getDetails() {
      this.isLoading = true;
      MovieService.movieId = this.movieInfo.imdbID;
      MovieService.getMovieDetails().then((resp) => {
        this.showDetails = !this.showDetails;
        this.movieDetails = resp;
        this.isLoading = false;
      });
    },

    addToFavorites() {
      this.isFavorite = !this.isFavorite;
      this.$emit("addToFavorites", this.movieInfo.imdbID);
    },

    mounted() {
      this.showDetails = false;
    },
  },
};
</script>
