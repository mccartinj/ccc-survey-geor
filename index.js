const fs = require('fs');
const path = require('path');
const csvToJson = require('convert-csv-to-json');
const ObjectsToCsv = require('objects-to-csv');



fs.readdir('./data/inputs', (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    
    let fileInputName = './data/inputs/'+file;
    console.log(fileInputName);
    let flatPoints = [];

    let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName);
    for(let row=0; row<json.length;row++){
        
        for(let pointNum = 1; pointNum <=10; pointNum++ ) {
            let point = {};
            point.rid = json[row]["rid"]
            point.x = json[row][pointNum+"X"];
            point.y = json[row][pointNum+"Y"] * -1;


            if(point.rid && point.x && point.y) {
                flatPoints.push(point);
            }
        }


    }
    new ObjectsToCsv(flatPoints).toDisk('./data/outputs/'+file,{header:true});


    
  });
});
