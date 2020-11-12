<template>
  <div id="app">
    <navigation />
    <main>
      <keep-alive>
        <router-view
          @getFavorites="getFavorites"
          :favoritesList="favoritesList"
        />
      </keep-alive>
    </main>
  </div>
</template>
<script>
import Navigation from "./components/Navigation";
import { EventBus } from "./global-events/event-bus";

export default {
  components: {
    Navigation,
  },

  data() {
    return {
      favoritesList: [],
    };
  },

  methods: {
    getFavorites(val) {
      this.favoritesList = val.sort().filter((key, idx) => {
        return (
          val.indexOf(key) == idx &&
          (val.lastIndexOf(key) - val.indexOf(key)) % 2 == 0
        );
      });
    },
  },

  watch: {
    $route: {
      immediate: true,
      handler() {
        EventBus.$emit("FAVORITES", this.favoritesList);
      },
    },
  },
};
</script>
