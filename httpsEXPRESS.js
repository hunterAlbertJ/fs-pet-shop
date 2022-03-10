const express = require("express");
const app = express();

const fs = require("fs");
app.use(express.json());

app.get("/pets/:index?", (req, res) => {
  fs.readFile("pets.json", "utf-8", (err, data) => {
    console.log(req.params.index);
    if (err) {
      res.status(500);
      res.send("Ow0 uh oh. big boi mistake somewhere");
    } else {
      const index = req.params.index;
      if (index !== undefined) {
        const parsedData = JSON.parse(data);
        console.log(`Request is: ${req.method}. Index is ${index} `);
        res.send(parsedData[index]);
      } else {
        const parsedData = JSON.parse(data);
        console.log(`Request is: ${req.method}. Index is: ${index} `);
        res.send(parsedData);
      }
    }
  });
  
});
app.post("/pets", (req, res) => {
  var newPetObj = {};
  if(req.body.name === undefined || req.body.age === undefined || req.body.kind === undefined) {
    res.status(400);
    res.send('Format must be "{ "name": "PET_NAME", "age": "AGE_IN_YEARS", "kind": "ANIMAL_TYPE"}"');
  } else {

  
  newPetObj.name = req.body.name;
  newPetObj.age = req.body.age;
  newPetObj.kind = req.body.kind;
  console.log(`New pet object is ${newPetObj.kind}`);

  fs.readFile("pets.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500);
      res.send("Error in writing new data");
    } else {
      var parsedData = JSON.parse(data);
      parsedData[parsedData.length] = newPetObj;
      var toWrite = JSON.stringify(parsedData);
      console.log("Written Successfully");
      fs.writeFileSync("./pets.json", toWrite);
    }
  });
  res.send("Creature Added");
}
});
app.post("/test", (req, res) => {
  res.json(req.body);
});
let port = 3001;
app.listen(port);
console.log("running on " + port);
