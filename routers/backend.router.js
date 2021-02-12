/*
Imports
*/
    // Node
    const express = require('express');

    // Inner
    const Controllers = require('../controllers/index')
    const { checkFields } = require('../services/request.service');
    const Mandatory = require('../services/mandatory.service');
    const { renderSuccessVue, renderErrorVue } = require('../services/response.service');
const ApiRouter = require('./api.router');
//

/*
Routes definition
*/
    class BackendRouter {
        constructor( { passport } ){
            this.passport = passport
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
                    return renderErrorVue('index', '/register', 'POST', res, 'No data provided in the reqest body', null)
                }
                else{
                    // Check body data
                    const { ok, extra, miss } = checkFields( Mandatory.register, req.body );

                    // Error: bad fields provided
                    if( !ok ){ return renderErrorVue('index', '/register', 'POST', res, 'Bad fields provided', { extra, miss }) }
                    else{
                        Controllers.auth.register(req)
                        .then( data => {
                            return renderSuccessVue('index', '/register', 'POST', res, 'User register', data)
                            return res.render('index', { err: null, data: data })
                        } )
                        .catch( err => {
                            return renderErrorVue('index', '/register', 'POST', res, 'User not register', err);
                        } );
                    }
                }
            })

            // TODO: create POST login route
            this.router.post('/login', (req, res) => {
                // Check body data
                if( typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0 ){ 
                    return res.render('index', { err: 'No data provided in the reqest body', data: null })
                }
                else{
                    // Check body data
                    const { ok, extra, miss } = checkFields( Mandatory.login, req.body );

                    // Error: bad fields provided
                    if( !ok ){ return renderErrorVue('index', '/Login', 'POST', res, 'Bad fields provided', { extra, miss }) }
                    else{
                        Controllers.auth.login(req, res)
                        .then( data => {
                            return renderSuccessVue('index', '/login', 'POST', res, 'User loged', data)
                        } )
                        .catch( err => {
                            return renderErrorVue('index', '/login', 'POST', res, 'User not loged', err);
                        } );
                    }
                }
            })

            // TODO: create GET connected route /backoffice
            this.router.get('/backoffice', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                Controllers.post.readAll()
                .then( apiResponse => renderSuccessVue('backoffice', '/backoffice', 'GET', res, 'Request succeed', { user: req.user, data: apiResponse }))
                .catch( apiError => renderErrorVue('index', '/login', 'POST', res, 'Request failed', apiError) )
            })

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