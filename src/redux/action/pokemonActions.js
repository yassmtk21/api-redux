import { ALL_POKEMONS, API_URL } from "../../config/config";
import { parseName } from "../../helpers/helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPokemons = createAsyncThunk(
  "pokemons/All",
  async ({ offset, limit }, { rejectWithValue }) => {
    try {
      const result = await consultPokemons(offset, limit);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const consultPokemons = async (offset, limit) => {
  try {
    const response = await fetch(
      `${API_URL}/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();

    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailsResponse = await fetch(pokemon.url);
        const details = await detailsResponse.json();

        return {
          id: details.id,
          name: parseName(details.name),
          image: details.sprites.front_default,
          types: details.types.map((type) => type.type.name),
        };
      })
    );

    return pokemonDetails;
  } catch (error) {
    throw new Error("Failed to fetch Pokémon data");
  }
};
