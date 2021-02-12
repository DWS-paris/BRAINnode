/*
Imports
*/
    // Node
    const express = require('express');

    // Inner
    const Crontrollers = require('../controllers/index')
    const { checkFields } = require('../services/request.service');
    const Mandatory = require('../services/mandatory.service');
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
                return res.render('index', { err: null, data: null }); 
            })

            // TODO: create POST register route
            this.router.post('/register', (req, res) => {
                // Check body data
                if( typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0 ){ 
                    return res.render('index', { err: 'No data provided in the reqest body', data: null })
                }
                else{
                    // Check body data
                    const { ok, extra, miss } = checkFields( Mandatory.register, req.body );

                    // Error: bad fields provided
                    if( !ok ){ return res.render('index', { err: 'Bad fields provided', data: null }) }
                    else{
                        Crontrollers.auth.register(req)
                        .then( data => {
                            return res.render('index', { err: null, data: data })
                        } )
                        .catch( err => res.render('index', { err: 'Request failed', data: null }) );
                    }
                }
            })

            // TODO: create POST login route

            // TODO: create POST comment route

            // TODO: create POST post route

            // TODO: create GET unique post route
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