import { defineStore } from "pinia";
import CharactersApi from "@/api/characters/charactersApi"
import { Character } from "@/api/characters/ICharactersApi";
import {Episode} from "@/api/episodes/IEpisodesApi"
import { AxiosError } from "axios";


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
    name: "" as string,
    characters: [] as Character[],
    species: undefined as string | undefined,
    status: undefined as string | undefined,
    gender: undefined as string | undefined,
    errorMessage: "" as string | null,
    isLoading: false as boolean,
    canLoadMore: true as boolean,
    page: 1 as number,
    characterInfo: undefined as Character | undefined,
    episodesList: [] as Episode[] | undefined,
}),
  getters:{
    watch: (state) => state.name
  },
  actions: {
    async fetchCharacters() {
      
      try {
          this.isLoading = true;
          const data =  await CharactersApi.getItems(
          this.name,
          this.species,
          this.gender,
          this.status,
      );
          this.characters = data.results
          this.errorMessage = "";
          this.page = 1;
          if(data.info.pages == this.page){
            this.canLoadMore = false
          }else{
            this.canLoadMore = true
          }
      } catch (error:unknown) {
        if (error instanceof AxiosError) { 
            if (error.response && error.response.status === 404) {
                this.errorMessage = "No characters found for the selected filters.";
              } else {
                this.errorMessage = "An error occurred. Please try again later.";
              }
      } 
      } finally {
       this.isLoading = false
      }
    },
    async updatePage () {
      
      try {
        const data =  await CharactersApi.getItems(
        this.name,
        this.species,
        this.gender,
        this.status,
        this.page,
      );
        const newCharacters = data.results
        
        this.characters.push(...newCharacters);
    
        if(data.info.pages == this.page){
          this.canLoadMore = false
        }
        
      } catch (error: unknown) {
        if(error instanceof AxiosError){
          if (error.response && error.response.status === 404) {
          this.canLoadMore = false;
        } else {
          this.errorMessage = "An error occurred. Please try again later.";
        }
         } 
        }finally {
         this.isLoading = false
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
