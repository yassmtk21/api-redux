import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { fetchPokemonDetailsAsync } from "../features/pokemons/allPokemonsSlice";

function pokemonList({ id, name, url }) {
  const dispatch = useDispatch();
  const handleDetailsClick = () => {
    dispatch(fetchPokemonDetailsAsync(url));
  };

  const handleScroll = (event) => {
    const element = event.target;
    let scrollTop = element.scrollTop();
    console.log(scrollTop);
  };
  return (
    <>
      <Card>
        <CardHeader floated={false} className="flex justify-center">
          <img
            className=""
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={name}
          />
        </CardHeader>
        <CardBody className="text-contenr">
          <Typography
            variant="h4"
            color="blue-gray"
            className="text-center mb-2"
          >
            {name}
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center pt-2">
          <Button
            size="sm"
            className="flex items-center gap-2"
            onClick={handleDetailsClick}
          >
            More Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default pokemonList;
