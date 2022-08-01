import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByCreation } from '../../../../Actions';

export default function ByCreation(){
    const dispatch = useDispatch();

    function handleOnChange(e){
        e.preventDefault()
        dispatch(orderByCreation(e.target.value))
    }

    return(
        <div>
            <br></br>
            <div className="label">By Creation</div>
            <br></br>
            <select onChange={e => handleOnChange(e)}>
                <option value="all">All</option>
                <option value="api">API</option>
                <option value="db">DB</option>
            </select>
        </div>
    )
}