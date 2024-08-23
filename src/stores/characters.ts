import { defineStore } from "pinia";
import CharactersApi from "@/api/characters/CharactersApi";
import { ICharacter } from "@/api/characters/ICharactersApi";
import { IEpisode } from "@/api/episodes/IEpisodesApi";
import { AxiosError } from "axios";
import { getId, splitString } from "@/api/IdGetterApi";
import EpisodesApi from "@/api/episodes/EpisodesApi";

export const useCharactersStore = defineStore("characters", {
  state: () => ({
    menu: false as boolean,
    name: "" as string,
    characters: [] as ICharacter[],
    species: undefined as string | undefined,
    status: undefined as string | undefined,
    gender: undefined as string | undefined,
    errorMessage: "" as string | null,
    isLoading: false as boolean,
    canLoadMore: true as boolean,
    page: 1 as number,
    characterInfo: undefined as ICharacter | undefined,
    episodesList: [] as IEpisode[] | undefined,
    locationId: undefined as string | undefined,
    charactersApi: new CharactersApi(),
    episodesApi: new EpisodesApi()
  }),
  getters: {
    watch: (state) => state.name,
  },
  actions: {
    async getAllCharacters() {
      try {
        this.page = 1;
        this.isLoading = true;
        const data = await this.charactersApi.getAllCharacters(
          this.name,
          this.species,
          this.gender,
          this.status,
        );
        this.characters = data.results;
        this.errorMessage = "";
        if (data.info.pages == this.page) {
          this.canLoadMore = false;
        } else {
          this.canLoadMore = true;
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.status === 404) {
            this.canLoadMore = false;
            this.errorMessage = "No characters found for the selected filters.";
          } else {
            this.errorMessage = "An error occurred. Please try again later.";
          }
        }
      } finally {
        this.isLoading = false;
      }
    },
    async loadMoreCharacters() {
      try {
        this.isLoading = true;
        const data = await this.charactersApi.getAllCharacters(
          this.name,
          this.species,
          this.gender,
          this.status,
          this.page,
        );
        const newCharacters = data.results;

        this.characters.push(...newCharacters);

        if (data.info.pages == this.page) {
          this.canLoadMore = false;
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.status === 404) {
            this.canLoadMore = false;
          } else {
            this.errorMessage = "An error occurred. Please try again later.";
          }
        }
      } finally {
        this.isLoading = false;
      }
    },
    async getSingleCharacter(id: string) {
      try {
        this.isLoading = true;
        this.characterInfo = undefined;
        this.page = 1;
        this.episodesList = [];

        this.characterInfo = await this.charactersApi.getSingleCharacter(id);
        if (this.characterInfo) {
          const episodesUrl: string[] = getId(this.characterInfo.episode);
          const episodes:IEpisode[]|IEpisode = await this.episodesApi.getMultiplyEpisodes(episodesUrl);
          if (Array.isArray(episodes) && episodes.length) {
            this.episodesList = episodes;
          } else {
            this.episodesList.push(episodes); 
          }
          this.locationId = splitString(this.characterInfo?.location.url);
        }
      } catch (error) {
        console.error("Failed to fetch episode info:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
