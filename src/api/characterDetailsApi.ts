import axios from "axios";
import { API_URL } from "@/constatnts/constants"; 

class CharacterDetailApi {
    static URL: string = API_URL;

static async getCharacterInfo(
    id?: number,
    
  ) {
    const response = await axios.get(
      `${this.URL}character`,{params:{
        id:id
        }
    },
    );
    return response.data.results;
  }

}

export default CharacterDetailApi;
