<template>
  <v-container class="d-flex justify-center align-center">
    <v-img
      class="rotate"
      :src="loadingImg"
      alt="loading"
      max-width="250px"
    >
    </v-img>
  </v-container>
</template>

<script setup lang="ts">
import loadingImg from "../assets/Loading component.svg"
</script>

<style>
.rotate {
  animation: spin 0.3s linear infinite;
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
