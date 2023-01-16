import React from 'react'
import NextLink from 'next/link';
import { Link, Spacer, Text, useTheme } from '@nextui-org/react'
import Image from 'next/image';

export const Navbar = () => {

    const { theme } = useTheme();

  return (
    <div style={ {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0px 20px',
        backgroundColor: theme?.colors.gray200.value
    }}>

        <Image    
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
                alt="Icono de la App"
                width={70}
                height={70}
        />

        <Link  href={'/'} >
            <Text color={"white"} h2>P</Text>
            <Text color={"white"} h3>okémon</Text>
        </Link>
        
        <Spacer css={{flex:1}} />

        <NextLink style={{ marginRight: '10px'}} href={'/favorites'} passHref>
            <Text color={"white"} h4>Favoritos</Text>
        </NextLink>
    </div>
  )
}
