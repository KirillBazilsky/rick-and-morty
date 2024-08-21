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
    
    const results = response.data.results; 
    const info = response.data.info; 
    
    return { results, info }
  }

  
  public static async getCharacterInfo(
    id?: string, 
  ) {
    
    const response = await axios.get(
      `${API_URL }character/${id}`
    );

    return response.data;
  }

  public static async getCharacters(url?: string[]) {
    
    const response = await axios.get(
      `${API_URL}character/${url}`
    )


    return response.data;
  }
}

export default CharactersApi;
