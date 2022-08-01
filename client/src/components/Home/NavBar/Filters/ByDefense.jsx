import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByDefense } from '../../../../Actions';


export default function ByDefense() {
    const dispatch = useDispatch();

    function handleOnChange(e){
        e.preventDefault()
        dispatch(orderByDefense(e.target.value))
    }

    return(
        <div>
            <br></br>
            <div className="label">By Defense</div>
            <br></br>
            <select onChange={e => handleOnChange(e)}>
                <option value="All">Default</option>
                <option value="Asc">Weak to Powerful</option>
                <option value="Desc">Powerful to Weak</option>
            </select>
        </div>
    )
}