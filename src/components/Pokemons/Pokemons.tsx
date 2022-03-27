import React, { useContext, useState, useEffect } from "react";

import { FormContext } from "../../store/form-context";

import PokeAPI from "pokeapi-typescript";

import { Pokemon } from "../../types";

import PokemonSingle from "./PokemonSingle";

import classes from "./Pokemons.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorModal from "../UI/ErrorModal";

const Pokemons: React.FC = () => {
  const { name, type } = useContext(FormContext);

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isVisibleButton, setIsVisibleButton] = useState<boolean>(true);
  const [numberOfPokemonsToFetch, setNumberOfPokemonsToFetch] =
    useState<number>(0);

  useEffect(() => {
    setNumberOfPokemonsToFetch(0);
  }, [name, type]);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        setIsLoading(true);
        setError("");

        if (name) {
          const foundPokemonByName = await PokeAPI.Pokemon.fetch(name);
          const selectedDetailsAboutFetchedPokemons = [
            {
              name: foundPokemonByName.name,
              type: foundPokemonByName.types,
              sprite: foundPokemonByName.sprites,
              weight: foundPokemonByName.weight,
              height: foundPokemonByName.height,
            },
          ];
          setPokemonList(selectedDetailsAboutFetchedPokemons);
        } else {
          let newPokemonsByType;
          if (type) {
            newPokemonsByType = await PokeAPI.Type.fetch(type);
          }
          const newPokemonsNoFilter = await PokeAPI.Pokemon.list(
            20,
            numberOfPokemonsToFetch //offset
          );

          if (!newPokemonsNoFilter.next) {
            setIsVisibleButton(false);
          }

          const newPokemonsCommonList = newPokemonsByType
            ? newPokemonsByType.pokemon.map((item) => item.pokemon)
            : newPokemonsNoFilter.results;

          const promiseListOfFullPokemonInfo = newPokemonsCommonList.map(
            (pokemon) => {
              return PokeAPI.Pokemon.resolve(pokemon.name);
            }
          );

          const newPokemonsFullInfo = await Promise.all(
            promiseListOfFullPokemonInfo
          ).then((data) => {
            return data;
          });

          const selectedDetailsAboutFetchedPokemons = newPokemonsFullInfo.map(
            (pokemon) => {
              return {
                name: pokemon.name,
                type: pokemon.types,
                sprite: pokemon.sprites,
                weight: pokemon.weight,
                height: pokemon.height,
              };
            }
          );

          setPokemonList(
            newPokemonsByType || !numberOfPokemonsToFetch
              ? selectedDetailsAboutFetchedPokemons
              : pokemonList.concat(selectedDetailsAboutFetchedPokemons)
          );
        }
      } catch (error) {
        console.log(error);
        if (name || type) {
          setError(
            "Something went wrong, please make sure specified name/type of pokemon exists."
          );
        } else {
          setError(
            "Something went wrong, please refresh the page or try again later."
          );
        }
      }
      setIsLoading(false);
    };
    getPokemons();
  }, [name, type, numberOfPokemonsToFetch]);

  const showMoreDataHandler = () => {
    setNumberOfPokemonsToFetch(numberOfPokemonsToFetch + 20);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <>
        {error && <ErrorModal errorMessage={error} />}
        <div className={classes.listWrap}>
          {!error && (
            <ul className={classes.pokemonList}>
              {pokemonList.map((pokemon) => (
                <PokemonSingle
                  key={pokemon.name}
                  pokemonData={pokemon}
                ></PokemonSingle>
              ))}
            </ul>
          )}
          {type || name || !isVisibleButton || error || isLoading ? null : (
            <div className={classes.btnWrap}>
              <button
                onClick={showMoreDataHandler}
                className={`btn btn-success btn-lg btn-block`}
              >
                Show more pokemons!
              </button>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default Pokemons;
