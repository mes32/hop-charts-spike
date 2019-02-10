const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', function (req, res) {
    const queryText = `
    SELECT COUNT(*) FROM hops;
    `;
    pool.query(queryText).then((response) => {
        res.send(response.rows[0]);
    }).catch((error) => {
        console.log(`Error in route GET /hops, ${error}`);
    })

    
});

module.exports = router;