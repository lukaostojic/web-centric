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

// bug - favorites stay marked
// responsiveness
// refactoring
</script>
