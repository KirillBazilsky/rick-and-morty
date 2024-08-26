import axios from "axios";
import { API_URL } from "@/constatnts/api";
import { IEpisode, IEpisodesApi, IResponseAllEpisodes } from "./IEpisodesApi";

class EpisodesApi implements IEpisodesApi {
  public async getAllEpisodes(
    episode?: string,
    page?: number,
  ): Promise<IResponseAllEpisodes> {
    const response = await axios.get<IResponseAllEpisodes>(
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
    const response = await axios.get<IEpisode>(
      `${API_URL}episode/${url}`,
    );

    return response.data;
  }

  public async getMultiplyEpisodes(
    id: string[],
  ): Promise<IEpisode[] | IEpisode> {
    const response = await axios.get<IEpisode[] | IEpisode>(
      `${API_URL}episode/${id}`,
    );

    return response.data;
  }
}

export default EpisodesApi;
