import React from 'react';
import load from '../Home/Cards/loadpoke.gif';
import './Loading.css';

export default function Charging() {

    return (
        <div className='charg'>
            <img src={load} alt="loading" width="85px" height="85px" />
        </div>
    )
}