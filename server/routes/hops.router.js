const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', function (req, res) {
    const queryText = `
    SELECT
        id,
        variety_name,
        alpha_acid_min,
        alpha_acid_max,
        beta_acid_min,
        beta_acid_max,
        cohumulone_min,
        cohumulone_max,
        total_oil_min,
        total_oil_max
    FROM hops;
    `;
    pool.query(queryText).then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log(`Error in route GET /hops, ${error}`);
    });
});

module.exports = router;