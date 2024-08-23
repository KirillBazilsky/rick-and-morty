import { defineStore } from "pinia";
import CharactersApi from "@/api/characters/CharactersApi";
import { ICharacter } from "@/api/characters/ICharactersApi";
import { AxiosError } from "axios";
import LocationsApi from "@/api/locations/LocatonsApi";
import ILocation from "@/api/locations/ILocationsApi";
import { getId } from "@/api/IdGetterApi";

export const useLocationsStore = defineStore("locations", {
  state: () => ({
    menu: false as boolean,
    name: "" as string,
    type: "" as string,
    dimensions: "" as string,
    errorMessage: "" as string | null,
    isLoading: false as boolean,
    canLoadMore: true as boolean,
    page: 1 as number,
    locationsList: [] as ILocation[] | undefined,
    charactersList: [] as ICharacter[] | undefined,
    charactersUrl: [] as string[],
    locationInfo: {} as ILocation | undefined,
    charactersApi: new CharactersApi(),
    locationsApi: new LocationsApi(),
  }),

  actions: {
    async fetchLocations() {
      this.isLoading = true;
      try {
        this.page = 1;
        const data = await this.locationsApi.getAllLocations(
          this.name,
          this.type,
          this.dimensions,
          this.page,
        );
        this.locationsList = data.results;
        this.errorMessage = "";
        if (data.info.pages == this.page) {
          this.canLoadMore = false;
        } else {
          this.canLoadMore = true;
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.status === 404) {
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
          this.name,
          this.type,
          this.dimensions,
          this.page,
        );
        const newLocations = data.results;

        this.locationsList?.push(...newLocations);

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
    async getSingleLocation(id: string) {
      try {
        this.isLoading = true;
        this.charactersList = [];
        this.page = 1;
        this.locationInfo = await this.locationsApi.getSingleLocation(id);
        const charactersUrl: string[] = getId(this.locationInfo?.residents);
        if (charactersUrl.length > 0) {
          const characters =
            await this.charactersApi.getMultiplyCharacters(charactersUrl);
          if (Array.isArray(characters)) {
            this.charactersList = characters;
          } else if (!Array.isArray(characters)) {
            this.charactersList?.push(characters);
          }
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error("Failed to fetch location info:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
});
