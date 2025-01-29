import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPokemons } from "../../api/api";
import { getId } from "../../helpers/pokemonUtils";

export const fetchPokemonsAsync = createAsyncThunk(
  "pokemons/fetchPokemons",
  async () => {
    const response = await fetchPokemons();
    return response.data;
  }
);

export const fetchPokemonDetailsAsync = createAsyncThunk(
  "pokemons/fetchPokemonDetails",
  async (url) => {
    const response = await fetch(url);
    return response.json();
  }
);

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState: {
    pokemons: [],
    selectedPokemon: null,
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonsAsync.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchPokemonsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        const { results } = action.payload;
        const pokemonResultList = results.map((pokemon) => {
          const id = parseInt(getId(pokemon.url, 10));
          return { id, ...pokemon };
        });

        state.pokemons = pokemonResultList;
      })
      .addCase(fetchPokemonsAsync.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(fetchPokemonDetailsAsync.fulfilled, (state, action) => {
        state.selectedPokemon = action.payload;
      });
  },
});

export default pokemonsSlice.reducer;
