import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cards from './Cards/Cards';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import AlphabeticalOrder from './NavBar/Filters/AlphabeticalOrder';
import ByAttack from './NavBar/Filters/ByAttack';
import ByCreation from './NavBar/Filters/ByCreation';
import ByTypes from './NavBar/Filters/ByTypes';
import SearchBar from './NavBar/SearchBar';
import { getPokemons, getTypes, reset_pokemons } from '../../Actions';
import Paginate from './Paginate/Paginate';
import FilterByAttack from './NavBar/Filters/FilterByAttack';

export default function Home(){
    const allPokemons = useSelector(state => state.pokemons);
    const dispatch = useDispatch();
    console.log(allPokemons);
    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
        return dispatch(reset_pokemons())
    },[dispatch])
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage; // 12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; //0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    if (currentPage > Math.ceil(allPokemons.length / pokemonsPerPage) && currentPage !== 1) {
        setCurrentPage(1);
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    function handleClick(e) {
        e.preventDefault()
        dispatch(getPokemons())
    };

    return(
        <div>
            <br/>
            <br/>
            <div>
                <Link className="back" to ="/"> Take this Tauros 🐂 back to the Landing page!</Link>
            </div>
            <div className="filters">
                <div>
                <SearchBar className="search-bar"/>
            </div>
            <button className="created">
                <Link className="link" to="/pokemon">Pokemons Factory</Link>
            </button>
            <br></br>
            <br></br>
            <div className="btn">
                <button onClick={e => handleClick(e)}>Refresh Pokedex</button>
            </div>
            <div className="order">
                <ByTypes/>
                <ByCreation/>
                <AlphabeticalOrder/>
                <ByAttack/>
                <FilterByAttack/>
            </div>
            <div className='cards'>
            <Cards allPokemons={currentPokemons}/>
                </div>
                </div>
                <Paginate
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons}
                    paginate={paginate}
                /> 
        </div>
    )
}