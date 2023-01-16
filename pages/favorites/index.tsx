import { Card, Container, Grid, Image, Text } from '@nextui-org/react'
// import Image from 'next/image'
import React, { useState, useEffect} from 'react'
import { Layout } from '../../components/layouts'
import { FavoritePokemon, FavoriteCardPokemon } from '../../components/pokemon'
import { NoFavorites } from '../../components/ui/NoFavorites'
import { localFavorites } from '../../utils'

const FavoritePage = () => {
const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

useEffect(() => {
  setFavoritePokemons( localFavorites.pokemons);
}, [])


  return (
    <Layout title='Pokemons - Favoritos'>
      <Container css={{
        display:'flex',
        flexDirection: 'column',
        height: 'calc(100vh-100px)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center'
      }}>

        {
          favoritePokemons.length === 0 
          ? ( <NoFavorites /> )
          : ( <FavoritePokemon pokemons={ favoritePokemons } /> )
        }

      </Container>
    </Layout>
  )
}

export default FavoritePage