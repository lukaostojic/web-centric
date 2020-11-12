<template>
  <div>
    <form @submit.prevent class="search-form">
      <div>
        <section class="search-form__section">
          <span>Search for </span>
          <label for="movie">Movie</label>
          <input type="radio" name="type" value="movie" v-model="search.type" />
          <label for="series">Series</label>
          <input
            type="radio"
            name="type"
            value="series"
            v-model="search.type"
          />
        </section>
        <section class="search-form__section">
          <span>Released</span>
          <select name="year" v-model="search.year">
            <option value="null">Any</option>
            <option v-for="(year, index) in years" :key="index">{{
              year
            }}</option>
          </select>
        </section>
        <section class="search-form__section display-flex--row full-width">
          <div class="full-width">
            <input
              v-model="search.name"
              type="text"
              class="full-width"
              placeholder="Search..."
            />
          </div>
          <button @click="getData()">Search</button>
        </section>
      </div>
    </form>
  </div>
</template>

<script>
import MovieService from "../api/movieService";

export default {
  data() {
    return {
      search: {
        type: "movie",
      },
      years: [],
    };
  },

  methods: {
    renderYears() {
      let currentYear = new Date().getFullYear();
      const yearLimit = 1888;

      for (let i = currentYear; i >= yearLimit; i--) {
        this.years.push(i);
      }
    },

    getData() {
      this.$emit("isLoading", true);
      this.$emit("searchData", this.search);
      MovieService.params = {
        name: this.search.name,
        year: this.search.year,
        type: this.search.type,
        page: undefined,
      };
      MovieService.getMovieList().then((resp) => {
        this.$emit("listFetched", resp);
        this.$emit("isLoading", false);
      });
    },
  },

  mounted() {
    this.renderYears();
  },
};
</script>
