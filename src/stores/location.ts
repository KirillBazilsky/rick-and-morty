import { defineStore } from "pinia";
import CharactersApi from "@/api/characters/CharactersApi";
import { ICharacter } from "@/api/characters/ICharactersApi";
import { AxiosError } from "axios";
import LocationsApi from "@/api/locations/LocatonsApi";
import ILocation from "@/api/locations/ILocationsApi";
import { getUrls } from "@/utils/url/url";

export const useLocationsStore = defineStore("locations", {
  state: () => ({
    filters: {
      name: "" as string,
      type: "" as string,
      dimensions: "" as string,
    },
    pagination: {
      page: 1 as number,
    },
    errorMessage: "" as string | null,
    isLoading: false as boolean,
    canLoadMore: true as boolean,

    locationsList: [] as ILocation[] | null,
    charactersList: [] as ICharacter[] | null,
    locationInfo: {} as ILocation | null,
    charactersApi: new CharactersApi(),
    locationsApi: new LocationsApi(),
  }),

  actions: {
    async getAllLocations() {
      this.isLoading = true;
      try {
        this.pagination.page = 1;
        const data = await this.locationsApi.getAllLocations(
          this.filters.name,
          this.filters.type,
          this.filters.dimensions,
          this.pagination.page,
        );
        this.locationsList = data.results;
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
            this.errorMessage = "No locations found for the selected filters.";
            this.canLoadMore = false;
          } else {
            this.errorMessage = "An error occurred. Please try again later.";
          }
        }
      } finally {
        this.isLoading = false;
      }
    },
    async loadMoreLocations() {
      try {
        const data = await this.locationsApi.getAllLocations(
          this.filters.name,
          this.filters.type,
          this.filters.dimensions,
          this.pagination.page,
        );
        const newLocations = data.results;

        this.locationsList?.push(...newLocations);

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
    async getSingleLocation(id: string) {
      try {
        this.isLoading = true;
        this.charactersList = [];
        this.pagination.page = 1;
        this.locationInfo = await this.locationsApi.getSingleLocation(id);

        const charactersUrl: string[] = getUrls(this.locationInfo?.residents);

        if (charactersUrl.length) {
          const characters =
            await this.charactersApi.getMultiplyCharacters(charactersUrl);
          this.charactersList = Array.isArray(characters)
            ? characters
            : [characters];
        } else {
          this.charactersList = null;
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error("Failed to fetch location info:", error);
          this.errorMessage = "An error occurred. Please try again later.";
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
});
