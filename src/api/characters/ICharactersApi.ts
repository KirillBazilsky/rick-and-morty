export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: Date;
  origin: { name: string; url: string };
}
export interface IResponseAllCharacters {
  info: { count: number; pages: number; next: string; prev: string };
  results: ICharacter[];
}
export interface IResponseSingleCharacter {
  data: ICharacter;
}
export interface IResponseMultiplyCharacters {
  data: ICharacter[];
}
export interface ICharactersApi {
  getAllCharacters(
    name?: string,
    species?: string,
    gender?: string,
    status?: string,
    page?: number,
  ): Promise<IResponseAllCharacters>;
  getSingleCharacter(id: string): Promise<IResponseSingleCharacter>;
  getMultiplyCharacters(urls: string[]): Promise<IResponseMultiplyCharacters>;
}
