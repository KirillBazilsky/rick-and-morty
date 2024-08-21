<template>
  <v-container class="d-flex justify-center align-center">
    <v-row>
      <v-col class="d-flex justify-center align-center" cols="12">
        <v-img
          :src="pngLogoBig"
          alt="Rick and Morty logo"
          class="d-flex justify-center align-center mt-14"
          max-width="500px"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
  <main>
    <v-container>
      <v-row>
        <v-col cols="12" sm="3">
          <v-text-field
            placeholder="Filtered by name"
            prepend-inner-icon="mdi-magnify"
            v-model="charactersStore.name"
            rounded="lg"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col class="d-none d-sm-flex">
          <v-select
            placeholder="Species"
            rounded="lg"
            label="Species"
            :items="speciesList"
            variant="outlined"
            :clearable="true"
            v-model="charactersStore.species"
          ></v-select>
        </v-col>
        <v-col class="d-none d-sm-flex">
          <v-select
            label="Gender"
            rounded="lg"
            placeholder="Gender"
            :items="genderList"
            variant="outlined"
            :clearable="true"
            v-model="charactersStore.gender"
          ></v-select>
          </v-col>
          <v-col class="d-none d-sm-flex">
          <v-select
            label="Status"
            rounded="lg"
            placeholder="Status"
            :items="statusList"
            variant="outlined"
            :clearable="true"
            v-model="charactersStore.status"
          ></v-select>
          </v-col>
        </v-row>
        <v-row class="d-sm-none">
          <v-col>
            <v-menu 
                v-model="charactersStore.menu"
                :close-on-content-click="false"
                location="center">
                <template v-slot:activator="{ props }">
                  <v-btn size="large" block class="bg-blue-lighten-5 text-blue" v-bind="props" prepend-icon="mdi-filter-variant" >
                    Advansed filters
                  </v-btn>
                </template>
                <v-container>
                  
                  <v-sheet class="pa-8">
                    <v-row>
                    <v-col>
                      <p class="texh-h4 font-weight-bold">Filters</p>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex justify-end">
                      <v-icon icon="mdi-close" color="grey" @click = "charactersStore.menu = false">
                      </v-icon>
                    </v-col>
                  </v-row>
                  <v-select min-width="75vw"
                    placeholder="Species"
                    rounded="lg"
                    label="Species"
                    :items="speciesList"
                    variant="outlined"
                    :clearable="true"
                    v-model="tempSpecies"
                  ></v-select>
                  <v-select min-width="75vw"
                    label="Gender"
                    rounded="lg"
                    placeholder="Gender"
                    :items="genderList"
                    variant="outlined"
                    :clearable="true"
                    v-model="tempGender"
                  ></v-select>
                  <v-select min-width="75vw"
                    label="Status"
                    rounded="lg"
                    placeholder="Status"
                    :items="statusList"
                    variant="outlined"
                    :clearable="true"
                    v-model="tempStatus"
                  ></v-select>
                  <v-btn
                  class="bg-blue-lighten-5 text-blue"
                  block
                  @click="applyFilters"
                  >
                  Apply
                  </v-btn>
                </v-sheet>
                </v-container>
              </v-menu>
          </v-col>
              
          
        </v-row>
      </v-container>
      <v-container v-if="charactersStore.isLoading">
        <LoadingImage />
      </v-container>
      <v-container v-else-if="!charactersStore.errorMessage">
        <v-row >
                <v-col
                  v-for="character in charactersStore.characters"
                  :key="character.id"
                  cols="12"
                  sm="3"
                >
                  <v-card :key="character.name" elevation="5" :to="{ path:`/character-details/${character.id}` }" class="p-6">
                    <v-img :src="character.image" height="167px" cover> </v-img>
                    <v-card-title class="pb-0">
                      {{ character.name }}
                    </v-card-title>
                    <v-card-subtitle class="pt-0 pb-4">
                      {{ character.species }}
                    </v-card-subtitle>
                  </v-card>
                </v-col>
        </v-row>
      </v-container>
      <v-container v-else class="d-flex justify-center align-center" style="height:45vh">
          <p>{{ charactersStore.errorMessage }}</p>
      </v-container>
    <v-container>
      <v-row class="d-flex align-center justify-center">
        <v-col class="text-center" cols="12">
          <v-btn
            v-if="charactersStore.canLoadMore"
            variant="text"
            elevation="16"
            class="text-h6"
            @click="loadMoreItems"
            color="blue"
            >LOAD MORE
          </v-btn>
          <p v-else> Nobody to load</p>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script setup lang="ts">
import { onMounted, watch, ref} from "vue";
import pngLogoBig from '@/assets/PngLogoBig.svg'
import { speciesList,genderList,statusList } from "@/constatnts/constants";
import LoadingImage from "../components/LoadingImage.vue";
import { useCharactersStore } from "@/stores/app";

const charactersStore = useCharactersStore();

const tempSpecies = ref('');
let tempGender = ref('');
let tempStatus = ref('');

const applyFilters = function(){
  charactersStore.species = tempSpecies.value;
  charactersStore.gender = tempGender.value;
  charactersStore.status = tempStatus.value;
  charactersStore.menu = false;
}

onMounted(() => {
  charactersStore.fetchCharacters();
});

watch(() => charactersStore.name, 
      () => {setTimeout(()=>charactersStore.fetchCharacters(),300)
         
      }
    );
watch(() => [charactersStore.species,charactersStore.gender,charactersStore.status], 
      () => {
        charactersStore.fetchCharacters(); 
      }
    );


const loadMoreItems = () => {
  charactersStore.page += 1;
  charactersStore.updatePage();
};
</script>

