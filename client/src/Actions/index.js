import axios  from 'axios';

export function getPokemons(){
    return async function(dispatch){
        try{
            let json = await axios.get('http://localhost:3001/pokemons');
            return dispatch({
                type: "GET_POKEMONS",
                payload: json.data
            })
        } catch(e){
            console.log(e)
        }
    }
};

export function getPokemonByNames(name){
    return async function(dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({
                type:"GET_POKEMON_BY_NAME",
                payload: json.data
            })
        }catch(e){
            alert("Pokemon not found")
            console.log(e)
        }
    }
}

export function getPokemonById(id){
    return async function(dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/pokemons/${id}`);
            return dispatch({
                type: "GET_POKEMON_BY_ID",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
};

export function getTypes(){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/types');
            return dispatch({
                type: "GET_TYPES",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function orderByTypes(payload) {
    return {
        type: 'FILTER_BY_TYPES',
        payload
    }
}

export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    }
};

export function orderByCreation(payload){
    return {
        type: "ORDER_BY_CREATION",
        payload
    }
};

export function orderByAttack(payload){
    return {
        type: "ORDER_BY_ATTACK",
        payload
    }
};

export function filter(payload){
    return {
        type: "FILTER_BY_ATTACK",
        payload
    }
};


export function createPokemon(pokemon){
    return async function(){
        const crear= axios.post(`http://localhost:3001/pokemons`, pokemon)
        return crear.data
    }
}


export function postPokemon(pokemon){
    return async function(dispatch){
        const created= await axios.post(`http://localhost:3001/pokemons`, pokemon)
        console.log(created)
        return created;
    }
}


export function deletePokemon(id) {
    return async function(dispatch){
        await axios.delete(`http://localhost:3001/pokemons/${id}`)
        dispatch({type: "DELETE_POKEMON", payload: id})
        getPokemons()(dispatch)
    }
}

export function reset_pokemons(){
    return{
        type: "RESET_POKEMONS",
        payload:[]
    }
}