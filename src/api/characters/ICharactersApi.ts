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
export interface IresponseInfo{
  count: number; pages: number; next: string; prev: string 
}
export interface IResponseAllCharacters {
  info: IresponseInfo;
  results: ICharacter[];
}

export interface ICharactersApi {
  getAllCharacters(
    name?: string,
    species?: string,
    gender?: string,
    status?: string,
    page?: number,
  ): Promise<IResponseAllCharacters>;
  getSingleCharacter(id: string): Promise<ICharacter>;
  getMultiplyCharacters(urls: string[]): Promise<ICharacter[] | ICharacter>;
}
