import { Image, Text } from '@nextui-org/react'
import React from 'react'

export const NoFavorites = () => {
  return (
        <>
            <Text h1>No hay favoritos</Text>
            <Image css={{ opacity: '0.2'}} width={250} height={250} src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png' />
        </>
  )
}
