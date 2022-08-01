import React, { useState } from 'react';
import { getPokemonByNames } from '../../../Actions/index';
import { useDispatch } from 'react-redux';
import './SearchBar.css';


export default function SearchBar(){  
    const [name, setName] = useState('')
    const dispatch = useDispatch();

    function handleOnChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemonByNames(name))
        setName('');
    };

    function handleKeyPress(e){
        if(e.key === 'Enter'){
            handleClick(e);
        }
    }

    return (
        <div>
            <div>
                <h1 className='h1'>Pokemon's Home</h1>
                <input
                    type="text"
                    placeholder="Pokemon search..."
                    value={name}
                    onChange={e => handleOnChange(e)}
                    onKeyPress={e => handleKeyPress(e)}
                />
                <button 
                type="submit"
                onClick={e => handleClick(e)}
                >Search</button>
            </div>
            <br></br>
            <br></br>
        </div>
    )
}