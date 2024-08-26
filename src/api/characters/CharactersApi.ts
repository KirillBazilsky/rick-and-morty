import axios from "axios";
import { API_URL } from "@/constatnts/api";
import {
  ICharacter,
  ICharactersApi,
  IResponseAllCharacters,
} from "./ICharactersApi";

class CharactersApi implements ICharactersApi {
  public async getAllCharacters(
    name?: string,
    species?: string,
    gender?: string,
    status?: string,
    page?: number,
  ): Promise<IResponseAllCharacters> {
    const response  = await axios.get<IResponseAllCharacters>(
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
    const response = await axios.get<ICharacter>(
      `${API_URL}character/${id}`,
    );

    return response.data;
  }

  public async getMultiplyCharacters(
    url: string[],
  ): Promise<ICharacter[] | ICharacter> {
    const response = await axios.get<ICharacter[] | ICharacter>(
      `${API_URL}character/${url}`,
    );

    return response.data;
  }
}

export default CharactersApi;
