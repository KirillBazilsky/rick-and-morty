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

  <main v-if="charactersStore.isLoading">
    <LoadingImgage />
  </main>
  <main v-else>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            placeholder="Filtered by name"
            prepend-inner-icon="mdi-magnify"
            v-model="charactersStore.name"
            rounded="lg"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            placeholder="Species"
            label="Species"
            :items="speciesList"
            variant="outlined"
            :clearable="true"
            v-model="charactersStore.species"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            label="Gender"
            placeholder="Gender"
            :items="genderList"
            variant="outlined"
            :clearable="true"
            v-model="charactersStore.gender"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            label="Status"
            placeholder="Status"
            :items="statusList"
            variant="outlined"
            :clearable="true"
            v-model="charactersStore.status"
          ></v-select>
        </v-col>
      </v-row>
      <v-row v-if="!charactersStore.errorMessage">
        <v-col
          v-for="character in charactersStore.characters"
          :key="character.id"
          cols="12"
          md="3"
        >
          <v-card :key="character.name" elevation="5" :to="{ path:`/character-detail/${character.id}` }">
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
      <div v-else class="container">
        <p>{{ charactersStore.errorMessage }}</p>
      </div>
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
import { onMounted, watch } from "vue";
import pngLogoBig from '@/assets/PngItem_438051 1.svg'
import { speciesList,genderList,statusList } from "@/constatnts/constants";
import LoadingImgage from "../components/LoadingImgage.vue";
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
