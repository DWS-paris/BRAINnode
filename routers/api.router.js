/*
Imports
*/
    // Node
    const express = require('express');

    // Import models
    const Controllers = require('../controllers/index')
//

/*
Routes definition
*/
    class ApiRouter {
        constructor(){
            this.router = express.Router(); 
        }

        routes(){
            // Define index route
            this.router.get('/', (req, res) => {
                // Return API definition
                return res.json({ defintion: 'TODO: add API definition' })
            })

            // CRUD: define route to create object
            this.router.post('/:endpoint', (req, res) => {
                return res.json( { endpoint: req.params.endpoint } );
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
    module.exports = ApiRouter;
//