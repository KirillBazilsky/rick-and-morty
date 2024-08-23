import axios, { AxiosResponse } from "axios";
import { API_URL } from "@/constatnts/constants";
import {
  IEpisodesApi,
  IResponseAllEpisodes,
  IResponseSingleEpisode,
  IResposeMultiplyEpisodes,
} from "./IEpisodesApi";

class EpisodesApi implements IEpisodesApi {
  public async getAllEpisodes(
    episode?: string,
    page?: number,
  ): Promise<IResponseAllEpisodes> {
    const response: AxiosResponse<IResponseAllEpisodes> = await axios.get(
      `${API_URL}episode`,
      {
        params: {
          episode,
          page,
        },
      },
    );

    const { info, results } = response.data;

    return { info, results };
  }

  public async getSingleEpisode(
    url: string[],
  ): Promise<IResponseSingleEpisode> {
    const response: AxiosResponse<IResponseSingleEpisode> = await axios.get(
      `${API_URL}episode/${url}`,
    );

    return response.data;
  }

  public async getMultiplyEpisodes(
    id: string,
  ): Promise<IResposeMultiplyEpisodes> {
    const response: AxiosResponse<IResposeMultiplyEpisodes> = await axios.get(
      `${API_URL}episode/${id}`,
    );

    return response.data;
  }
}

export default EpisodesApi;
