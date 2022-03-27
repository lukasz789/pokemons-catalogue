import React, { useState } from "react";

import { Pokemon } from "../../types";
import PokemonDetailsModal from "./PokemonDetailsModal";

import classes from "./PokemonSingle.module.css";

const PokemonSingle: React.FC<{
  pokemonData: Pokemon;
}> = ({ pokemonData }) => {
  const [isAdditionalInfoVisible, setIsAdditinalInfoVisible] =
    useState<boolean>(false);

  const toggleAdditionalInfoVisibility = () => {
    setIsAdditinalInfoVisible((prevState) => !prevState);
  };

  return (
    <li className={classes.listItem} onClick={toggleAdditionalInfoVisibility}>
      <div className={classes.itemWrap}>
        <p className={classes.name}>{pokemonData.name}</p>

        <div>
          {pokemonData.type.map((el, index) => {
            return (
              <span key={el.slot}>{(index ? ", " : "") + el.type.name}</span>
            );
          })}
        </div>

        {pokemonData.sprite.front_shiny ? (
          <img src={pokemonData.sprite.front_shiny} alt="pokemon icon" />
        ) : null}

        {isAdditionalInfoVisible ? (
          <PokemonDetailsModal pokemonData={pokemonData} />
        ) : null}
      </div>
    </li>
  );
};

export default PokemonSingle;
