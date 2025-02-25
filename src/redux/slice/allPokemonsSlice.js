import { createSlice } from "@reduxjs/toolkit";
import { getPokemons } from "../action/pokemonActions";

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState: {
    pokemons: [],
    offset: 0,
    limit: 20,
    hasMore: true,
    isLoading: false,
    hasError: false,
  },
  reducers: {
    loadMorePokemons: (state) => {
      state.offset += state.limit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getPokemons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;

        if (action.payload.length === 0) {
          state.hasMore = false;
        }
        if (state.offset === 0) {
          // ✅ On first fetch, replace Pokémon list
          state.pokemons = action.payload;
        } else {
          // ✅ On subsequent fetches, append new Pokémon
          state.pokemons = [...state.pokemons, ...action.payload];
        }
      })
      .addCase(getPokemons.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.payload;
      });
  },
});
export const { loadMorePokemons } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
