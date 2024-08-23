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
  info: { count: number; pages: number; next: string; prev: string };
  results: IEpisode[];
}
export interface IResponseSingleEpisode {
  data: IEpisode;
}
export interface IResposeMultiplyEpisodes {
  data: IEpisode[];
}
export interface IEpisodesApi {
  getAllEpisodes(
    episode?: string,
    page?: number,
  ): Promise<IResponseAllEpisodes>;
  getSingleEpisode(url: string[]):Promise<IResponseSingleEpisode>
  getMultiplyEpisodes(id: string):Promise<IResposeMultiplyEpisodes>
}
