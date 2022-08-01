import React from "react";
import "./Paginate.css";

export default function Paginated({
  pokemonsPerPage,
  allPokemons,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  const nextDisabled = currentPage === pageNumbers.length;

  const prevDisabled = currentPage === 1;

  return (
    <div>
      <div>
        <button 
          disabled={prevDisabled}
          onClick={() => paginate(currentPage - 1)}
        >
          Prev
        </button>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
        <button
          disabled={nextDisabled}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// import React from "react";
// import './Paginate.css';

// export default function Paginate({ pokemonsPerPage, allPokemons, paginate, currentPage }) {
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
//         pageNumbers.push(i);
//     }

//  const nextDisabled = currentPage === pageNumbers.length;
//  const prevDisabled = currentPage === 1;

//     return (
//         <nav className="paginate">
//           <button 
//               disabled={prevDisabled}
//              onClick={() => paginate(currentPage - 1)}
//         >
//           Prev
//         </button>
//             {pageNumbers &&
//             pageNumbers.map((number) => (
//                 <div key={number}>
//                     <button className="numero" onClick={() => paginate(number)}>{number}</button>
//                     </div>
//             ))}
//         <button
//           disabled={nextDisabled}
//           onClick={() => paginate(currentPage + 1)}
//         >
//           Next
//         </button>
//     </nav>
//   );
// }