<template>
  <v-container class="d-none d-sm-block">
    <router-link
    v-for="link in linkArr"
    :key="link.title"
    :to="link.to"
    class="link text-h6 ml-8"
    >{{ link.title }}</router-link
  >
  </v-container>
  
    
  <v-btn icon="mdi-menu" class="d-block d-sm-none" @click="toggleMenu">
  </v-btn>
   
  

  
</template>

<script setup lang="ts">
interface Link {
  to: string;
  title: string;
}
const linkArr: Link[] = [
  { to: "/characters", title: "Characters" },
  { to: "/locations", title: "Locations" },
  { to: "/episodes", title: "Episodes" },
];

import { useAppStore } from "../stores/app";

const store = useAppStore();

const toggleMenu = () => {
  store.toggleMenu();
};

</script>

<style scoped>
 

</style>
