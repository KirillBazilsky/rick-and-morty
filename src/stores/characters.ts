import { defineStore } from "pinia";
import CharactersApi from "@/api/characters/CharactersApi";
import { ICharacter } from "@/api/characters/ICharactersApi";
import { IEpisode } from "@/api/episodes/IEpisodesApi";
import { AxiosError } from "axios";
import EpisodesApi from "@/api/episodes/EpisodesApi";
import { getLastSegment, getUrls } from "@/utils/url/url";

export const useCharactersStore = defineStore("characters", {
  state: () => ({
    filters: {
      name: "" as string,
      species: undefined as string | undefined,
      status: undefined as string | undefined,
      gender: undefined as string | undefined,
    },
    pagination: {
      page: 1 as number,
    },
    characters: [] as ICharacter[],
    errorMessage: "" as string | null,
    isLoading: false as boolean,
    canLoadMore: true as boolean,
    characterInfo: null as ICharacter | null,
    episodesList: [] as IEpisode[] | null,
    locationId: null as string | null,
    charactersApi: new CharactersApi(),
    episodesApi: new EpisodesApi(),
  }),
  getters: {
    watch: (state) => state.filters.name,
  },
  actions: {
    async getAllCharacters() {
      try {
        this.pagination.page = 1;
        this.isLoading = true;
        const data = await this.charactersApi.getAllCharacters(
          this.filters.name,
          this.filters.species,
          this.filters.gender,
          this.filters.status,
        );
        this.characters = data.results;
        this.errorMessage = "";
        if (data.info.pages == this.pagination.page) {
          this.canLoadMore = false;
        } else {
          this.canLoadMore = true;
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const { response } = error;

          if (response?.status === 404) {
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
          this.filters.name,
          this.filters.species,
          this.filters.gender,
          this.filters.status,
          this.pagination.page,
        );
        const newCharacters = data.results;

        this.characters.push(...newCharacters);

        if (data.info.pages == this.pagination.page) {
          this.canLoadMore = false;
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const { response } = error;

          if (response?.status === 404) {
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
        this.characterInfo = null;
        this.pagination.page = 1;
        this.episodesList = [];
        this.characterInfo = await this.charactersApi.getSingleCharacter(id);
        if (this.characterInfo) {
          const episodesUrl: string[] = getUrls(this.characterInfo.episode);
          const episodes: IEpisode[] | IEpisode =
            await this.episodesApi.getMultiplyEpisodes(episodesUrl);

          this.episodesList = Array.isArray(episodes) ? episodes : [episodes];
          this.locationId = getLastSegment(this.characterInfo?.location.url);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error("Failed to fetch episode info:", error);
          this.errorMessage = "An error occurred. Please try again later.";
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
});
