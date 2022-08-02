require("dotenv").config();
const { Router } = require("express");
const router = Router();
const { Pokemon, Types } = require("../db");
const axios = require("axios");
const url = `https://pokeapi.co/api/v2/pokemon`;

// const getApiInfo = async () => {
//     const pokeRequest1 = await axios.get(url);
//     const pokeRequest2 = await axios.get(pokeRequest1.data.next);
//     const allRequest = pokeRequest1.data.results.concat(
//       pokeRequest2.data.results
//     );
//     const promises = allRequest.map((e) => axios.get(e.url));
//     const allData = await Promise.all(promises);
//     return allData.map((e) => {
//       return {
//         id: e.data.id,
//         name: e.data.name,
//         hp: e.data.stats[0]["base_stat"],
//         attack: e.data.stats[1]["base_stat"],
//         defense: e.data.stats[2]["base_stat"],
//         speed: e.data.stats[5]["base_stat"],
//         height: e.data.height,
//         weight: e.data.weight,
//         image: e.data.sprites.other.home.front_default,
//         types: e.data.types.map((e) => e.type.name),
//         created: false,
//       };
//     });
//   };

const getApiInfo = async () => {
  try {
    const pokeRequest1 = await axios.get(url);
    const pokeRequest2 = await axios.get(pokeRequest1.data.next);
    const allRequest = pokeRequest1.data.results.concat(
      pokeRequest2.data.results
    );
    const promises = allRequest.map((e) => axios.get(e.url));
    const allData = await Promise.all(promises);
    const pokeData = await allData.map((e) => {
      return {
        id: e.data.id,
        name: e.data.name,
        hp: e.data.stats[0]["base_stat"],
        attack: e.data.stats[1]["base_stat"],
        defense: e.data.stats[2]["base_stat"],
        speed: e.data.stats[5]["base_stat"],
        height: e.data.height,
        weight: e.data.weight,
        image: e.data.sprites.other.home.front_default,
        types: e.data.types.map((e) => e.type.name),
        created: false,
      };
    });
    return pokeData;
  } catch (error) {
    console.log(error);
  }
};

const getDbInfo = async () => {
  const infoDB = await Pokemon.findAll({
    include: {
      model: Types,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
    attributes: [
      "id",
      "name",
      "image",
      "created",
      "hp",
      "attack",
      "defense",
      "speed",
      "height",
      "weight",
    ],
  });
  return infoDB;
};

const getAllPokemons = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
  } catch (error) {
    console.log(error);
  }
};

const getPokemonByIdApi = async (id) => {
  const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonData = {
    id: apiUrl.data.id,
    name: apiUrl.data.name,
    image: apiUrl.data.sprites.other.home.front_default,
    types: apiUrl.data.types.map((e) => e.type.name),
    height: apiUrl.data.height,
    hp: apiUrl.data.stats[0]["base_stat"],
    attack: apiUrl.data.stats[1]["base_stat"],
    defense: apiUrl.data.stats[2]["base_stat"],
    speed: apiUrl.data.stats[5]["base_stat"],
    weight: apiUrl.data.weight,
  };
  return pokemonData;
};

// const getPokemonByNameApi = async (name) => {
//     try {
//         const apiNames = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
//         const apiNamesData = apiNames.data.map(p => {
//             return {
//                 id: p.id,
//                 name: p.name,
//                 image: p.sprites.other.home.front_default,
//                 types: p.types.map(p => p.name),
//             }
//         });
//         let array = [];
//         if(apiNamesData.length > 12){
//             for(let i = 0; i <= 11; i++){
//                 array.push(apiNamesData[i]);
//             }
//             return array;
//         }
//         return apiNamesData;
//     }catch(e){
//         console.log(e);
//     }
// };

//         const apiNamesData = apiNames.data.results.map(e => {
//             return {
//                 id: e.id,
//                 name: e.name,
//                 image: e.background_image,
//                 types: e.types.map(e => e.name)
//             }
//         });
//         let array = [];
//         if(apiNamesData.length > 15){
//             for(let i = 0; i <= 14; i++){
//                 array.push(apiNamesData[i]);
//             }
//             return array;
//         }
//         return apiNamesData;
//     }catch(e){
//         console.log(e);
//     }
// };

const getPokemonByNameBd = async (name) => {
  try {
    const pokemons = await Pokemon.findAll({
      where: {
        name: { name },
      },
      include: [
        {
          model: Types,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: ["id", "name", "image"],
    });
    return pokemons;
  } catch (e) {
    console.log(e);
  }
};

// const getByNameTotal = async (name) => {
//     try{
//         const apiName = await getPokemonByNameApi(name);
//         const dbName = await getPokemonByNameBd(name);
//         const totalNames = apiName.concat(dbName);
//         return totalNames;
//     }catch(e){
//         console.log(e)
//     }
// }

//-------------------------------------------------------------------------------------------------------

router.get("/", async (req, res) => {
  const name = req.query.name;
  const pokemons = await getAllPokemons();
  // console.log("Pokemons--------: " + pokemons);
  if (name) {
    const pokemonsName = await pokemons.filter(
      (e) => e.name.toLowerCase() === name
    );
    pokemonsName.length
      ? res.status(200).send(pokemonsName)
      : res
          .status(404)
          .send("The pokemon you're looking for does not exist... yet");
  } else {
    res.status(200).send(pokemons);
  }
});

// router.get('/', async (req, res) => {
//     const name = req.query.name;
//     const pokemonsAll = await getAllPokemons();
//     const pokemonsByName = await getByNameTotal(name);
//     if (name) {
//         const pokemonsName = await pokemonsByName.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
//         pokemonsName.length?
//             res.status(200).send(pokemonsName) :
//             res.status(404).send("The pokemon you're looking for does not exist... yet");
//     }else{
//         res.status(200).send(pokemonsAll)
//     }
// });

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      const pokeMaster = await Pokemon.findByPk(id, {
        include: {
          model: Types,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      res.json(pokeMaster);
    } else {
      res.json(await getPokemonByIdApi(id));
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res, next) => {
  const { name, image, types, height, hp, attack, defense, speed, weight } =
    req.body;
  try {
    const newPokemon = await Pokemon.create({
      name,
      image,
      types,
      height,
      hp,
      attack,
      defense,
      speed,
      weight,
    });
    const typesDb = await Types.findAll({
      where: {
        name: types,
      },
    });
    newPokemon.addType(typesDb);
    res.send(`A new pokemon has been born! It's name is ${name}!`);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    Pokemon.destroy({ where: { id } });
    res.send("Pokemon information has been deleted");
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updatePoke = await Recipe.update(body, {
      where: { id: id },
    });
    console.log(updatePoke);
    res.status(200).send(updatePoke);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
