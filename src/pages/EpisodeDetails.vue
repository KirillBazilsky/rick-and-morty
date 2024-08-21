<template>
    <v-main v-if="!episodesStore.isLoading || !episodesStore.errorMessage">
        <v-container>
            <v-row>
                <v-col class="d-flex justify-right align-center">
                    <router-link to="characters" class="link text-h6 d-flex align-center" @click="goBack"> 
                        <v-icon icon="mdi-arrow-left"></v-icon>
                        GO BACK
                    </router-link>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class= "text-center">
                    <h1 class="text-h3">{{episodesStore.episodeInfo?.name}}</h1>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row class="d-flex justify-center">
                <v-col cols="6" md="3" class="d-flex justify-center align-top">
                    <v-table style="width: 100%;">
                            <tr>
                                <td>
                                    <div class="text-subtitle-1 text-black font-weight-bold mt-2">Episode</div>
                                    <p class="text-subtitle-2 text-grey mb-2">{{episodesStore.episodeInfo?.episode}}</p>
                                </td>
                            </tr>
                    </v-table>
                </v-col>
                <v-col cols="6" md="3" class="d-flex justify-center align-top">
                    <v-table style="width: 100%;">
                            <tr>
                                <td>
                                    <div class="text-subtitle-1 text-black font-weight-bold mt-2">Date</div>
                                    <p class="text-subtitle-2 text-grey mb-2">{{episodesStore.episodeInfo?.air_date}}</p>
                                </td>
                            </tr>
                    </v-table>
                </v-col>
            </v-row>
        </v-container>
        
        <v-container>
            <p class="text-h6 text-grey">Cast</p>
            <v-row v-if="!episodesStore.errorMessage">     
        <v-col
          v-for="character in episodesStore.charactersList"
          :key="character.id"
          cols="12"
          md="3"
        >
          <v-card :key="character.name" elevation="5" :to="{ path:`/character-details/${character.id}` }">
            <v-img :src="character.image" height="167px" cover> </v-img>
            <v-card-title>
              {{ character.name }}
            </v-card-title>
            <v-card-subtitle>
              {{ character.species }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
        </v-container>
            
   
    </v-main>   
    <v-main v-else-if="episodesStore.isLoading">
        <LoadingImage />
    </v-main>
    <v-main v-else-if="episodesStore.errorMessage">
        <v-container class="d-flex justify-center align-center" style="height:75vw">
            <p>{{ episodesStore.errorMessage }}</p>
        </v-container>
    </v-main>
    
</template>
 


<script setup lang="ts">
import { useRoute, useRouter} from 'vue-router';
import { useEpisodesStore } from "@/stores/app";
import LoadingImage from "../components/LoadingImage.vue";

const episodesStore = useEpisodesStore();

const route :any = useRoute();
const router = useRouter();

onMounted(() => {
    episodesStore.fetchEpisodeInfo(route.params.id)

})  

const goBack = () => {
  router.back();
};
    
</script>
  




