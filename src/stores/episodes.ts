import { defineStore } from "pinia";
import CharactersApi from "@/api/characters/CharactersApi";
import { ICharacter } from "@/api/characters/ICharactersApi";
import { IEpisode } from "@/api/episodes/IEpisodesApi";
import EpisodesApi from "@/api/episodes/EpisodesApi";
import { AxiosError } from "axios";
import { getUrls } from "@/utils/url/url";
export const useEpisodesStore = defineStore("episodes", {
  state: () => ({
    filters: {
      name: "" as string,
      episode: "" as string,
    },
    pagination: {
      page: 1 as number,
    },
    errorMessage: "" as string | null,
    isLoading: false as boolean,
    canLoadMore: true as boolean,
    episodesList: [] as IEpisode[] | null,
    charactersList: [] as ICharacter[] | null,
    episodeInfo: {} as IEpisode | null,
    charactersApi: new CharactersApi(),
    episodesApi: new EpisodesApi(),
  }),

  actions: {
    async getAllEpisodes() {
      try {
        this.pagination.page = 1;
        this.isLoading = true;
        const data = await this.episodesApi.getAllEpisodes(
          this.filters.episode,
          this.pagination.page,
        );
        this.episodesList = data.results;
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
            this.errorMessage = "No episodes found for the selected filters.";
            this.canLoadMore = false;
          } else {
            this.errorMessage = "An error occurred. Please try again later.";
          }
        }
      } finally {
        this.isLoading = false;
      }
    },
    async loadMoreEpisodes() {
      try {
        const data = await this.episodesApi.getAllEpisodes(
          this.filters.episode,
          this.pagination.page,
        );
        const newEpisodes = data.results;
        this.episodesList?.push(...newEpisodes);
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
    async getSingleEpisode(id: string) {
      try {
        this.isLoading = true;
        this.charactersList = [];
        this.pagination.page = 1;
        this.episodeInfo = await this.episodesApi.getSingleEpisode(id);
        if (this.episodeInfo) {
          const charactersUrl: string[] = getUrls(this.episodeInfo?.characters);
          const characters: ICharacter[] | ICharacter =
            await this.charactersApi.getMultiplyCharacters(charactersUrl);
          this.charactersList = Array.isArray(characters)
            ? characters
            : [characters];
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
