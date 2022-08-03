import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getTypes, getPokemons, postPokemon } from "../../Actions";
import { Link, useHistory } from "react-router-dom";
// import './Form.css';



function validate(input){
    let noEmpty = /\S+/;
    let validateName = /^.{3,20}$/;
    let errors = {};


    if(!input.name){
        errors.name = 'The name is required';
    }
    else if(!noEmpty.test(input.name)){
        errors.name = 'The name cannot start with a blank space';
    }
    else if(!validateName.test(input.name)){
        errors.name = 'The name must be between 3 and 20 characters long';
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
    else if(input.types[0] === !noEmpty && input.types[1].length > 0){
        errors.types = "Primary type goes first";
    }
    else if(!input.attack){
        errors.attack = 'The attack is required';
    }
    else if(!noEmpty.test(input.attack)){
        errors.attack = 'The attack cannot start with a blank space';
    }
    else if(input.attack < 1 || input.attack > 9999){
        errors.attack = 'attack must be between 1 and 9999';
    }
    else if(!(/^\d*(\.\d{1})?\d{0,1}$/).test(input.attack)){
        errors.attack = 'attack must have only 2 decimal places'
    }
    else if(!input.hp){
        errors.hp = 'The HP is required';
    }
    else if(!noEmpty.test(input.hp)){
        errors.hp = 'The HP cannot start with a blank space';
    }
    else if(input.hp < 1 || input.hp > 9999){
        errors.hp = 'HP must be between 1 and 9999';
    }
    else if(!(/^\d*(\.\d{1})?\d{0,1}$/).test(input.hp)){
        errors.hp = 'HP must have only 2 decimal places'
    }
    else if(!input.speed){
        errors.speed = 'The speed is required';
    }
    else if(!noEmpty.test(input.speed)){
        errors.speed = 'The speed cannot start with a blank space';
    }
    else if(input.speed < 1 || input.speed > 9999){
        errors.speed = 'speed must be between 1 and 9999';
    }
    else if(!(/^\d*(\.\d{1})?\d{0,1}$/).test(input.speed)){
        errors.speed = 'speed must have only 2 decimal places'
    }
    else if(!input.defense){
        errors.defense = 'The defense is required';
    }
    else if(!noEmpty.test(input.defense)){
        errors.defense = 'The defense cannot start with a blank space';
    }
    else if(input.defense < 1 || input.defense > 9999){
        errors.defense = 'defense must be between 1 and 9999';
    }
    else if(!(/^\d*(\.\d{1})?\d{0,1}$/).test(input.defense)){
        errors.defense = 'defense must have only 2 decimal places'
    }
    else if(!input.height){
        errors.height = 'The height is required';
    }
    else if(!noEmpty.test(input.height)){
        errors.height = 'The height cannot start with a blank space';
    }
    else if(input.height < 1 || input.height > 9999){
        errors.height = 'height must be between 1 and 9999';
    }
    else if(!(/^\d*(\.\d{1})?\d{0,1}$/).test(input.height)){
        errors.height = 'height must have only 2 decimal places'
    }
    else if(!input.weight){
        errors.weight = 'The weight is required';
    }
    else if(!noEmpty.test(input.weight)){
        errors.weight = 'The weight cannot start with a blank space';
    }
    else if(input.weight < 1 || input.weight > 9999){
        errors.weight = 'weight must be between 1 and 9999';
    }
    else if(!(/^\d*(\.\d{1})?\d{0,1}$/).test(input.weight)){
        errors.weight = 'weight must have only 2 decimal places'
    }
    return errors;
}


export default function Form(){
    const dispatch = useDispatch();
    const allTypes = useSelector(state => state.types);
    
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    },[dispatch])
    
    const [input, setInput] = useState({
        name: "",
        types: [],
        image: "",
        hp: "",
        speed: "",
        attack: "",
        defense: "",
        height: "",
        weight: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(postPokemon(input))
        alert(`A new pokemon has been born! It's name is ${input.name}`)
        setInput({
            name: "",
            types: [],
            image: "",
            hp: "",
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
                <div>
                    <label className='lattack'>Attack: </label>
                    <input
                        type="number"
                        name="attack"
                        value={input.attack}
                        onChange={e => handleChange(e)}
                    />
                    {errors.attack && <p style={{ color: "aqua" }}>{errors.attack}</p>}
                </div>
                <br />
                <div>
                    <label className='lhp'>HP: </label>
                    <input
                        type="number"
                        name="hp"
                        value={input.hp}
                        onChange={e => handleChange(e)}
                    />
                    {errors.hp && <p style={{ color: "aqua" }}>{errors.hp}</p>}
                </div>
                <br />
                <br />
                <div>
                    <label className='lspeed'>Speed: </label>
                    <input
                        type="number"
                        name="speed"
                        value={input.speed}
                        onChange={e => handleChange(e)}
                    />
                    {errors.speed && <p style={{ color: "aqua" }}>{errors.speed}</p>}
                </div>
                <br />
                <div>
                    <label className='ldefense'>Defense: </label>
                    <input
                        type="number"
                        name="defense"
                        value={input.defense}
                        onChange={e => handleChange(e)}
                    />
                    {errors.defense && <p style={{ color: "aqua" }}>{errors.defense}</p>}
                </div>
                <br />
                <div>
                    <label className='lheight'>Height: </label>
                    <input
                        type="number"
                        name="height"
                        value={input.height}
                        onChange={e => handleChange(e)}
                    />
                    {errors.height && <p style={{ color: "aqua" }}>{errors.height}</p>}
                </div>
                <br />
                <div>
                    <label className='lweight'>Weight: </label>
                    <input
                        type="number"
                        name="weight"
                        value={input.weight}
                        onChange={e => handleChange(e)}
                    />
                    {errors.weight && <p style={{ color: "aqua" }}>{errors.weight}</p>}
                </div>
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
                            input.hp === "" ||
                            input.speed === "" ||
                            input.attack === "" ||
                            input.defense === "" ||
                            input.height === "" ||
                            input.weight === "" ||
                            input.types.length === 0}
                        />
                </div>
            </form>
        </div>
    )
}