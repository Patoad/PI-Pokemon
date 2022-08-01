import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderByTypes } from '../../../../Actions';


export default function ByTypes() {
    const dispatch = useDispatch();

    const types = useSelector(state => state.types);

    function handleOnChange(e){
        e.preventDefault()
        dispatch(orderByTypes(e.target.value))
    }

//modificar

return (
    <div>
        <br></br>
        <div className= "label">By Types</div>
        <br></br>
        <select onChange={e => handleOnChange(e)}>
            <option value="All">All</option>
            {types && types.map((e, i) => <option value={e.name} key={i}>{e.name}</option>)}
        </select>
    </div>
)
}