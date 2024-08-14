<template>
  <v-container class="d-flex justify-center align-center">
    <v-row>
      <v-col class="d-flex justify-center align-center" cols="12">
        <v-img src="../assets/PngItem_438051 1.svg" alt = "Rick and Morty logo" class="d-flex justify-center align-center mt-14" max-width="500px"></v-img>
      </v-col>
    </v-row>
  </v-container>
  
  <main v-if="isLoading">
      <LoadingImgage />
  </main>
  <main v-else>
    <v-container>
      <v-row >
         <v-col cols="12" md="3">
          <v-text-field placeholder="Filtered by name"
          prepend-inner-icon="mdi-magnify"
          v-model="name"
          rounded="lg" 
          variant="outlined"
          ></v-text-field>
        
         </v-col >
         <v-col cols="12" md="3">
          <v-select
            placeholder="Species"
            label="Species"
            :items="speciesArr"
            variant="outlined"
            :clearable=true
            v-model="species"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
            label="Gender"
            placeholder="Gender"
            :items="genderArr"
            variant="outlined"
            :clearable=true
            v-model="gender"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
            label="Status"
            placeholder="Status"
            :items="statusArr"
            variant="outlined"
            :clearable=true
            v-model="status"
            ></v-select>
          </v-col>
      </v-row>
      <v-row v-if="!errorMessage">
        <v-col v-for="character in characters" :key="character.id"  cols="12" md="3">
            <v-card :key="character.name"  elevation="5">
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
    <v-container>
      <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <v-btn
          variant="text"
          elevation="16"
          class="text-h6"
          @click="loadMoreItems"
          color="blue"
          >LOAD MORE
        </v-btn>
      </v-col>
    </v-row>
    </v-container>

    
    
    
  </main>
</template>

<script setup lang="ts">
  import {ref, onMounted, watch} from 'vue'
  
  import CharactersApi from '../api/charactersApi'
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
const errorMessage = ref<string | null>(null);;
const isLoading = ref<boolean>(true);
const speciesArr = <string[]>['human','humanoid','alien','robot','beast','unknown']
const genderArr = <string[]>['Male','Female','Genderless','unknown']
const statusArr = <string[]>['alive', 'dead','unknown']
const pageSize = ref<number>(8)
const page = ref<number>(1)


const fetchCharacters = async () => {
  try {
    const getDataInstance = new CharactersApi(); 
    characters.value = await getDataInstance.getItems(name.value, species.value, gender.value, status.value); 
    errorMessage.value = ''; 
  } catch (error:any) {
    if (error.response && error.response.status === 404) {
      errorMessage.value = 'No characters found for the selected filters.';
    } else {
      errorMessage.value = 'An error occurred. Please try again later.';
    }
  } finally {
   setTimeout(() => isLoading.value = false, 300);
  }
};

const updatePage = async () => {
      try{
      const getDataInstance = new CharactersApi(); 
    const newCharacters = await getDataInstance.updateItems(name.value, species.value, gender.value, status.value,page.value)
    characters.value.push(...newCharacters)
    errorMessage.value = ''; 
    }
    catch (error:any) {
    if (error.response && error.response.status === 404) {
      errorMessage.value = 'No characters to load';
    } else {
      errorMessage.value = 'An error occurred. Please try again later.';
    }
  } finally {
   setTimeout(() => isLoading.value = false, 300);
  }
}
onMounted(() => {
  fetchCharacters();
});
watch(name,fetchCharacters)
watch([species, gender, status], ()=>{
  isLoading.value=true;
  fetchCharacters();
});
watch(pageSize,()=>console.log(pageSize))

const loadMoreItems = () => {
    page.value += 1
    updatePage()

}

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
  margin-top:1000px;
  }
  
  
</style>
