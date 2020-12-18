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