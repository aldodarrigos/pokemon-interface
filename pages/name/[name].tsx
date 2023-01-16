import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'
import confetti from 'canvas-confetti'
import { GetStaticPaths, GetStaticProps } from 'next'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import pokeApi from '../../api/pokeApi'
import { Layout } from '../../components/layouts'
import { Pokemon, PokemonListResponse } from '../../interfaces'
import { localFavorites } from '../../utils'
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
    pokemon: Pokemon
}

const PokemonByNamePage:FC<Props> = ({ pokemon }) => {

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

    const {data} =  await pokeApi.get<PokemonListResponse>(`/pokemon?limit=150`);

  
    return {
      paths: data.results.map( (v, i ) => (
        {
            params: 
            {
                name: v.name
            }
        })),
      fallback: 'blocking', // can also be true or 'blocking'
    }
  }
  
  
  
  export const getStaticProps:GetStaticProps = async ({params}) => {
  
    const { name } = params as {name: string};
    const pokemon = await getPokemonInfo(name.toLowerCase());

    if(!pokemon) {
      return {
        redirect: {
          destination:'/',
          permanent: false 
        } 
      } 
    }

    return {
      props: {
         pokemon
      },
      revalidate: 86400, //Cada día se revalida si es la misma data
    }
  }
  


export default PokemonByNamePage