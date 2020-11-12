<template>
  <div class="error-message position-absolute0000 ">
    <p v-if="errorMessage != ''">
      {{ errorMessage }} But, you can watch this loader doing stuff again and
      again.
    </p>
  </div>
</template>

<script>
import { EventBus } from "../global-events/event-bus";

export default {
  data() {
    return {
      errorMessage: "",
    };
  },

  mounted() {
    EventBus.$on("ERROR_MESSAGE", (payload) => {
      this.errorMessage = payload;
    });
  },
};
</script>
