/*
Imports
*/
    // Node
    const express = require('express');

    // Inner
    const Controllers = require('../controllers/index');
    const { trainBrain, testBrain } = require('../controllers/brain.controller')
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
                // Test trained Network
                return res.render('brain', { result: testBrain(req) })
            })

            // Define D3 convert route
            this.router.get('/d3/convert', (req, res) => {
                // Use the controller to create new object
                Controllers.iris.convertCsv()
                .then( data => {
                    // Train Neural Network
                    trainBrain(data).then( response => res.render('d3-brain'))
                })
                .catch( err => {
                    return res.redirect('/')
                })
            })

            // Define D3 convert route
            this.router.get('/brain', (req, res) => {
                return res.render('brain', { result: null });
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