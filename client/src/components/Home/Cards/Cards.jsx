
import React from 'react';
import Card from './Card/Card';
import './Cards.css';
// import Loading from './../Loading.jsx'
import loadpoke from './loadpoke.gif';


export default function Cards({allPokemons}){
    console.log(allPokemons);
    return (
        <div className='cards'>
                {allPokemons.length !== 0 ? allPokemons.map(pokemon => (
                    <Card
                    key={pokemon.id}
                    id={pokemon.id}
                    image={pokemon.image}
                    name={pokemon.name}
                    types={pokemon.types}
                    speed={pokemon.speed}
                    hp={pokemon.hp}
                    attack={pokemon.attack}
                    defense={pokemon.defense}
                    height={pokemon.height}
                    weight={pokemon.weight}
                />
            )):
            <div>
                <h1>Wait for it, there are over 40 pokemons out there in this region!</h1>
                <img className='load' src={loadpoke} alt="Loading..." />
            </div>
        }
        </div>
    )
}