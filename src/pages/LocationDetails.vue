<template>
  <v-main>
    <v-main v-if="!locationsStore.isLoading && !locationsStore.errorMessage">
      <v-container>
        <v-row>
          <v-col class="d-flex justify-right align-center">
            <router-link
              to="characters"
              class="link text-h6 d-flex align-center"
              @click="goBack"
            >
              <v-icon icon="mdi-arrow-left"></v-icon>
              GO BACK
            </router-link>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center">
            <h1 class="text-h3">{{ locationsStore.locationInfo?.name }}</h1>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col cols="6" md="3" class="d-flex justify-center align-top">
            <v-table style="width: 100%">
              <tr>
                <td>
                  <div class="text-subtitle-1 text-black font-weight-bold mt-2">
                    Type
                  </div>
                  <p class="text-subtitle-2 text-grey mb-2">
                    {{ locationsStore.locationInfo?.type }}
                  </p>
                </td>
              </tr>
            </v-table>
          </v-col>
          <v-col cols="6" md="3" class="d-flex justify-center align-top">
            <v-table style="width: 100%">
              <tr>
                <td>
                  <div class="text-subtitle-1 text-black font-weight-bold mt-2">
                    Dimension
                  </div>
                  <p class="text-subtitle-2 text-grey mb-2">
                    {{ locationsStore.locationInfo?.dimension }}
                  </p>
                </td>
              </tr>
            </v-table>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <p class="text-h6 text-grey">Residents</p>
        <v-row
          v-if="!locationsStore.errorMessage && locationsStore.charactersList"
        >
          <v-col
            v-for="character in locationsStore.charactersList"
            :key="character.id"
            cols="12"
            md="3"
          >
            <CharacterCard
              :name="character.name"
              :image="character.image"
              :species="character.species"
              :id="character.id"
            />
          </v-col>
        </v-row>
        <v-row v-if="!locationsStore.charactersList">
          <v-container class="d-flex justify-center align-center">
            <p class="text-h6 text-bold">Not found</p>
          </v-container>
        </v-row>
      </v-container>
    </v-main>
    <v-main v-if="locationsStore.isLoading && !locationsStore.errorMessage">
      <LoadingImage />
    </v-main>
    <v-main
      v-else-if="!locationsStore.isLoading && locationsStore.errorMessage"
    >
      <v-container
        class="d-flex justify-center align-center"
        style="height: 75vw"
      >
        <p>{{ locationsStore.errorMessage }}</p>
      </v-container>
    </v-main>
  </v-main>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useLocationsStore } from "@/stores/location";
import LoadingImage from "../components/LoadingImage.vue";
import { IRouteParams } from "./CharacterDetails.vue";

const locationsStore = useLocationsStore();

const route: any = useRoute();
const router = useRouter();

onMounted(() => {
  const params = route.params as IRouteParams;
  const locationId = params.id;

  locationsStore.getSingleLocation(locationId);
});

const goBack = () => {
  router.back();
};
</script>
