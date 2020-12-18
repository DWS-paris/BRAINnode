/*
Imports
*/
    // Node
    const express = require('express');

    // Inner
    const Controllers = require('../controllers/index');
//

/*
Routes definition
*/
    class BackendRouter {
        constructor(){
            this.router = express.Router(); 
        }

        routes(){
            // Define index route
            this.router.get('/', (req, res) => {
                // Return indes.ejs file
                return res.render('index');
            })

            // Define iris POST route
            this.router.post('/iris', (req, res) => {
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
                
                // Change request body 
                req.body = newObject;

                // Use the controller to create new object
                Controllers.iris.createObject(req)
                .then( data => res.redirect('/'))
                .catch( err => res.redirect('/'))
            })
        }

        init(){
            // Get route fonctions
            this.routes();

            // Sendback router
            return this.router;
        };
    }
//

/*
Export
*/
    module.exports = BackendRouter;
//