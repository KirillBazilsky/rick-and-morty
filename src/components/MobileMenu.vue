<template>
  <v-container
    class="d-flex flex-column align-center mt-16"
    style="height: 75vh"
  >
    <router-link
      v-for="link in pathList"
      :key="link.title"
      :to="link.to"
      class="link text-h6 ml-8 my-8 mx-12 text-center"
      @click="props.toggleMenu"
      >{{ link.title }}</router-link
    >
  </v-container>
</template>

<script setup lang="ts">
import { pathList } from "@/constatnts/navigation";
export interface IProps {
  toggleMenu?: Function;
  name?: string;
  id?: number;
  image?: string;
  species?: string;
}
const props = defineProps<IProps>();
</script>
