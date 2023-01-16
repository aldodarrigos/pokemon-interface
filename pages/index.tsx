import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { NextPage, GetStaticProps } from 'next'
import { Button, Card, Grid, Row, Text  } from '@nextui-org/react'
import { Layout } from '../components/layouts'
import pokeApi from '../api/pokeApi';
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';
import { PokemonCard } from '../components/pokemon'


const inter = Inter({ subsets: ['latin'] })

interface Props{
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title="Listado de Pokemons">
      <Grid.Container gap={ 2 } justify='flex-start'>
        {
          pokemons.map( (pokemon) => (
            <PokemonCard 
            pokemon={pokemon} 
            key={pokemon.id}
            />
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } =  await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((v,i) => ({
    ...v,
    id: i+1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`

  }));

  return {
    props: {
      pokemons
    }
  }
}


export default  Home;