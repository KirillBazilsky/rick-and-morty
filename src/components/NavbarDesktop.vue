<template>
  <v-container class="d-none d-sm-block">
    <router-link
      v-for="link in pathList"
      :key="link.title"
      :to="link.to"
      class="link text-h6 ml-8"
      >{{ link.title }}</router-link
    >
  </v-container>

  <v-btn icon="mdi-menu" class="d-block d-sm-none" @click="props.toggleMenu">
  </v-btn>
</template>

<script setup lang="ts">
import { pathList } from "@/constatnts/navigation";
import { IProps } from "./MobileMenu.vue";
const props = defineProps<IProps>();
</script>

<style scoped></style>
