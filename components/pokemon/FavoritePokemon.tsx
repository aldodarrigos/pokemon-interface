import { Grid } from '@nextui-org/react'
import React, { FC } from 'react'
import { FavoriteCardPokemon } from './FavoriteCardPokemon';

interface Props {
    pokemons: number[];
}

export const FavoritePokemon:FC<Props> = (  { pokemons }  ) => {
  console.log(pokemons)
  return (
    <Grid.Container gap={ 2 } direction='row' justify='flex-start' >
      {
        pokemons.map( id => (
          <FavoriteCardPokemon key={ id } id={ id } />
        ))
      }
    </Grid.Container>
  )
}
