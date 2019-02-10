const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    const hops = { data: '5' };
    res.send(hops);
});

module.exports = router;