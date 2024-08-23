import { defineStore } from "pinia";
import CharactersApi from "@/api/characters/CharactersApi";
import { ICharacter } from "@/api/characters/ICharactersApi";
import { IEpisode } from "@/api/episodes/IEpisodesApi";
import EpisodesApi from "@/api/episodes/EpisodesApi";
import { getId } from "@/api/IdGetterApi";
import { AxiosError } from "axios";
export const useEpisodesStore = defineStore("episodes", {
  state: () => ({
    name: "" as string,
    episode: "" as string,
    errorMessage: "" as string | null,
    isLoading: false as boolean,
    canLoadMore: true as boolean,
    page: 1 as number,
    episodesList: [] as IEpisode[] | undefined,
    charactersList: [] as ICharacter[] | undefined,
    episodeInfo: {} as IEpisode | undefined,
    charactersApi: new CharactersApi(),
    episodesApi: new EpisodesApi(),
  }),

  actions: {
    async getAllEpisodes() {
      try {
        this.page = 1;
        this.isLoading = true;
        const data = await this.episodesApi.getAllEpisodes(
          this.episode,
          this.page,
        );
        this.episodesList = data.results;
        this.errorMessage = "";
        if (data.info.pages == this.page) {
          this.canLoadMore = false;
        } else {
          this.canLoadMore = true;
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.status === 404) {
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
          this.episode,
          this.page,
        );
        const newEpisodes = data.results;
        this.episodesList?.push(...newEpisodes);
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
    async getSingleEpisode(id: string) {
      try {
        this.isLoading = true;
        this.charactersList = [];
        this.page = 1;
        this.episodeInfo = await this.episodesApi.getSingleEpisode(id);
        if (this.episodeInfo) {
          const charactersUrl: string[] = getId(this.episodeInfo?.characters);
          const characters: ICharacter[] | ICharacter =
            await this.charactersApi.getMultiplyCharacters(charactersUrl);
          if (Array.isArray(characters)) {
            this.charactersList = characters;
          } else if (Array.isArray(characters)) {
            this.charactersList.push(characters);
          }
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error("Failed to fetch episode info:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
});
