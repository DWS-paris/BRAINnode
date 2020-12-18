/*
Imports
*/
    // Node
    const express = require('express');
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