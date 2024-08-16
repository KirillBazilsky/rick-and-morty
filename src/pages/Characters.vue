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

  <main v-if="isLoading">
    <LoadingImgage />
  </main>
  <main v-else>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            placeholder="Filtered by name"
            prepend-inner-icon="mdi-magnify"
            v-model="name"
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
            v-model="species"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            label="Gender"
            placeholder="Gender"
            :items="genderList"
            variant="outlined"
            :clearable="true"
            v-model="gender"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            label="Status"
            placeholder="Status"
            :items="statusList"
            variant="outlined"
            :clearable="true"
            v-model="status"
          ></v-select>
        </v-col>
      </v-row>
      <v-row v-if="!errorMessage">
        <v-col
          v-for="character in characters"
          :key="character.id"
          cols="12"
          md="3"
        >
          <v-card :key="character.name" elevation="5" :to="{ name: 'CharacterDetail', params: { id: character.id } } as {}">
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
        <p>{{ errorMessage }}</p>
      </div>
    </v-container>
    <v-container>
      <v-row class="d-flex align-center justify-center">
        <v-col class="text-center" cols="12">
          <v-btn
            v-if="canLoadMore"
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
import { ref, onMounted, watch } from "vue";
import pngLogoBig from '../src/assets/PngItem_438051 1.svg'
import { speciesList,genderList,statusList } from "@/constatnts/constants";
import CharactersApi from "../api/charactersApi";
import LoadingImgage from "../components/LoadingImgage.vue";

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  location: object;
  image: string;
  episode: [];
  url: string;
  created: string;
};

const name = ref<string | undefined>("");
const characters = ref<Character[]>([]);
const species = ref<string | undefined>("");
const gender = ref<string | undefined>("");
const status = ref<string | undefined>("");
const errorMessage = ref<string | null>(null);
const canLoadMore = ref<boolean>(true)
const isLoading = ref<boolean>(true);
const page = ref<number>(1);

const fetchCharacters = async () => {
  
  try {
    isLoading.value = true;
    characters.value = await CharactersApi.getItems(
      name.value,
      species.value,
      gender.value,
      status.value,
    );
    if (characters.value.length < 20){
      canLoadMore.value = false
    }else{
      canLoadMore.value = true
    }
    errorMessage.value = "";
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      errorMessage.value = "No characters found for the selected filters.";
    } else {
      errorMessage.value = "An error occurred. Please try again later.";
    }
  } finally {
    setTimeout(() => (isLoading.value = false), 300);
  }
};

const updatePage = async () => {
  try {
    const newCharacters = await CharactersApi.getItems(
      name.value,
      species.value,
      gender.value,
      status.value,
      page.value,
    );
    
    characters.value.push(...newCharacters);

    if(newCharacters.length < 20){
      canLoadMore.value = false
    }
    
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      canLoadMore.value = false;
    } else {
      errorMessage.value = "An error occurred. Please try again later.";
    }
  } finally {
    setTimeout(() => (isLoading.value = false), 300);
  }
};
onMounted(() => {
  fetchCharacters();
});

watch([name,species, gender, status], () => {
 
  fetchCharacters();
});


const loadMoreItems = () => {
  page.value += 1;
  updatePage();
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
