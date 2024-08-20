<template>
    <v-main v-if="!charactersStore.loading">
        <v-container>
            <v-row>
                <v-col class="d-flex justify-right align-center">
                    <router-link to="characters" class="link text-h6 d-flex align-center" @click="goBack"> 
                        <v-icon icon="mdi-arrow-left"></v-icon>
                        GO BACK
                    </router-link>
                </v-col>
                <v-col class="d-flex justify-center align-center" cols="12">
                    <v-img  :src="charactersStore.characterInfo?.image" max-width="300px" class="border-lg border-primary rounded-circle" alt="avatar of character">
                    </v-img>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class= "text-center">
                    <h1 class="text-h3">{{charactersStore.characterInfo?.name}}</h1>
                </v-col>
            </v-row>

        </v-container>
        <v-container>
            <v-row>
                <v-col cols="12" md="6" class="d-flex justify-center align-top">
                    <v-table style="width: 100%;">
                        <thead class="text-left">
                            <tr>
                                <th class="text-h6 text-grey">
                                    Informations
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="text-subtitle-1 text-black font-weight-bold mt-2">Gender</div>
                                    <p class="text-subtitle-2 text-grey mb-2">{{charactersStore.characterInfo?.gender}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-1 text-black font-weight-bold mt-2">Status</div>
                                    <p class="text-subtitle-2 text-grey mb-2">{{charactersStore.characterInfo?.status}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-1 text-black font-weight-bold mt-2">Specie</div>
                                    <p class="text-subtitle-2 text-grey mb-2">{{charactersStore.characterInfo?.species}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-1 text-black font-weight-bold mt-2">Origin</div>
                                    <p class="text-subtitle-2 text-grey mb-2">{{charactersStore.characterInfo?.origin.name}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-1 text-black font-weight-bold mt-2">Type</div>
                                    <div v-if="charactersStore.characterInfo?.type">
                                        <p class="text-subtitle-2 text-grey mb-2">{{ charactersStore.characterInfo?.type}}</p>
                                    </div>
                                    <p v-else class="text-subtitle-2 text-grey">
                                        Unknown
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-1 text-black font-weight-bold mt-2">Location</div>
                                    <p class="text-subtitle-2 text-grey mb-2">{{charactersStore.characterInfo?.location.name}}</p>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
                <v-col cols="12" md="6" class="d-flex justify-center align-top">
                    <v-table style="width: 100%;">
                        <thead class="text-left">
                            <tr>
                                <th class="text-h6 text-grey">
                                    Episodes
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="episode in charactersStore.episodesList" :key="episode.id">
                                <td >
                                    <v-row>
                                        <v-col cols="10">
                                            <div class="text-subtitle-1 text-black font-weight-bold mt-2">{{ episode.episode }}</div>
                                            <p class="text-subtitle-2 text-grey">{{ episode.name }}</p>
                                            <p class="text-caption text-grey mb-2">{{ episode.air_date }}</p>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex align-center">
                                            <v-icon icon="mdi-chevron-right" class="inline" color="#8E8E93"></v-icon>
                                        </v-col>
                                    </v-row>
                                </td>
                            </tr>
                        </tbody>
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

const charactersStore = useCharactersStore();

const route :any = useRoute();
const router = useRouter();

onMounted(() => {
    charactersStore.fetchCharacterInfo(route.params.id)

})  

const goBack = () => {
  router.back();
};
    
</script>
  




