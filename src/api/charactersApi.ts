import axios from "axios";
import { API_URL} from "@/constatnts/constants"; 

class CharactersApi {
  static URL: string = API_URL;

  
  public static async getItems(
    name?: string,
    species?: string,
    gender?: string,
    status?: string,
    page?: number
  ) {

    const response = await axios.get(
      `${this.URL}character`,{params:{
        name,
        species,
        gender,
        status,
        page
    }})
      
    return response.data.results;
  }
  
}

export default CharactersApi;
