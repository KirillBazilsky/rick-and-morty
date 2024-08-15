import axios from "axios";

class CharacterDetailApi {
  private URL: string;

  constructor() {
    this.URL = import.meta.env.VITE_RICK_AND_MORTY_API_URL;
  }
  public async getItems(
    name: string | null,
    species: string | null,
    gender: string | null,
    status: string | null,
    type: string | null,
    origin: string | null,
    location: {} |  null,
    episode: string[] |  null,
  ) {
    const response = await axios.get(
      `${this.URL}character?name=${name}&species=${species || ""}&gender=${gender || ""}&status=${status || ""}`,
    );
    return response.data.results;
  }

  public async updateItems(
    name: string | null,
    species: string | null,
    gender: string | null,
    status: string | null,
    page: number | null,
  ) {
    const response = await axios.get(
      `${this.URL}character?name=${name}&species=${species || ""}&gender=${gender || ""}&status=${status || ""}&page=${page || null}`,
    );
    return response.data.results;
  }
}

export default CharacterDetailApi;
