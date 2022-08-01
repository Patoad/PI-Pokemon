import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage(){
    return (
        <div>
            <h1 className='h1'>Pokedex App</h1>
            <Link to = './home'>
                <div className="pokeball">
                    <div className="pokeball__button"></div>
                </div>
            </Link>
        </div>
    )
}