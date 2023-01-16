import { serialize } from "v8";
import pokeApi from "../api/pokeApi";
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async (prop: string) => {

    try {
        const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ prop }`);

        return {
          id: data.id,
          name: data.name,
          sprites: data.sprites
        }        
    } catch (error) {
        return null;
    }


}