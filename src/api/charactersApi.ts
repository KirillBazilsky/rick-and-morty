import axios from "axios";
import { UrlConstant } from "@/constatnts/constants"; 

class CharactersApi {
  static URL: string = UrlConstant;

  
  public static async getItems(
    name?: string,
    species?: string,
    gender?: string,
    status?: string,
    page?: number
  ) {
    const response = await axios.get(
      `${this.URL}character?name=${name}&species=${species || ""}&gender=${gender || ""}&status=${status || ""}&page=${page}`,
    );
    return response.data.results;
  }

  
}

export default CharactersApi;
