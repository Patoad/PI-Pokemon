import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getTypes, getPokemons, postPokemon } from "../../Actions";
import { Link, useHistory } from "react-router-dom";
import './Form.css';



function validate(input){
    let noEmpty = /\S+/;
    let validateName = /^.{5,15}$/;
    let errors = {};
    if(!input.name){
        errors.name = 'The name is required';
    }
    else if(!noEmpty.test(input.name)){
        errors.name = 'The name cannot start with a blank space';
    }
    else if(!validateName.test(input.name)){
        errors.name = 'The name must be between 5 and 15 characters long';
    }
    else if (input.description === null || !input.description){
        errors.description = 'Description is required';
    }
    else if (input.description.length < 5 || input.description.length > 30000){
        errors.description = 'This field must be between 5 and 3000 characters long';
    }
    if(input.types.length === 0){
        errors.types = 'At least one type is required'
    }
    else if(input.types.length > 2){
        errors.types = 'You can only choose 2 types per pokemon';
    }
    else if(input.types[0] === input.types[1]){
        errors.types = "You can't choose the same type twice";
    }
    return errors;
}


export default function Form(){
    const dispatch = useDispatch();
    const allTypes = useSelector(state => state.types);
    let allPokemons = useSelector(state => state.pokemons);
    allPokemons = (allPokemons.map((e, i) => e.platforms)).join(',').split(',');
    allPokemons = [...new Set(allPokemons)].map((e,i) => ({'name':e, 'id':i}))
    
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    },[dispatch])
    
    const [input, setInput] = useState({
        name: "",
        description: "",
        types: [],
        image: "",
        HP: "",
        speed: "",
        attack: "",
        defense: "",
        height: "",
        weight: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(postPokemon(input))
        alert(`A new pokemon has been born! It's name is} ${input.name}`)
        setInput({
            name: "",
            description: "",
            types: [],
            image: "",
            HP: "",
            speed: "",
            attack: "",
            defense: "",
            height: "",
            weight: "",
        })
        history.push('/home')
    }

    function handleChange (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleTypesSelect (e) {
        if(e.target.checked){
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
            setErrors(validate({
                ...input,
                types: [...input.types, e.target.value]
            }))
        }else{
            let filt = [...input.types];
            filt.splice(filt.indexOf(e.target.value), 1);
            setInput({
                ...input,
                types: filt
            })
            setErrors(validate({
                ...input,
                types: filt,
            }));
        }
    }
    return (
        <div>
            <div>
                <Link to='/home'>
                <button className="gohome">Go Home</button>
                </Link>
            </div>
            <h1 className='form-title'>Pokemon Factory</h1>
            <br />
            <br />
            <form onSubmit={e => handleSubmit(e)}>
            <div className="nameInput">
                <label className='lname'>Pokemon name: </label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={e => handleChange(e)}
                    />
                    {errors.name && <p style={{ color: "aqua" }}>{errors.name}</p>}
                </div>
                <br />
                <br />
                <br />
                <div>
                    <label className="ldescription">Description: </label>
                        <input className="textarea"
                            type="textarea"
                            name="description"
                            value={input.description}
                            onChange={e => handleChange(e)}
                        />
                    {errors.description && <p style={{ color: "aqua" }}>{errors.description}</p>}
                </div>
                <br />
                <div className="image2">
                    <label className='limage2'>Put an image URL of the pokemon: </label>
                    <input
                    type="text"
                    name="image"
                    value={input.image}
                    alt="My pokemon :)"
                    onChange={e => handleChange(e)}
                    />
                </div>
                <br />
                {/* <div>
                    <label className='lreleased'>Released: </label>
                    <input
                        type="date"
                        name="released"
                        value={input.released}
                        onChange={e => handleChange(e)}
                        max={new Date().toISOString().split('T')[0]}
                    />
                    {errors.released && <p style={{ color: "aqua" }}>{errors.released}</p>}
                </div> */}
                <br />
                <br />
                <div>
                    <div>
                    <label className="ltypes">types: </label>
                    </div>
                    <br />
                    <div>
                        {allTypes.map((types, i) => {
                            return (
                                <div className='types' key= {i}>
                                    <input
                                        id={i}
                                        name={types.name}
                                        type="checkbox" 
                                        value={types.name}
                                        onChange={(e) => handleTypesSelect(e)}
                                    />
                                    <label>{types.name}</label>
                                </div>
                            )
                        })}
                        {errors.types && <p style={{ color: "aqua" }}>{errors.types}</p>}
                    </div>
                </div>
                <br />
                <div>
                    <br />
                </div>
                <div>
                    <input
                        className="button2"
                        type="submit"
                        value={input.created}
                        disabled={Object.keys(errors).length > 0 ||
                            input.name === "" ||
                            input.description === "" ||
                            input.released === "" ||
                            input.rating === "" ||
                            input.types.length === 0 ||
                            input.platforms.length === 0}
                        />
                </div>
            </form>
        </div>
    )
}