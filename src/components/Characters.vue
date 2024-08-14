<template>
  <div class="img-wrapper">
    <img src="../assets/PngItem_438051 1.svg" alt = "Rick and Morty logo"></img>
  </div>

  <main>
    <v-container>
      <v-row >
         <v-col cols="3">
          <v-text-field placeholder="Filtered by name" prepend-inner-icon="mdi-magnify" v-model="nameInput" 
          rounded="lg" variant="outlined"></v-text-field>
        
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
      <v-row>
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
          
        
    </v-container>
    
  </main>
  
  
</template>

<script setup lang="ts">
  import {ref, onMounted} from 'vue'
  import axios from 'axios';

const nameInput = ref('');
const characters = ref([]);
const URL = ref('https://rickandmortyapi.com/api/character')
const species = ref('');
const gender = ref('');
const status = ref('')

const fetchCharacters = async () => {
  try {
    const response = await axios.get(URL.value); 
    characters.value = response.data.results; 
  } catch (error) {
    console.error('Error fetching characters:', error); 
  }
};

onMounted(() => {
  fetchCharacters();
  
});

watch(nameInput,()=>{
  URL.value = 'https://rickandmortyapi.com/api/character'+'?name='+nameInput.value;
  fetchCharacters();
})
watch(species,()=> {
  if(species.value == ''||species.value == null){
    URL.value = 'https://rickandmortyapi.com/api/character';
    fetchCharacters();
  }else{
    URL.value = 'https://rickandmortyapi.com/api/character'+'?species='+species.value
  fetchCharacters();
  }
})
watch(gender,()=> {
  if(gender.value == ''||gender.value == null){
    URL.value = 'https://rickandmortyapi.com/api/character';
    fetchCharacters();
  }else{
     URL.value = 'https://rickandmortyapi.com/api/character'+'?gender='+gender.value
  fetchCharacters();
  }
})
watch(status,()=> {
  if(status.value == ''||status.value == null){
    URL.value = 'https://rickandmortyapi.com/api/character';
    fetchCharacters();
  }else{
    URL.value = 'https://rickandmortyapi.com/api/character'+'?status='+status.value
  fetchCharacters();
  }
})
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
