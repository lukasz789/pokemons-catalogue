import React from "react";

import { Pokemon } from "../../types";

import classes from "./PokemonDetailsModal.module.css";
import Backdrop from "../UI/Backdrop";

const PokemonDetailsModal: React.FC<{
  pokemonData: Pokemon;
}> = ({ pokemonData }) => {
  return (
    <>
      <div className={classes.detailsmodal}>
        <strong className={classes.label}>height:</strong>
        <p>{pokemonData.height}</p>
        <strong className={classes.label}>weight:</strong>
        <p>{pokemonData.weight}</p>
      </div>
      <Backdrop />
    </>
  );
};

export default PokemonDetailsModal;
