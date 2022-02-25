const express = require('express');
const app = express();

const fs = require ('fs');
app.use(express.json());


app.get('/pets/:index?', (req, res) => {
    fs.readFile('pets.json', "utf-8", (err, data) => {
        console.log(req.params.index)
        if (err) {
            res.status(500) 
                res.send('Ow0 uh oh. big boi mistake somewhere')
            
        } else {
        const index = req.params.index
        const parsedData = JSON.parse(data);
        res.send(parsedData[index]);
        }
    });
    console.log(req.method);

    
   
})
app.post('/pets', (req, res) => {
    console.log(req.body);
    // var tempObj = (req.params.index);
    // console.log(typeof tempObj);
    res.send('');
}


)
app.post('/test', (req, res) => {
   res.json(req.body)

    
  });
let port = 3001
app.listen(port);
console.log('running on ' + port);