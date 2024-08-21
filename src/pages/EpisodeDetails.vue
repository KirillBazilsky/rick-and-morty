<template>
    <v-main v-if="!episodesStore.isLoading">
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
                    <h1 class="text-h3">{{episodesStore.episodesInfo?.name}}</h1>
                </v-col>
            </v-row>

        </v-container>
        <v-container>
            <v-row>
                <v-col cols="12" md="6" class="d-flex justify-center align-top">
                    <v-table style="width: 100%;">
                            <tr>
                                <td>
                                    <div class="text-subtitle-1 text-black font-weight-bold mt-2">Episode</div>
                                    <p class="text-subtitle-2 text-grey mb-2">{{episodesStore.episodesInfo?.episode}}</p>
                                </td>
                            </tr>
                    </v-table>
                </v-col>
                <v-col cols="12" md="6" class="d-flex justify-center align-top">
                    <v-table style="width: 100%;">
                            <tr v-for="episode in episodesStore.episodesList" :key="episode.id">
                                <td>
                                    <div class="text-subtitle-1 text-black font-weight-bold mt-2">Date</div>
                                    <p class="text-subtitle-2 text-grey mb-2">{{episodesStore.episodesInfo?.air_date}}</p>
                                </td>
                            </tr>
                    </v-table>
                </v-col>
            </v-row>
        </v-container>
            
   
    </v-main>   
    <v-main v-else>
        <LoadingImage />
    </v-main>
    
</template>
 


<script setup lang="ts">
import { useRoute, useRouter} from 'vue-router';
import { useCharactersStore } from "@/stores/app";
import LoadingImage from "../components/LoadingImage.vue";

const episodesStore = useCharactersStore();

const route :any = useRoute();
const router = useRouter();

onMounted(() => {
    episodesStore.fetchCharacterInfo(route.params.id)

})  

const goBack = () => {
  router.back();
};
    
</script>
  




