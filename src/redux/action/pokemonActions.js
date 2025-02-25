import { API_URL } from "../../config/config";
import { parseName } from "../../helpers/helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPokemons = createAsyncThunk(
  "pokemons/All",
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const result = await consultPokemons(limit, offset);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const consultPokemons = async (limit, offset) => {
  try {
    const response = await fetch(
      `${API_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    if (!data.results.length) {
      return [];
    }

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
