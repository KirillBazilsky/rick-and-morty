import axios, { AxiosResponse } from "axios";
import { API_URL } from "@/constatnts/api";
import { IEpisode, IEpisodesApi, IResponseAllEpisodes } from "./IEpisodesApi";

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

  public async getSingleEpisode(url: string): Promise<IEpisode> {
    const response: AxiosResponse<IEpisode> = await axios.get(
      `${API_URL}episode/${url}`,
    );

    return response.data;
  }

  public async getMultiplyEpisodes(
    id: string[],
  ): Promise<IEpisode[] | IEpisode> {
    const response: AxiosResponse<IEpisode[] | IEpisode> = await axios.get(
      `${API_URL}episode/${id}`,
    );

    return response.data;
  }
}

export default EpisodesApi;
