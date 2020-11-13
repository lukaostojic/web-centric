<template>
  <div id="app">
    <navigation />
    <main>
      <keep-alive>
        <router-view />
      </keep-alive>
    </main>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";

export default {
  components: {
    Navigation,
  },
};

// @TODO
// bug - favorites don't remain marked (home page) after an API call

// add transitions / animations
// use local storage to store data permanently
// refactoring
</script>
