import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "../features/pokemons/allPokemonsSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonsReducer,
  },
});

export default store;
