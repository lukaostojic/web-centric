<template>
  <div
    :class="'small' ? 'loader--small' : 'loader--big'"
    class="loader full-width full-height display-flex--row justify-center align-center position-relative"
  >
    <img src="../assets/loader.gif" alt="" />
  </div>
</template>

<script>
export default {
  props: ["format"],

  data() {
    return {
      small: false,
    };
  },
};
</script>
