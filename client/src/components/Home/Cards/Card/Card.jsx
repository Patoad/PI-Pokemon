
import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import { useDispatch } from 'react-redux';
import { deletePokemon } from '../../../../Actions';
import pokesilueta from './pokesilueta.jpg';

export default function Card({ image, name, types, id }) {
    const dispatch = useDispatch();
    function handleClick(e, id) {
        e.preventDefault();
        dispatch(deletePokemon(id))
    } 

    return(
        <div className="card">
            <nav className='card-body'>
                <Link className="link-title" to={`pokemons/${id}`}>
                    <h1 className="card-title">{name.replace(name[0], name[0].toUpperCase())}</h1>
                </Link>
            </nav>
            <div className="list-item">
                {types?.map(t => {
                    if(typeof(t) === 'string'){
                        return (
                        <div key={t}>
                            <span className="type">
                                {t.replace(t[0], t[0].toUpperCase())}
                            </span>
                        </div>
                    )}
                    else{
                        return (
                            <div key={t.name}>
                                <span>
                                    {t.name[0].toUpperCase() + t.name.slice(1)}
                                </span>
                            </div>
                        )
                    }
                })}
            </div>
            <div>
                <img className="img" src={image ? image : pokesilueta } alt="Pokemon not found"  width="150px" height="150px"/>
            </div>
            <div>
                <div>{id.length > 10 ? <button onClick={e => handleClick(e, id)}>Free this Pokémon</button>: null}</div>
            </div>
        </div>
    )
}