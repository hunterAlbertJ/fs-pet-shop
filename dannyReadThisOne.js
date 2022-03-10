
const express = require("express");
const app = express();

const fs = require("fs");
app.use(express.json());

const { Pool } = require("pg");

const pool = new Pool({
  database: "petshop",
});

app.get("/pets/:index?", (req, res) => {
  const index = req.params.index;
  if (index !== undefined) {
    pool.query("SELECT * FROM pets WHERE id = $1", [index], (err, result) => {
      console.log(result.rows[0]);
      res.send(result.rows[0]);
    });
  } else {
    pool.query("SELECT * FROM pets", (err, result) => {
      console.log(result.rows);
      res.send(result.rows);
    });
  }
});

app.patch("/pets/:index", (req, res) => {
  const id = req.params.index;
  const { age, name, kind } = req.body;
  const query = `
  UPDATE pets SET
    age = COALESCE($1, age),
    name = COALESCE($2, name),
    kind = COALESCE($3, kind)
  WHERE id = $4
  RETURNING *
  `;
  pool.query(query, [age, name, kind, id]);
  res.send("updated")
});

app.post("/pets", (req, res) => {
  if (
    req.body.name === undefined ||
    req.body.age === undefined ||
    req.body.kind === undefined
  ) {
    res.status(400);
    res.send(
      'Format must be "{ "name": "PET_NAME", "age": "AGE_IN_YEARS", "kind": "ANIMAL_TYPE"}"'
    );
  } else {
    const { age, name, kind } = req.body;
    const query = `
    INSERT INTO pets (name, age, kind) VALUES ($2,$1,$3);
    `;
    pool.query(query, [age, name, kind]);
  }
  res.send("Creature Added");
});

app.delete("/pets/:index?", (req, res) => {
  const index = req.params.index;
  if (index !== undefined) {
    pool.query("DELETE FROM pets WHERE id = $1", [index], (err, result) => {
      res.send(index + "  index deleted");
      if(err){
        res.status(400) 
        res.send('URL MUST INCLUDE VALID INDEX')
      }
    });
  }

  });


let port = 3001;
app.listen(port);
console.log("running on " + port);
