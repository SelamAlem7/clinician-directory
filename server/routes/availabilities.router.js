const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');


// Handles the GET route
// rejectUnauthenticated prevents anyone who is not logged in to use this
// This uses a sql query and values to get the data from db on postico
router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `
    SELECT "id", "start_time", "provider_id", "end_time", "day" FROM "availabilities"
    `;
    pool.query(query)
    .then( (result) => {
        res.send(result.rows);
    })
    .catch((err) => {
        console.log('ERROR: Get all availabilties', err);
        res.sendStatus(500)
    })
});


module.exports = router;