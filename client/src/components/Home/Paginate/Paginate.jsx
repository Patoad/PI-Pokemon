
import React from "react";
import './Paginate.css';

export default function Paginate({ pokemonsPerPage, allPokemons, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="paginate">
            {pageNumbers &&
            pageNumbers.map((number) => (
                <div key={number}>
                    <button className="numero" onClick={() => paginate(number)}>{number}</button>
                    </div>
            ))}
        </nav>
    );
}
