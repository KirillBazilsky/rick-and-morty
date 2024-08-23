import axios, { AxiosResponse } from "axios";
import { API_URL } from "@/constatnts/api";
import {
  ICharacter,
  ICharactersApi,
  IResponseAllCharacters,
} from "./ICharactersApi";

class CharactersApi implements ICharactersApi {
  public async getAllCharacters(
    name?: string | null,
    species?: string | null,
    gender?: string | null,
    status?: string | null,
    page?: number | null,
  ): Promise<IResponseAllCharacters> {
    const response: AxiosResponse<IResponseAllCharacters> = await axios.get(
      `${API_URL}character`,
      {
        params: {
          name,
          species,
          gender,
          status,
          page,
        },
      },
    );

    const { info, results } = response.data;

    return { info, results };
  }

  public async getSingleCharacter(id: string): Promise<ICharacter> {
    const response: AxiosResponse<ICharacter> = await axios.get(
      `${API_URL}character/${id}`,
    );

    return response.data;
  }

  public async getMultiplyCharacters(
    url: string[],
  ): Promise<ICharacter[] | ICharacter> {
    const response: AxiosResponse<ICharacter[] | ICharacter> = await axios.get(
      `${API_URL}character/${url}`,
    );

    return response.data;
  }
}

export default CharactersApi;
