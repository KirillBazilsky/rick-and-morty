import axios from "axios";
import { API_URL} from "@/constatnts/constants"; 

class EpisodesApi {
  
  public static async getEpisodes(
    url?: string[],
    
  ) {
    
    const response = await axios.get(
      `${API_URL}episode/${url}`
    )
    
    
    
    return response.data
  }

  
 
}

export default EpisodesApi;
