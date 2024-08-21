<template>
    <v-container class="d-flex justify-center align-center">
      <v-row>
        <v-col class="d-flex justify-center align-center" cols="12">
          <v-img
            :src="rickAndMorty"
            alt="Rick and Morty logo"
            class="d-flex justify-center align-center mt-14"
            max-width="260px"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
  
    <main>
    <v-container>
        <v-row class="d-flex justify-center align-center">
            <v-col cols="12" md="6">
                <v-text-field
                    placeholder="Filter by name or episode (ex. S01 or S01E02)"
                    prepend-inner-icon="mdi-magnify"
                    v-model="episodesStore.episode"
                    rounded="lg"
                    variant="outlined"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
    <v-container v-if="episodesStore.isLoading">
        <LoadingImage />
    </v-container>
    <v-container v-else-if="!episodesStore.errorMessage">
        <v-row >
                <v-col
                  v-for="episode in episodesStore.episodesList"
                  :key="episode.id"
                  cols="12"
                  md="3"
                >
                  <v-card :key="episode.name" elevation="5" :to="{ path:`/episode-detail/${episode.id}` }" class="d-flex flex-column justify-center align-center py-12 bg-surface-light ">
                    <v-card-title class="pb-0 text-h6">
                      {{ episode.name }}
                    </v-card-title> 
                    <p class="text-caption text-grey text-uppercase px-4">{{ episode.air_date }}</p>
                    <v-card-subtitle class="pt-0 pb-4 text-subtitle text-grey">
                      {{ episode.episode }}
                    </v-card-subtitle>
                  </v-card>
                </v-col>
        </v-row>
      </v-container>
      <v-container v-else class="d-flex justify-center align-center" style="height:45vh">
          <p>{{ episodesStore.errorMessage }}</p>
      </v-container>
    <v-container>
      <v-row class="d-flex align-center justify-center">
        <v-col class="text-center" cols="12">
          <v-btn
            v-if="episodesStore.canLoadMore"
            variant="text"
            elevation="16"
            class="text-h6"
            @click="loadMoreItems"
            color="blue"
            >LOAD MORE
          </v-btn>
          <p v-else> Nothing to load</p>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import rickAndMorty from '@/assets/rick-and-morty-watch.svg'
import LoadingImage from "../components/LoadingImage.vue";
import { useEpisodesStore } from "@/stores/app";

const episodesStore = useEpisodesStore();


onMounted(() => {
  episodesStore.fetchEpisodes();
});

watch(() => episodesStore.episode, 
      () => {setTimeout(()=>episodesStore.fetchEpisodes(),300)
         
      }
    );



const loadMoreItems = () => {
  episodesStore.page += 1;
  episodesStore.updatePage();
};
</script>