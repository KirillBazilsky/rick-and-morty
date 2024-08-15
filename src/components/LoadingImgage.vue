<template>
  <div id="loading-wrapper" class="container img-container">
    <v-img
      class="rotate d-flex justify-center align-center"
      :src="loadingImg"
      alt="loading"
      max-width="250px"
    >
    </v-img>
  </div>
</template>

<script setup lang="ts">
import loadingImg from "../assets/Loading component.svg"
</script>

<style>
.rotate {
  animation: spin 0.1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.img-container {
  height: 70vh;
}
</style>
