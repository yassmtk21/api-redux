import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonsAsync } from "./allPokemonsSlice";
import PokemonList from "../../components/pokemonList";
import PokemonInfo from "../../components/Modals/pokemonInfo";

function allPokemonsList() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemon.pokemons);
  const pokemonDetails = useSelector((state) => state.pokemon.selectedPokemon);
  const isLoading = useSelector((state) => state.pokemon.isLoading);
  const hasError = useSelector((state) => state.pokemon.hasError);
  useEffect(() => {
    dispatch(fetchPokemonsAsync());
  }, [dispatch]);

  const handleScroll = (event) => {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      console.log("get more pokemon");
    }
  };
  const filteredPokemon = pokemons.filter((pok) => pok.id <= 20);
  return (
    <>
      <div
        className="bg-[#1A1A2E] h-dvh pt-10 px-10 grid grid-cols-3 gap-4 overflow-auto"
        onScroll={handleScroll}
      >
        {filteredPokemon.map((pok) => {
          const { id, name, url } = pok;
          return (
            <div key={id}>
              <PokemonList id={id} name={name} url={url} />
            </div>
          );
        })}
      </div>
      <PokemonInfo />
    </>
  );
}

export default allPokemonsList;
