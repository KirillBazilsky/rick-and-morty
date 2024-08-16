import axios from "axios";
import { API_URL} from "@/constatnts/constants"; 

class CharactersApi {
  
  public static async getItems(
    name?: string,
    species?: string,
    gender?: string,
    status?: string,
    page?: number
  ) {

    const response = await axios.get(
      `${API_URL}character`,{params:{
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
