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
    <div className="bg-[#1A1A2E] pt-10 px-10 grid grid-cols-3 gap-4">
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
