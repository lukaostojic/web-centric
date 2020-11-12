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
// bug - favorites don't stay marked
// bug - show details stays open
// refactoring
</script>
