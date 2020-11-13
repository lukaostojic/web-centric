<template>
  <div>
    <div class="display-flex--row justify-between align-center">
      <span>{{ details.Genre }}</span>
      <span
        ><strong>{{ details.imdbRating }}</strong></span
      >
    </div>

    <p>{{ details.Plot }}</p>
    <div class="list-item__details-info display-flex--column">
      <img class="" :src="details.Poster" alt="" />
      <div class="position-relative">
        <p>
          <strong> Director:</strong> &nbsp;<span>{{ details.Director }}</span>
        </p>
        <p>
          <strong> Actors:</strong> &nbsp;<span>{{ details.Actors }}</span>
        </p>
        <p>
          <strong> Runtime:</strong> &nbsp;<span>{{ details.Runtime }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movieDetails"],

  data() {
    return {
      details: {},
    };
  },

  created() {
    this.details = this.movieDetails;
  },
};
</script>
