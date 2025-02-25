import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonList from "../../components/pokemonList";
import PokemonInfo from "../../components/Modals/pokemonInfo";
import useModal from "../../hooks/useModal";
import { getPokemons } from "../../redux/action/pokemonActions";
import { loadMorePokemons } from "../../redux/slice/allPokemonsSlice";

function AllPokemonsList() {
  const { open, closeModal, openModal } = useModal();
  const dispatch = useDispatch();
  const { pokemons, offset, limit, hasMore, isLoading, firstLoad } =
    useSelector((state) => state.pokemon);

  const observer = useRef(null);

  // Fetch Pokémon on mount (if empty)
  useEffect(() => {
    dispatch(getPokemons({ offset, limit }));
  }, [dispatch, offset, limit]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(loadMorePokemons()); // ✅ First, update the offset
    }
  };

  // Intersection Observer using useCallback
  const lastPokemonRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, dispatch, offset, limit]
  );

  return (
    <>
      <div className="bg-[#1A1A2E] h-dvh pt-10 px-10 grid grid-cols-3 gap-4 overflow-auto">
        {pokemons.map(({ id, name, url }, index) => (
          <div
            key={id}
            ref={index === pokemons.length - 1 ? lastPokemonRef : null}
          >
            <PokemonList
              onOpenModal={openModal}
              id={id}
              name={name}
              url={url}
            />
          </div>
        ))}
        {isLoading && (
          <div className="font-bold text-white p-20">Loading....</div>
        )}
        <div className="bg-white absolute top-0 left-0 ">
          <p>
            offset: {offset} of pokemons count: {pokemons.length}
          </p>
        </div>
      </div>
      <PokemonInfo open={open} onCloseModal={closeModal} />
    </>
  );
}

export default AllPokemonsList;
