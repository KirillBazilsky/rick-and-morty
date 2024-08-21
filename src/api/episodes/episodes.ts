import axios from "axios";
import { API_URL} from "@/constatnts/constants"; 

class EpisodesApi {
  public static async fetchEpisodes(episode?: string,page?: number) {
    
    const response = await axios.get(
      `${API_URL}episode`,{params:{
        episode,
        page
        }
      }
    )
    const results = response.data.results; 
    const info = response.data.info; 
    
    return { results, info }
  }

  public static async getEpisodes(
    url?: string[],
    
  ) {
    
    const response = await axios.get(
      `${API_URL}episode/${url}`
    )
    
    
    
    return response.data
  }

  public static async getEpisodeInfo(
    id?: string, 
  ) {
    
    const response = await axios.get(
      `${API_URL }episode/${id}`
    );

    return response.data;
  }
  
  
 
}

export default EpisodesApi;
