import React from 'react';
import { useDispatch } from 'react-redux';
import { orderBySpeed } from '../../../../Actions';


export default function BySpeed() {
    const dispatch = useDispatch();

    function handleOnChange(e){
        e.preventDefault()
        dispatch(orderBySpeed(e.target.value))
    }

    return(
        <div>
            <br></br>
            <div className="label">By Speed</div>
            <br></br>
            <select onChange={e => handleOnChange(e)}>
                <option value="All">Default</option>
                <option value="Asc">Slowbro to Speedbro</option>
                <option value="Desc">Speedbro to Slowbro</option>
            </select>
        </div>
    )
}