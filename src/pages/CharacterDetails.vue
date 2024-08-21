<template>
    <v-main>
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
                    <h1>{{charactersStore.characterInfo?.name}}</h1>
                </v-col>
            </v-row>

        </v-container>
        <v-container>
            <v-row>
                <v-col cols="6" class="d-flex justify-center align-top">
                    <v-table style="width: 100%;">
                        <thead class="text-left">
                            <tr>
                                <th>
                                    Informations
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="text-subtitle-2 font-black">Gender</div>{{charactersStore.characterInfo?.gender}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-2 font-black">Status</div>{{charactersStore.characterInfo?.status}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-2 font-black">Specie</div>{{charactersStore.characterInfo?.species}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-2 font-black">Origin</div>{{charactersStore.characterInfo?.origin.name}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-2 font-black">Type</div>
                                    <div v-if="charactersStore.characterInfo?.type">
                                        {{ charactersStore.characterInfo?.type}}
                                    </div>
                                    <p v-else>
                                        Unknown
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-2 font-black">Location</div>{{charactersStore.characterInfo?.location.name}}
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
                <v-col cols="6" class="d-flex justify-center align-top">
                    <v-table style="width: 100%;">
                        <thead class="text-left">
                            <tr>
                                <th>
                                    Episodes
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="episode in charactersStore.episodesList" :key="episode.id">
                                <td >
                                    <v-row>
                                        <v-col cols="10">
                                            <div>{{ episode.episode }}</div>
                                            <p class="name">{{ episode.name }}</p>
                                            <p>{{ episode.air_date }}</p>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex align-center">
                                            <router-link :to="{ path:`/episode-details/${episode.id}` }">
                                                <v-icon icon="mdi-chevron-right" class="inline" color="#8E8E93"></v-icon>
                                            </router-link>
                                            
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

    
</template>
 


<script setup lang="ts">
import { useRoute, useRouter} from 'vue-router';
import { useCharactersStore } from "@/stores/app";

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
  
<style scoped>
h1{
    font-family:Roboto;
    font-weight:400;
    font-size:48px;
}
th{
font-family: Roboto;
font-size: 20px;
font-weight: 500;
line-height: 24px;
text-align: left;
color: #8E8E93;
}
td  div{
font-family: Roboto;
font-size: 16px;
font-weight: 700;
line-height: 24px;
letter-spacing: 0.15000000596046448px;
text-align: left;
color:black
}
td{
font-family: Roboto;
font-size: 14px;
font-weight: 400;
line-height: 20px;
letter-spacing: 0.25px;
text-align: left;
color: #6E798C;
}
td p{
font-size: 10px;
font-weight: 500;
line-height: 16px;
letter-spacing: 1.5px;
text-align: left;
color: #8E8E93;
}

.name{
font-family: Roboto;
font-size: 14px;
font-weight: 400;
line-height: 20px;
letter-spacing: 0.25px;
text-align: left;
color: #6E798C;
}

</style>



