import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "../redux/slice/allPokemonsSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonsReducer,
  },
});

export default store;
