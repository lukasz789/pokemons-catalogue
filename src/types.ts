import { IPokemonType, IPokemonSprites } from "pokeapi-typescript";

export interface Pokemon {
  name: string;
  type: IPokemonType[];
  sprite: IPokemonSprites;
  weight: number;
  height: number;
}
