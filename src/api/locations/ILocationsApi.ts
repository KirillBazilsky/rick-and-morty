import { IINfo } from "../characters/ICharactersApi";

export default interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: Date;
}
export interface IResponseAllLocations {
  info: IINfo;
  results: ILocation[];
}
export interface ILocationsApi {
  getAllLocations(
    name?: string,
    type?: string,
    dimension?: string,
    page?: number,
  ): Promise<IResponseAllLocations>;
  getSingleLocation(id?: string): Promise<ILocation>;
}
