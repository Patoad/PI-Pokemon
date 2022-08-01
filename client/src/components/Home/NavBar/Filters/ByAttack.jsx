import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByAttack } from '../../../../Actions';


export default function ByAttack() {
    const dispatch = useDispatch();

    function handleOnChange(e){
        e.preventDefault()
        dispatch(orderByAttack(e.target.value))
    }

    return(
        <div>
            <br></br>
            <div className="label">By Attack</div>
            <br></br>
            <select onChange={e => handleOnChange(e)}>
                <option value="All">Default</option>
                <option value="Asc">Weak to Powerful</option>
                <option value="Desc">Powerful to Weak</option>
            </select>
        </div>
    )
}