<template>
  <v-row>
    <v-col class="d-flex justify-center align-center" cols="12">
      <v-img
        :src="rickAndMortySpin"
        alt="Rick and Morty logo"
        class="d-flex justify-center align-center mt-16 pt-8"
        max-width="326px"
      ></v-img>
    </v-col>
  </v-row>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="4">
        <v-text-field
          placeholder="Filtered by name"
          prepend-inner-icon="mdi-magnify"
          v-model="locationsStore.filters.name"
          rounded="lg"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="3" class="d-none d-md-flex">
        <v-select
          placeholder="Type"
          label="Type"
          :items="typeList"
          variant="outlined"
          :clearable="true"
          v-model="locationsStore.filters.type"
        ></v-select>
      </v-col>
      <v-col cols="3" class="d-none d-md-flex">
        <v-select
          label="Dimension"
          placeholder="Dimension"
          :items="dimensionList"
          variant="outlined"
          :clearable="true"
          v-model="locationsStore.filters.dimensions"
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="d-sm-none">
      <v-col>
        <v-overlay v-model="isToggleMenu"></v-overlay>
        <v-menu
          v-model="isToggleMenu"
          :close-on-content-click="false"
          location="center"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              size="large"
              block
              class="bg-blue-lighten-5 text-blue"
              v-bind="props"
              prepend-icon="mdi-filter-variant"
            >
              Advansed filters
            </v-btn>
          </template>
          <v-container>
            <v-sheet class="px-2 py-8">
              <v-row>
                <v-col>
                  <p class="texh-h4 font-weight-bold">Filters</p>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="d-flex justify-end">
                  <v-icon
                    icon="mdi-close"
                    color="grey"
                    @click="isToggleMenu = false"
                  >
                  </v-icon>
                </v-col>
              </v-row>
              <v-select
                min-width="75vw"
                placeholder="Type"
                rounded="lg"
                label="Type"
                :items="typeList"
                variant="outlined"
                :clearable="true"
                v-model="selectedType"
              ></v-select>
              <v-select
                min-width="75vw"
                label="Dimension"
                rounded="lg"
                placeholder="Dimension"
                :items="dimensionList"
                variant="outlined"
                :clearable="true"
                v-model="selectedDimension"
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
  <main v-if="locationsStore.isLoading">
    <LoadingImage />
  </main>
  <main v-else>
    <v-container>
      <v-row v-if="!locationsStore.errorMessage">
        <v-col
          v-for="location in locationsStore.locationsList"
          :key="location.id"
          cols="12"
          md="3"
        >
          <v-card
            :key="location.name"
            elevation="5"
            :to="{ path: `/location-details/${location.id}` }"
            class="d-flex flex-column justify-center align-center py-12 bg-surface-light"
            style="white-space: normal"
          >
            <v-card-title
              class="pb-0 text-h6 text-center"
              style="white-space: normal"
            >
              {{ location.name }}
            </v-card-title>
            <p class="text-caption text-grey text-uppercase px-4">
              {{ location.type }}
            </p>
          </v-card>
        </v-col>
      </v-row>
      <v-container class="d-flex justify-center align-center">
        <p class="text-h6 text bold">{{ locationsStore.errorMessage }}</p>
      </v-container>
    </v-container>
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
          <p v-else class="text-h6 text bold">Nothing to load</p>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import rickAndMortySpin from "@/assets/rickAndMortySpin.svg";
import { typeList, dimensionList } from "@/constatnts/locations";
import LoadingImage from "@/components/LoadingImage.vue";
import { useLocationsStore } from "@/stores/location";
import { debounce } from "vue-debounce";

const locationsStore = useLocationsStore();
const isToggleMenu = ref(false);
const selectedType = ref("");
const selectedDimension = ref("");

const applyFilters = function () {
  locationsStore.filters.type = selectedType.value;
  locationsStore.filters.dimensions = selectedDimension.value;
  isToggleMenu.value = !isToggleMenu.value;
};
const locationInputDebounce = debounce(() => {
  locationsStore.getAllLocations();
}, 700);

onMounted(() => {
  locationsStore.getAllLocations();
});

watch(
  () => locationsStore.filters.name,
  () => {
    locationInputDebounce();
  },
);
watch(
  () => [locationsStore.filters.type, locationsStore.filters.dimensions],
  () => {
    locationsStore.getAllLocations();
  },
);

const loadMoreItems = () => {
  locationsStore.pagination.page += 1;
  locationsStore.loadMoreLocations();
};
</script>
