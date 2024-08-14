<template>
  <div class="wrapper">
    <img src="../assets/PngItem_438051 1.svg" alt = "Rick and Morty logo"></img>
  </div>
  <main v-if="loading">
      <LoadingImgage />
  </main>
  <main v-else>
    <v-container>
      <v-row >
         <v-col cols="3">
          <v-text-field placeholder="Filtered by name"
          prepend-inner-icon="mdi-magnify"
          v-model="name"
          rounded="lg" 
          variant="outlined"
          ></v-text-field>
        
         </v-col >
         <v-col cols="3">
          <v-select
            placeholder="Species"
            label="Species"
            :items="['human','humanoid','alien','robot','beast','unknown']"
            variant="outlined"
            :clearable=true
            v-model="species"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
            label="Gender"
            placeholder="Gender"
            :items="['Male','Female','Genderless','unknown']"
            variant="outlined"
            :clearable=true
            v-model="gender"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
            label="Status"
            placeholder="Status"
            :items="['alive', 'dead','unknown']"
            variant="outlined"
            :clearable=true
            v-model="status"
            ></v-select>
          </v-col>
      </v-row>
      <v-row v-if="!errorMessage">
        <v-col v-for="character in characters" :key="character.id"  cols="3">
            <v-card :key="character.name" width="240px" height="244px" elevation="5">
              
              <v-img :src="character.image" height="167px" cover>
              </v-img>
              <v-card-title>
                {{ character.name }}
              </v-card-title>
              <v-card-subtitle>
                {{ character.species }}
              </v-card-subtitle>
          </v-card>
        </v-col>

      </v-row>
      <div v-else class="container">
        <p>{{ errorMessage }}</p>
      </div>
          
        
    </v-container>
    
  </main>
  
  
</template>

<script setup lang="ts">
  import {ref, onMounted, watch} from 'vue'
  import axios, { AxiosError } from 'axios';
import LoadingImgage from './LoadingImgage.vue';
type Character = {
  id:number
  name:string
  status:string
  species:string
  type:string	
  gender:string
  location:	object
  image: string 
  episode: []
  url:string
  created:	string
}

const name = ref<string | null>('');
const characters = ref<Character[]>([]);
const species = ref<string | null>(null);
const gender = ref<string | null>(null);
const status = ref<string | null>(null);
const URL = "https://rickandmortyapi.com/api/character";
const errorMessage = ref<string | null>(null);;
const loading = ref<boolean>(true);


const fetchCharacters = async () => {
  try {
    const response = await axios.get(`${URL}?name=${name.value}&species=${species.value || ''}&gender=${gender.value || ''}&status=${status.value || ''}`);
    characters.value = response.data.results || [];
    setTimeout(()=>loading.value = false,300)
    errorMessage.value = ''; 
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 404) {
        errorMessage.value = 'No characters found for the selected filters.';
      } else {
        errorMessage.value = 'An error occurred. Please try again later.';
      }
    } else {
      // Обработка других типов ошибок
      errorMessage.value = 'An unexpected error occurred.';
    }
  }
};




onMounted(() => {
  fetchCharacters();
  
});
watch(name,fetchCharacters)
watch([species, gender, status], ()=>{
  loading.value=true;
  fetchCharacters();
});
</script>


<style scoped>
 .img-wrapper{
  width:100vw;
  display:flex;
  justify-content: center;
 }
 img{
  width: 600px;
  height: 200px;
  margin-top:26px;
  }
  
  
</style>
