<template>
  <nav
    class="main-navigation display-flex--row justify-between align-center full-width"
  >
    <div>
      <router-link class="main-navigation__item" to="/home">Home</router-link>
      <router-link class="main-navigation__item" to="/favorites"
        >Favorites</router-link
      >
    </div>
    <img src="../assets/logo.png" class="main-navigation__logo" alt="Logo" />
  </nav>
</template>

<script>
export default {};
</script>
