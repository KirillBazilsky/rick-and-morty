import axios from "axios";
import { API_URL } from "@/constatnts/constants"; 

class CharacterDetailApi {
    

static async getCharacterInfo(
    id?: string,
    
  ) {
    const response = await axios.get(
      `${API_URL }character/${id}`
    );
    return response.data;
  }

  static async getEpisodeInfo(
    url: string,
  ) {
    const response = await axios.get(url);
    return response.data;
  }

}

export default CharacterDetailApi;
