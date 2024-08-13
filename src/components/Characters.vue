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
            :items="['human','humanoid','alien','robot','beast']"
            variant="outlined"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
            label="Compact"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
            label="Compact"
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

const nameInput:string = ref('');
const characters:array = ref([]);
const URL:string = ref('https://rickandmortyapi.com/api/character')
const species:string = ref('');

const fetchCharacters = async () => {
  try {
    const response = await axios.get(URL.value); 
    characters.value = response.data.results; 
    console.log(characters.value)
  } catch (error) {
    console.error('Error fetching characters:', error); 
  }
};

onMounted(() => {
  fetchCharacters();
  
});

watch(nameInput,()=>{
  URL.value = 'https://rickandmortyapi.com/api/character'+'?name='+nameInput.value
  fetchCharacters();
})
watch(species,()=> {
  if (species == 'clear'){URL.value = 'https://rickandmortyapi.com/api/character'}
  else{URL.value = 'https://rickandmortyapi.com/api/character'+'?species='+species.value
  }
  fetchCharacters();
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
