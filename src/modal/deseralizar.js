const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('./Reporte.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        const jsonData = JSON.stringify(results);
        fs.writeFileSync('archivo.json', jsonData);
        console.log('Archivo .csv deserializado exitosamente en formato .json');
    });