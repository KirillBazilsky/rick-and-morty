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
  info: { count: number; pages: number; next: string; prev: string };
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
