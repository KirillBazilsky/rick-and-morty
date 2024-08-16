import axios from "axios";
import { API_URL } from "@/constatnts/constants"; 

class CharacterDetailApi {
    

static async getCharacterInfo(
    id?: number,
    
  ) {
    const response = await axios.get(
      `${API_URL}character`,{params:{
        id
        }
    },
    );
    return response.data.results;
  }

}

export default CharacterDetailApi;
