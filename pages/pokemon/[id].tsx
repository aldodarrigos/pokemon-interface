import React, { FC, useEffect , useState } from 'react'
import { GetStaticProps, NextPage, GetStaticPaths} from 'next';
import { useRouter } from 'next/router'
import { Image, Button, Card, Grid, Text, Container } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import pokeApi from '../../api/pokeApi';
import { Layout } from '../../components/layouts'
import { Pokemon, PokemonListResponse, SmallPokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';


interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const router = useRouter()
  const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites(pokemon.id) )



  const onToggleFavorite = () => {
      localFavorites.toggleFavorite( pokemon.id );
      setIsInFavorites(!isInFavorites);
      if(isInFavorites) return

      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle:-100,
        origin:{
          x: 1,
          y:0
        }
      })
  }
    


  return (
    <Layout  title={ pokemon.name }>
        <Grid.Container css={{ marginTop:'5px',}} gap={ 2 }>
          <Grid xs={ 12 } sm={ 4 }>
            <Card isHoverable css={{ padding: '30px' }}> 
              <Card.Body>
                <Card.Image 
                  src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                  alt={ pokemon.name }
                  width={ '100%' }
                  height={ 200 }
                />
              </Card.Body>
            </Card>
          </Grid>

          <Grid xs={ 12 } sm={ 8 }>
            <Card>
              <Card.Header css={{ display:'flex', justifyContent: 'space-between'}}>
                <Text h1 transform='capitalize' >
                  {pokemon.name}
                </Text>

                <Button onPress={onToggleFavorite} color='gradient' ghost={ !isInFavorites }>
                  {!isInFavorites ? 'Guardar en favoritos' : 'Quitar de favoritos'}
                </Button>

              </Card.Header>
              <Card.Body>
                <Text css={{ textAlign:'center'}} size={ 25 }>
                  Sprites:
                </Text>
                <Container direction='row' display='flex' gap={0}>
                  <Image 
                    src={ pokemon.sprites.front_default} 
                    alt={ pokemon.name } 
                    width={ 100 } 
                    height={ 100 } 
                  />
                  <Image 
                    src={ pokemon.sprites.back_default} 
                    alt={ pokemon.name } 
                    width={ 100 } 
                    height={ 100 } 
                  />
                  <Image 
                    src={ pokemon.sprites.front_shiny} 
                    alt={ pokemon.name } 
                    width={ 100 } 
                    height={ 100 } 
                  />
                  <Image 
                    src={ pokemon.sprites.back_shiny} 
                    alt={ pokemon.name } 
                    width={ 100 } 
                    height={ 100 } 
                  />

                </Container>
              </Card.Body>
            </Card>
            
          </Grid>
        </Grid.Container>
    </Layout>
  )
}


export const  getStaticPaths:GetStaticPaths = async (ctx) => {

  const pokemons151 = [...Array(151)].map( (v, i) => `${i + 1}`);

  return {
    paths: pokemons151.map(id => (
      {
        params:{
          id
        }
      })),
    fallback: 'blocking', // can also be true or 'blocking'
  }
}



export const getStaticProps:GetStaticProps = async ({params}) => {

  const {id } = params as {id: string};
  const pokemon = await getPokemonInfo(id);

  if( !pokemon ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      pokemon
    },
    revalidate: 86400
  }
}


export default PokemonPage