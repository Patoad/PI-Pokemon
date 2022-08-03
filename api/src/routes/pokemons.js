require("dotenv").config();
const { Router } = require("express");
const router = Router();
const { Pokemon, Types } = require("../db");
const axios = require("axios");
const url = `https://pokeapi.co/api/v2/pokemon`;


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

const getApiName = async (name) => {
  try {
      const namesApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const results = namesApi.data;
      const pokemonInfo = {
          id: results.id,
          name: results.name,
          types: results.types.map((t) => t.type.name),
          image: results.sprites.other.home.front_default,
      };
      return pokemonInfo;
  } catch (e) {
      if (e.status === 404) return null;
  }
};
//-------------------------------------------------------------------------------------------------------

router.get("/", async (req, res) => {
  const name = req.query.name;
  if (name) {
      const pokemonName = await getApiName(name.toLowerCase());
      if (pokemonName) {
          return res.status(200).send([pokemonName]);
      } else {
          const pokemonsDb = await getDbInfo();
          const pokemon = pokemonsDb.filter(e => e.name.toLowerCase() == name.toLowerCase());
          return pokemon.length
          ? res.status(200).send(pokemon)
          : res.status(404).send("Pokemon not found");
      }
  } else {
      const pokemonsTotal = await getAllPokemons();
      return res.status(200).send(pokemonsTotal);
  }
});

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

module.exports = router;