import { getId } from "../helpers/pokemonUtils";

export const transformPokemonList = (result) => {
  return result.map((pokemon) => {
    const id = getId(pokemon.url, 10);
    return { id, ...pokemon };
  });
};
