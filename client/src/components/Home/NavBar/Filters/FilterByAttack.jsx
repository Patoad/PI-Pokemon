import React from 'react';
import { useDispatch } from 'react-redux';
import { filter } from '../../../../Actions';


export default function FilterByAttack() {
    const dispatch = useDispatch();

    function handleOnChange(e){
        e.preventDefault()
        dispatch(filter(e.target.value))
    }

    return(
        <div>
            <br></br>
            <div className="label">Filter By Attack</div>
            <br></br>
            <select onChange={e => handleOnChange(e)}>
                <option value="All">Default</option>
                <option value="Asc">Filtered</option>
            </select>
        </div>
    )
}