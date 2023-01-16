import { Card, Grid, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react'
import { SmallPokemon } from '../../interfaces';

interface Props{
    pokemon: SmallPokemon
}

export const PokemonCard:FC<Props> = ({ pokemon }) => {

    const {
        id,
        image,
        url,
        name
        } = pokemon;

    const router = useRouter()

    const onClick = () => {
        router.push(`/name/${ name }`);
    }

  return (
    <Grid xs= {6} sm={3} md={4} xl={1} key={id}>
    <Card isPressable isHoverable={true} onClick={ onClick } >
      <Card.Body css={{ p:1 }}>
        <Card.Image 
          src={image}  
          width={"100%"}
          height={140}
        />
      </Card.Body>
      <Card.Footer>
        <Row justify='space-between'>
          <Text transform='capitalize'>{name}</Text>
          <Text>#{id}</Text>
        </Row>
      </Card.Footer>
    </Card>
  </Grid>
  )
}
