import axios from "axios";
import { API_URL} from "@/constatnts/constants"; 

class LocationsApi {
  public static async fetchLocations(name?: string,type?:string,dimension?:string,page?: number) {
    
    const response = await axios.get(
      `${API_URL}location`,{params:{
        name,
        type,
        dimension,
        page
        }
      }
    )

    const results = response.data.results; 
    const info = response.data.info; 
    

    return { results, info }
  }

  public static async getlocationInfo(
    id?: string, 
  ) {
    
    const response = await axios.get(
      `${API_URL }location/${id}`
    );

    return response.data;
  } 
}

export default LocationsApi;
