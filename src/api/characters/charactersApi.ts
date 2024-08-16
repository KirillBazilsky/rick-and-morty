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
  
  public static async getCharacterInfo(
    id?: string,
    
  ) {
    const response = await axios.get(
      `${API_URL }character/${id}`
    );
    return response.data;
  }

  public static async getEpisodeInfo(
    url: string,
  ) {
    const response = await axios.get(url);
    return response.data;
  }
}

export default CharactersApi;
