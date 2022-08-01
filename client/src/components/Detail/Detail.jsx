import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemonById } from '../../Actions';
import './Detail.css';


export default function Detail(){
    const { id } = useParams();
    const dispatch =useDispatch();
    const details = useSelector(state => state.details)
    console.log(details)

    const { name, types, image, hp, attack, defense, speed, height, weight} = details
    useEffect(() => {
        dispatch(getPokemonById(id))
    }, [dispatch, id]);
    return(
        <div>
        {details.name ? (<div>
            <h1 className="h2">Name: {name}</h1>
            <h2>
                <a className="title-details" href="/home">Go home</a>
            </h2>
            <h2>Types: 
            {types?.map(e => {
                    if(typeof(e) === 'string'){
                        return (
                        <p key={e}>
                            <span className="type">
                                {e.replace(e[0], e[0].toUpperCase())}
                            </span>
                        </p>
                    )}
                    else{
                        return (
                            <div key={e.name}>
                                <span>
                                {e.name}
                                </span>
                            </div>
                        )
                    }
                })}
            </h2>
            <div>
                <img className="image" alt="imagen" src={image}/>
            </div>
            <h2>HP: {hp}</h2>
            <h2>Attack: {attack}</h2>
            <h2>Defense: {defense}</h2> 
            <h2>Speed: {speed}</h2>
            <h2>height: {height}</h2> 
            <h2>weight: {weight}</h2> 
            {/* <h2> Platforms: 
            {platforms?.map(e => {
                    if(typeof(e) === 'string'){
                        return (
                        <p key={e}>
                            <span className="type">
                                {e.replace(e[0], e[0].toUpperCase())}
                            </span>
                        </p>
                    )}
                    else{
                        return (
                            <div key={e.name}>
                                <span>
                                {e.name}
                                </span>
                            </div>
                        )
                    }
                })}
            </h2> */}
        </div>) : <div>
            <img src={`https://dribbble.com/shots/2835314-Pokeball-Animation`} alt='wait... please...' />
        </div>}
        </div>
    )
}