import { createSlice } from "@reduxjs/toolkit";
import { getPokemons } from "../action/pokemonActions";

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState: {
    pokemons: [],
    offset: 0,
    limit: 20,
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getPokemons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;

        // Avoid adding duplicates
        const newPokemons = action.payload.filter(
          (newPokemon) =>
            !state.pokemons.some((existing) => existing.id === newPokemon.id)
        );

        state.pokemons = [...state.pokemons, ...newPokemons];
        state.offset += state.limit; // Update offset properly
      })
      .addCase(getPokemons.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.payload;
      });
  },
});

export default pokemonsSlice.reducer;
