<template>
  <v-card
    :key="props.name"
    elevation="5"
    :to="{ path: `/character-details/${id}` }"
    class="p-6"
    min-height="308px"
  >
    <v-img :src="props.image" height="247px" cover> </v-img>
    <v-card-title class="pb-0">
      {{ props.name }}
    </v-card-title>
    <v-card-subtitle class="pt-0 pb-4">
      {{ props.species }}
    </v-card-subtitle>
  </v-card>
</template>

<script setup lang="ts">
import { IProps } from './MobileMenu.vue';

const props = defineProps<IProps>();
</script>
