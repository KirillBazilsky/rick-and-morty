import { defineStore } from "pinia";
import CharactersApi from "@/api/characters/charactersApi"
import { Character } from "@/pages/Characters.vue";


export const useAppStore = defineStore("app", {
  state: () => ({
    isToggleMenu:<boolean>false
  }),
  
  actions: {
    toggleMenu() {
      this.isToggleMenu = !this.isToggleMenu; 
    },
  },
});

export const useCharactersStore = defineStore("characters", {
  state: () => ({
    name:"",
    characters: <Character[]>[],
    species:<string | undefined>"",
    status: <string | undefined>"",
    gender:<string | undefined>"",
    errorMessage: <string | null>null,
    isLoading: <boolean>true,
  }),
  
  actions: {
    async fetchCharacters() {
      try {
          this.isLoading = true;
          this.characters = await CharactersApi.getItems(
          this.name,
          this.species,
          this.gender,
          this.status,
        );
        
        this.errorMessage = "";
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          this.errorMessage = "No characters found for the selected filters.";
        } else {
          this.errorMessage = "An error occurred. Please try again later.";
        }
      } finally {
        setTimeout(() => (this.isLoading = false), 300);
      }
    }
  },
});
