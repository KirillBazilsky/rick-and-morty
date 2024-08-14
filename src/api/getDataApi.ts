import axios from "axios";

class GetData {
  private URL: string;

  constructor() {
    this.URL = import.meta.env.VITE_RICK_AND_MORTY_API_URL;
  }
  public async getCharacters(
    name: string | null,
    species: string | null,
    gender: string | null,
    status: string | null,
  ) {
    const response = await axios.get(
      `${this.URL}character?name=${name}&species=${species || ""}&gender=${gender || ""}&status=${status || ""}`,
    );
    return response.data.results;
  }
}

export default GetData;
