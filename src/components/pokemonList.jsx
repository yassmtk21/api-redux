import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

function pokemonList({ id, name }) {
  return (
    <Card className="w-96">
      <CardHeader>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
        />
      </CardHeader>
      <CardBody>
        <Typography>{name}</Typography>
      </CardBody>
      <CardFooter>
        <Tooltip content="details">
          <Typography>
            <button>more details</button>
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

export default pokemonList;
