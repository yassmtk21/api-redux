import { useEffect } from "react";
import { Provider } from "react-redux";
import { fetchPokemonsAsync } from "./features/pokemons/allPokemonsSlice";
import store from "./app/store";
import PokemoneList from "./features/pokemons/allPokemonsList";

function App() {


  return (
    <Provider store={store}>
      <PokemoneList />
    </Provider>
  );
}

export default App;
