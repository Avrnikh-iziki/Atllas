<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
   .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
  }

</style>
