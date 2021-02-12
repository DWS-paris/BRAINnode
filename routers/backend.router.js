/*
Imports
*/
    // Node
    const express = require('express');
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
                // TODO: create send post list data
                return res.render('index');
            })

            // TODO: create POST register route

            // TODO: create POST login route

            // TODO: create POST comment route
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