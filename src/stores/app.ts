import { defineStore } from "pinia";
import CharactersApi from "@/api/characters/charactersApi"
import { Character } from "@/api/characters/ICharactersApi";
import {Episode} from "@/api/episodes/IEpisodesApi"
import EpisodesApi from "@/api/episodes/episodes";
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

export const useEpisodesStore = defineStore("episodes", {
  state:() => ({
        name: "" as string,
        episode: "" as string,
        errorMessage: "" as string | null,
        isLoading: false as boolean,
        canLoadMore: true as boolean,
        page: 1 as number,
        episodesList: [] as Episode[] | undefined,
        charactersList:[] as Character[] |undefined,
        charactersUrl:[] as string[],
        episodeInfo: {} as Episode | undefined
      }
    ),

  actions:{
    async fetchEpisodes() {
      this.isLoading = true;
        try {
            const data =  await EpisodesApi.fetchEpisodes(this.episode,this.page);
            this.episodesList = data.results
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
                  this.errorMessage = "No episodes found for the selected filters.";
                  this.canLoadMore = false
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
          const data =  await EpisodesApi.fetchEpisodes(this.episode,this.page);
          const newEpisodes = data.results
          
          this.episodesList?.push(...newEpisodes);
      
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
      async fetchEpisodeInfo(id: string){
        try {
            this.episodeInfo = await EpisodesApi.getEpisodeInfo(id);
            this.episodeInfo?.characters.forEach(async character => {
              this.charactersUrl.push(character.split('/')[character.split('/').length-1])
            })
            const characters = await EpisodesApi.getEpisodes(this.charactersUrl)
            if(characters[0]==undefined){
              
              this.charactersList?.push(characters)
            } else{
             
              this.charactersList = characters
            }
            
        } catch (error) {
            console.error('Failed to fetch episode info:', error);
            
        }
    } 
    }
    });