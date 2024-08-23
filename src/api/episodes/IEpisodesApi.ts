import { IresponseINfo } from "../characters/ICharactersApi";

export interface IEpisode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string[];
  created: Date;
}
export interface IResponseAllEpisodes {
  info: IresponseINfo;
  results: IEpisode[];
}

export interface IResposeMultiplyEpisodes {
  data: IEpisode[];
}
export interface IEpisodesApi {
  getAllEpisodes(
    episode?: string,
    page?: number,
  ): Promise<IResponseAllEpisodes>;
  getSingleEpisode(url: string):Promise<IEpisode>
  getMultiplyEpisodes(id: string[]):Promise<IEpisode[]|IEpisode>
}
