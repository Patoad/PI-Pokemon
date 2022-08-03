const initialState= {
    pokemons: [],
    types: [],
    details: {},
    allPokemons: [],
    createPoke: [],
    filters: []
}


export default function rootReducer(state= initialState, action){
    switch (action.type) {
        case "GET_POKEMONS":
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            };
        case "GET_POKEMON_BY_NAME":
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            };
        case "GET_POKEMON_BY_ID":
            return{
                ...state,
                details: action.payload
            };
        case "GET_TYPES":
            return{
                ...state,
                types: action.payload
            }

        case "FILTER_BY_TYPES":
            const allPokemons = state.allPokemons;
            const array = [];
            const typesFiltered = action.payload === "All" ? allPokemons
            : (() => {for(let i = 0; i < allPokemons.length; i++){
                if(isNaN(allPokemons[i].id)){
                    if(allPokemons[i].types.map(e => e.name).includes(action.payload)){
                    array.push(allPokemons[i])}
                }
                if(allPokemons[i].types.includes(action.payload)){
                    array.push(allPokemons[i])
            }}return array})()
            return{
                ...state,
                pokemons: typesFiltered,
                filters: typesFiltered
            }

        case "ORDER_BY_NAME":
        let allPokes = [...state.pokemons]
        allPokes = allPokes.sort((a,b) =>{
            if(a.name.toLowerCase() < b.name.toLowerCase()) {
            return action.payload === 'Asc' ? -1 : 1
            }
            if(a.name.toLowerCase() > b.name.toLowerCase()) {
            return action.payload === 'Desc' ? -1 : 1
            }
            else{
            return 0}
        })
        return {
            ...state,
            pokemons: action.payload === 'All' ? state.allPokemons : allPokes
        }

        case "ORDER_BY_ATTACK":
            const all = [...state.pokemons]
            const orderByAttack = all.sort((a,b) => {
                if(a.attack < b.attack){
                    return action.payload === 'Asc' ? -1 : 1
                }
                if(a.attack > b.attack){
                    return action.payload === 'Desc' ? -1 : 1
                }return 0
            })
            return{
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons : orderByAttack
            }

        case "ORDER_BY_CREATION":
            let filter;
            if(state.filters.length === 0){
                let allPokes = [...state.allPokemons];
                filter = action.payload === 'api' ? allPokes.filter(e => e.created === false) : allPokes.filter(e => e.created === true)
                return{
                    ...state,
                    pokemons: action.payload === 'all' ? allPokes : filter
                }
            }else if(state.filters.length > 0){
                let allPokes = [...state.filters];
                filter = action.payload === 'api' ? allPokes.filter(e => e.created === false) : allPokes.filter(e => e.created === true)
                return{
                    ...state,
                    pokemons: action.payload === 'all' ? allPokes : filter
                }
            }return

        case "POST_POKEMON":
            return {
                ...state
            };

        case "RESET_POKEMONS":
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case "DELETE_POKEMON":
            return {
                ...state,
                pokemons: state.pokemons.filter(e => e.id !== action.payload),
                allPokemons: state.allPokemons.filter(e => e.id !== action.payload)
            }

        default:
            return state;
    }
};