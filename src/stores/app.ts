import { defineStore } from "pinia";
import CharactersApi from "@/api/characters/charactersApi"
import { Character } from "@/api/characters/ICharactersApi";
import {Episode} from "@/api/episodes/IEpisodesApi"
import EpisodesApi from "@/api/episodes/episodes";
import { AxiosError } from "axios";
import LocationsApi from "@/api/locations/locationsApi";
import Location from "@/api/locations/ILocationsApi";


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
    episodesUrl:[] as string[],
    episodesList: [] as Episode[] | undefined,
    locationId:undefined as string | undefined
}),
  getters:{
    watch: (state) => state.name
  },
  actions: {
    async fetchCharacters() {
          
      try {
          this.page = 1;
          this.isLoading = true;
          const data =  await CharactersApi.getItems(
          this.name,
          this.species,
          this.gender,
          this.status,
      );
          this.characters = data.results
          this.errorMessage = "";
          if(data.info.pages == this.page){
            this.canLoadMore = false
          }else{
            this.canLoadMore = true
          }
      } catch (error:unknown) {
        if (error instanceof AxiosError) { 
            if (error.response && error.response.status === 404) {
                this.canLoadMore = false
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
        this.isLoading = true;
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
        
    }, async fetchCharacterInfo(id: string){
    try {
        this.isLoading = true;
        this.characterInfo = undefined;
        this.page = 1;
        this.episodesList = [];
        this.characterInfo = await CharactersApi.getCharacterInfo(id);
        this.characterInfo?.episode.forEach(async episode => {
          this.episodesUrl.push(episode.split('/')[episode.split('/').length-1])
        })
        const episodes = await EpisodesApi.getEpisodes(this.episodesUrl)
        if(episodes[0]==undefined){
          
          this.episodesList?.push(episodes)
        } else{
         
          this.episodesList = episodes
        }
        this.locationId = this.characterInfo?.location.url.split('/')[this.characterInfo?.location.url.split('/').length-1]
        
    } catch (error) {
        console.error('Failed to fetch episode info:', error);
        
    } finally {
      this.isLoading = false
     }
  },
  
} 
  

  
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
     
        try { 
            this.page = 1;
            this.isLoading = true;
            const data =  await EpisodesApi.fetchEpisodes(this.episode,this.page);
            this.episodesList = data.results
            this.errorMessage = "";
            
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
            this.isLoading = true
            this.charactersList = []
            this.page = 1
            this.episodeInfo = await EpisodesApi.getEpisodeInfo(id);
            this.episodeInfo?.characters.forEach(async character => {
              this.charactersUrl.push(character.split('/')[character.split('/').length-1])
            })
            const characters = await CharactersApi.getCharacters(this.charactersUrl)
            if(characters[0]==undefined){
              
              this.charactersList?.push(characters)
            } else{
             
              this.charactersList = characters
            }
            
        } catch (error) {
            console.error('Failed to fetch episode info:', error);
            
        }finally {
          this.isLoading = false
          }
    } 
    }
    });

    export const useLocationsStore = defineStore("locations", {
      state:() => ({
            name: "" as string,
            type: "" as string,
            dimensions: "" as string,
            errorMessage: "" as string | null,
            isLoading: false as boolean,
            canLoadMore: true as boolean,
            page: 1 as number,
            locationsList: [] as Location[] | undefined,
            charactersList:[] as Character[] |undefined,
            charactersUrl:[] as string[],
            locationInfo: {} as Location | undefined
          }
        ),
    
      actions:{
        async fetchLocations() {
          this.isLoading = true;
            try {this.page = 1;
                const data =  await LocationsApi.fetchLocations(this.name,this.type,this.dimensions,this.page);
                this.locationsList = data.results
                this.errorMessage = "";
                if(data.info.pages == this.page){
                  this.canLoadMore = false
                }else{
                  this.canLoadMore = true
                }
            } catch (error:unknown) {
              if (error instanceof AxiosError) { 
                  if (error.response && error.response.status === 404) {
                      this.errorMessage = "No locations found for the selected filters.";
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
              const data =  await LocationsApi.fetchLocations(this.name,this.type,this.dimensions,this.page);
              const newLocations = data.results
              
              this.locationsList?.push(...newLocations);
          
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
          async fetchLocationInfo(id: string){
            try {
                this.isLoading = true
                this.charactersList = [];
                this.page = 1;
                this.locationInfo = await LocationsApi.getlocationInfo(id);
                this.locationInfo?.residents.forEach(async character => {
                  this.charactersUrl.push(character.split('/')[character.split('/').length-1])
                })
                const characters = await CharactersApi.getCharacters(this.charactersUrl)
                if(characters[0]==undefined){
                  
                  this.charactersList?.push(characters)
                } else{
                 
                  this.charactersList = characters
                }
                
            } catch (error) {
                console.error('Failed to fetch location info:', error);
                
            }finally {
              this.isLoading = false
              }
        } 
        }
        });