import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonsAsync } from "./allPokemonsSlice";
import PokemonList from "../../components/pokemonList";
import { select } from "@material-tailwind/react";

function allPokemonsList() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemon.pokemons);
  const pokemonDetails = useSelector((state) => state.pokemon.selectedPokemon);
  const isLoading = useSelector((state) => state.pokemon.isLoading);
  const hasError = useSelector((state) => state.pokemon.hasError);
  console.log(pokemonDetails === undefined ? "" : pokemonDetails);
  useEffect(() => {
    dispatch(fetchPokemonsAsync());
  }, [dispatch]);

  return (
    <div className="bg-[#1A1A2E] pt-10 px-10 grid grid-cols-3 gap-4">
      {pokemons.map((pok) => {
        const { id, name, url } = pok;
        return (
          <div key={id}>
            <PokemonList id={id} name={name} url={url} />
          </div>
        );
      })}
    </div>
  );
}

export default allPokemonsList;
