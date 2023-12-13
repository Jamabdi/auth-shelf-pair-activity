const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  console.log("is authenticated?", req.isAuthenticated());
 console.log("user?", req.user);
  let queryText = `SELECT * FROM "item"`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});



/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  console.log("/pet POST route");
  console.log(req.body);
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user?", req.user);

  if(req.isAuthenticated()) {
    let queryText = 'INSERT INTO "item" ("description", "image_url") VALUES ($1, $2);';
    pool.query(queryText, [req.body.description, req.image.id]).then(result => {
      res.sendStatus(201);
    }).catch((e) => {
      console.error(e);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(401);
  }
});

/**
 * Delete an item
 */
// router.delete('/:id', (req, res) => {
//   let queryText = ` DELETE FROM "item" WHERE "id" = $1;`;
//   pool.query()
// )}


module.exports = router;
