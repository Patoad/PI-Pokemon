import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByName } from '../../../../Actions';

export default function AlphabeticalOrder(){
    const dispatch = useDispatch();

    function handleOnChange(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
    };

    return(
        <div>
            <br></br>
            <div className="label">Alphabetical Order
            <br></br>
            <br></br>
            </div>
            <select onChange={e => handleOnChange(e)}>
                <option value="All">Default</option>
                <option value="Asc">A - Z</option>
                <option value="Desc">Z - A</option>
            </select>
        </div>
    )
}