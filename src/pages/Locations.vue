<template>
    <v-container class="d-flex justify-center align-center">
      <v-row>
        <v-col class="d-flex justify-center align-center" cols="12">
          <v-img
            :src="rickAndMortySpin"
            alt="Rick and Morty logo"
            class="d-flex justify-center align-center mt-14"
            max-width="326px"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
        <v-row>
            <v-col cols="12" md="3">
                <v-text-field
                placeholder="Filtered by name"
                prepend-inner-icon="mdi-magnify"
                v-model="LocationsStore.name"
                rounded="lg"
                variant="outlined"
                ></v-text-field>
            </v-col>
                <v-container>
                    <v-col cols="12" md="3">
                        <v-select
                        placeholder="Type"
                        label="Type"
                        :items="typeList"
                        variant="outlined"
                        :clearable="true"
                        v-model="locationsStore.type"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-select
                        label="Dimension"
                        placeholder="Dimension"
                        :items="dimensionList"
                        variant="outlined"
                        :clearable="true"
                        v-model="locationsStore.dimension"
                        ></v-select>
                    </v-col>
                </v-container>
            </v-row>
    <main v-if="locationsStore.isLoading">
      <LoadingImage />
    </main>
    <main v-else>
        <v-row v-if="!locationsStore.errorMessage">
          <v-col
            v-for="location in locationsStore.locationsList"
            :key="location.id"
            cols="12"
            md="3"
          >
          <v-card :key="location.name" elevation="5" :to="{ path:`/location-details/${location.id}` }" class="d-flex flex-column justify-center align-center py-12 bg-surface-light ">
                    <v-card-title class="pb-0 text-h6" >
                      {{ location.name }}
                    </v-card-title> 
                    <p class="text-caption text-grey text-uppercase px-4">{{ location.type }}</p>
                  </v-card>
          </v-col>
        </v-row>
        <div v-else class="container">
          <p>{{ locationsStore.errorMessage }}</p>
        </div>
      <v-container>
        <v-row class="d-flex align-center justify-center">
          <v-col class="text-center" cols="12">
            <v-btn
              v-if="locationsStore.canLoadMore"
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
  import rickAndMortySpin from '@/assets/rickAndMortySpin.svg'
  import { typeList, dimensionList} from "@/constatnts/constants";
  import LoadingImage from "../components/LoadingImage.vue";
  import { useCharactersStore } from "@/stores/app";
  
  const charactersStore = useCharactersStore();
  
  
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
  
  <style scoped>
  .img-wrapper {
    width: 100vw;
    display: flex;
    justify-content: center;
  }
  img {
    width: 600px;
    height: 200px;
    margin-top: 1000px;
  }
  </style>
  