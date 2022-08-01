import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByHP } from '../../../../Actions';


export default function ByHP() {
    const dispatch = useDispatch();

    function handleOnChange(e){
        e.preventDefault()
        dispatch(orderByHP(e.target.value))
    }

    return(
        <div>
            <br></br>
            <div className="label">By HP</div>
            <br></br>
            <select onChange={e => handleOnChange(e)}>
                <option value="All">Default</option>
                <option value="Asc">Weak to Powerful</option>
                <option value="Desc">Powerful to Weak</option>
            </select>
        </div>
    )
}