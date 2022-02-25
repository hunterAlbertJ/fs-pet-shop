var fs = require("fs");
var inputFromTerminal = process.argv[2];
if (process.argv[2] === undefined) {
    console.error("Usage: node pets.js [read | create | update | destroy]");
}
if(inputFromTerminal === 'read'){
    var index = Number(process.argv[3]);

    fs.readFile("./pets.json", "utf8", (err, data) =>{
        if (err){
            throw err
        } else {
        var parsedData = JSON.parse(data);

        if (parsedData[index] !== undefined) {
            console.log(parsedData[index]);
            
        } else {
            console.log(parsedData);
            console.error('Usage: node pets.js read INDEX');
        }
    }
    });
}
        
var newPet = {};
if (inputFromTerminal === 'create'){
    if (process.argv[5] === undefined) {
        console.error("Usage: node pets.js create AGE KIND NAME");
    } else {

    var newPet = {};
    newPet.age = Number(process.argv[3]);
    newPet.kind = process.argv[4];
    newPet.name = process.argv[5];

    fs.readFile("./pets.json", "utf8", (err, data) =>{
        if (err){
            throw err
        } else {
        var parsedData = JSON.parse(data);

        parsedData[parsedData.length] = newPet;
        


    var toWrite = JSON.stringify(parsedData);
    console.log('Written Successfully')
    fs.writeFileSync('./pets.json', toWrite);
        }
    });
}

}
if (inputFromTerminal === 'update'){
    if (process.argv[6] === undefined) {
        console.error("Usage: node pets.js update INDEX AGE KIND NAME");
    } else {
        var updatedPet = {};
    updatedPet.age = Number(process.argv[4]);
    updatedPet.kind = process.argv[5];
    updatedPet.name = process.argv[6];

    fs.readFile("./pets.json", "utf8", (err, data) =>{
        if (err){
            throw err
        } else {
        var parsedData = JSON.parse(data);

        parsedData[process.argv[3]] = updatedPet;
        


    var toWrite = JSON.stringify(parsedData);
    console.log('Written Successfully')
    fs.writeFileSync('./pets.json', toWrite);
        }
    });
}
}


if (inputFromTerminal === 'destroy'){
    if (process.argv[3] === undefined) {
        console.error("Usage: node pets.js destroy INDEX");
    } else {
        
    fs.readFile("./pets.json", "utf8", (err, data) =>{
        if (err){
            throw err
        } else {
        var parsedData = JSON.parse(data);

        parsedData.splice(process.argv[3], 1);
        console.log(`Data at index ${process.argv[3]} deleted.`)
    
    var toWrite = JSON.stringify(parsedData);
    fs.writeFileSync('./pets.json', toWrite);
        }
    });
}
}