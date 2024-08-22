<template>
    <container class="d-flex flex-column align-center mt-16" style="height:75vh">
        <router-link
    v-for="link in linkArr"
    :key="link.title"
    :to="link.to"
    class="link text-h6 ml-8 my-8 mx-12 text-center"
    @click="appStore.toggleMenu"
    >{{ link.title }}</router-link
  >
    </container>
</template>

<script setup lang="ts">
import { linkArr } from "@/constatnts/constants";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();



</script>