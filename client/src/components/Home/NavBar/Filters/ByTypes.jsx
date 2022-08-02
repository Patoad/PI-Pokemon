import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderByTypes } from "../../../../Actions";

export default function ByTypes() {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types); // estado global, viene del reducer y son los tipos que vienen del llamado a la API
  const allPokes = useSelector((state) => state.allPokemons); // estado global, viene del reducer y son todos los pokemones que vienen del llamado a la API
  // allPokes.map
  function handleOnChange(e) {
    e.preventDefault();
    console.log(types);
    dispatch(orderByTypes(e.target.value));
  }

  let showTypes = [];
  // eslint-disable-next-line 
  const soloTypes = allPokes.map((poke) => {
    poke.types.forEach((e) => {
      if (!showTypes.includes(e)) {
        if (!e.name) {
          showTypes.push({ name: e });
        } else {
          showTypes.push(e);
        }
      }
    });
  });
  
  showTypes = showTypes.filter(
    (value, index, self) => index === self.findIndex((t) => t.name === value.name)
  );

  return (
    <div>
      <br></br>
      <div className="label">By Types</div>
      <br></br>
      <select onChange={(e) => handleOnChange(e)}>
        <option value="All">All</option>
        {showTypes && showTypes.map((e) => (<option value={e.name} key={e.name}>{e.name}</option>))}
      </select>
    </div>
  );
}
