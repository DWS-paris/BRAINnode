/* 
Imports
*/
    const d3 = require('d3');
    global.fetch = require('node-fetch');
    const Models = require('../models/index')
//

/* 
Functions
*/
    // CRUD: create object
    const createObject = (req) => {
        // Convert species for training
        let species = null;

        if( req.body.Species === 'Iris-setosa' ){ species = [1,0,0] }
        else if( req.body.Species === 'Iris-versicolor' ){ species = [0,1,0] }
        else if( req.body.Species === 'Iris-virginica' ){ species = [0,0,1] }
        
        // Define object to create
        // +var => parseInt(var) || parseFloat(var)
        const newObject = {
            SepalLengthCm: +req.body.SepalLengthCm,
            SepalWidthCm: +req.body.SepalWidthCm,
            PetalLengthCm: +req.body.PetalLengthCm,
            PetalWidthCm: +req.body.PetalWidthCm,
            Species: species,
            SpeciesName: req.body.Species
        }

        // Return new Promise
        return new Promise( (resolve, reject) => {
            // Use the Mongoose model to create data
            Models.iris.create(newObject)
            .then( data => resolve(data) )
            .catch( err => reject(err) )
        })
    }

    // D3: convert CSV
    const convertCsv = () => {
        return new Promise( (resolve, reject) => {
            // Load a CVS file and convert it
            d3.csv('https://raw.githubusercontent.com/DWS-paris/BRAINnode/master/data/itris-train.csv')
            .then( async data => {
                // Convert data from JSON
                let convertedData = []
                for( let item of data ){
                    // Convert species for training
                    let species = null;

                    if( item.Species === 'Iris-setosa' ){ species = [1,0,0] }
                    else if( item.Species === 'Iris-versicolor' ){ species = [0,1,0] }
                    else if( item.Species === 'Iris-virginica' ){ species = [0,0,1] }

                    await Models.iris.create({
                        SepalLengthCm: +item.SepalLengthCm,
                        SepalWidthCm: +item.SepalWidthCm,
                        PetalLengthCm: +item.PetalLengthCm,
                        PetalWidthCm: +item.PetalWidthCm,
                        Species: species,
                        SpeciesName: item.Species
                    })
                }

                // Get all iris data
                Models.iris.find( ( err, data ) => {
                    if(err){ return reject(err) }
                    else{ return resolve(data) }
                })
            })
            .catch( err => {
                return reject(err)
            });
        })
    }
//

/* 
Export
*/
    module.exports = {
        createObject,
        convertCsv
    }
//