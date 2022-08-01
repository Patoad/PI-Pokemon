const { Router } = require('express');
const router = Router();
const { Types } = require('../db');
const axios = require('axios');
const url = `https://pokeapi.co/api/v2/type/`;

router.get('/', async (req, res, next) => {
    try {
        let types = await axios.get(url);
        types = types.data.results;
        types.forEach(e => {
            Types.findOrCreate({
                where: {
                    name: e.name}
            })
        });
        const allTypes = await Types.findAll();
        res.send(allTypes);
    }
    catch(e) {
        next(e);
    }
});

module.exports = router