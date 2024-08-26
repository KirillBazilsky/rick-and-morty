import axios from "axios";
import { API_URL } from "@/constatnts/api";
import ILocation, {
  ILocationsApi,
  IResponseAllLocations,
} from "./ILocationsApi";

class LocationsApi implements ILocationsApi {
  public async getAllLocations(
    name?: string,
    type?: string,
    dimension?: string,
    page?: number,
  ): Promise<IResponseAllLocations> {
    const response  = await axios.get<IResponseAllLocations>(
      `${API_URL}location`,
      {
        params: {
          name,
          type,
          dimension,
          page,
        },
      },
    );

    const { info, results } = response.data;

    return { info, results };
  }

  public async getSingleLocation(id?: string): Promise<ILocation> {
    const response = await axios.get<ILocation>(
      `${API_URL}location/${id}`,
    );

    return response.data;
  }
}

export default LocationsApi;
