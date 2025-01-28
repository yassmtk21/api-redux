import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonsAsync } from "./allPokemonsSlice";
import PokemonList from "../../components/pokemonList";

function allPokemonsList() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemon.pokemons);
  const isLoading = useSelector((state) => state.pokemon.isLoading);
  const hasError = useSelector((state) => state.pokemon.hasError);
  useEffect(() => {
    dispatch(fetchPokemonsAsync());
  }, [dispatch]);

  return (
    <div>
      {pokemons.map((pok) => {
        const { id, name } = pok;
        return (
          <div key={id}>
            <PokemonList id={id} name={name} />
          </div>
        );
      })}
    </div>
  );
}

export default allPokemonsList;
