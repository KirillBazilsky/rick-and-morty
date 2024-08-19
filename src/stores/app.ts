import { defineStore } from "pinia";
import CharactersApi from "@/api/characters/charactersApi"
import { Character } from "@/api/characters/ICharactersApi";
import {Episode} from "@/api/episodes/IEpisodesApi"


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
    canLoadMore: <boolean>true,
    page:<number>(1),
    characterInfo:<Character | undefined>(undefined),
    episodesList: <Episode[] | undefined>([]),
    origin:<{}>{},
    
  }),
  getters:{
    watch: (state) => state.name
  },
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
    },
    async updatePage () {
      try {
        const newCharacters = await CharactersApi.getItems(
          this.name,
          this.species,
          this.gender,
          this.status,
          this.page,
        );
        
        this.characters.push(...newCharacters);
    
        if(newCharacters.length < 10){
          this.canLoadMore= false
        }
        
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          this.canLoadMore = false;
        } else {
          this.errorMessage = "An error occurred. Please try again later.";
        }
      } finally {
        setTimeout(() => ( this.isLoading = false), 300);
      }
    },
    async fetchCharacterInfo(id: string){
      try {
          this.characterInfo = await CharactersApi.getCharacterInfo(id);
          this.characterInfo?.episode.forEach(async episode => {
              const episodeInfo = await CharactersApi.getEpisodeInfo(episode)
              this.episodesList?.push(episodeInfo)
          })
      } catch (error) {
          console.error('Failed to fetch character info:', error);
          
      }
  } 
  },
});
