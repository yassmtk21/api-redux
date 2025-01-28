// https://pokeapi.co/api/v2/
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const fetchPokemons = async () => {
  const response = await apiClient.get("/pokemon/?offset=0&limit=807");
  return response;
};
