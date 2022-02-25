"use strict";
const http = require("http");
const port = process.env.PORT || 8080;
const fs = require("fs");
const DATA_PATH = "pets.json";
const petRegExp = /^\/pets\/(\d+)$/;

const server = http.createServer(function (req, res) {
  if (req.method === "GET" && req.url === "/pets") {
    fs.readFile(DATA_PATH, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.statusMessage = "problem with json file";
        req.end();
      } else {
      console.log(data, "data");
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(data);
      res.end("\n" + "Good test on port 8080");
      }
    });
  } else if (req.method === "GET" && petRegExp.test(req.url)) {
    var index = req.url.match(petRegExp)[1];
    
    fs.readFile(DATA_PATH, "utf-8", (err, data) => {
        var parsedData  = JSON.parse(data);
    
      if (err) {
        res.statusCode = 500;
        res.statusMessage = "problem with json file";
        req.end();

      } else if(parsedData[index] === undefined) {
        res.statusCode = 404;
        res.statusMessage = "Pgae no exist my frien";
        res.end("nothin here frien :(");

      } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(parsedData[index]));
      res.end("Good test on port 8080");
      }
    });
  } else {
      res.statusCode = 404;
      res.statusMessage = "Pgae no exist my frien";
      res.end("nothin here frien :(");
  }
});
server.listen(port, function () {
  console.log("Listening on port", port);
});
