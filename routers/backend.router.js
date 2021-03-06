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
            this.router.get('/', this.passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
                Controllers.post.readAll()
                .then( apiResponse => renderSuccessVue('index', '/', 'GET', res, 'Request succeed', apiResponse))
                .catch( apiError => renderErrorVue('index', '/', 'GET', res, 'Request failed', apiError) )
            })

            // Define index route
            this.router.get('/login', (req, res) => {
                renderSuccessVue('login', '/login', 'GET', res, 'Request succeed', null)
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
                            return renderSuccessVue('index', '/login', 'POST', res, 'User loged', data, true)
                        } )
                        .catch( err => {
                            return renderErrorVue('index', '/login', 'POST', res, 'User not loged', err, true);
                        } );
                    }
                }
            })

            // TODO: create POST post route
            this.router.post('/:endpoint', this.passport.authenticate('jwt', { session: false, failureRedirect: '/' }), (req, res) => {
                // Check body data
                if( typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0 ){ 
                    return res.render('index', { err: 'No data provided in the reqest body', data: null })
                }
                else{
                    // Check body data
                    const { ok, extra, miss } = checkFields( Mandatory[req.params.endpoint], req.body );

                    // Error: bad fields provided
                    if( !ok ){ return renderErrorVue('index', `/${req.params.endpoint}`, 'POST', res, 'Bad fields provided', { extra, miss }) }
                    else{
                        // Add author _id
                        req.body.author = req.user._id;

                        // Use the controller to create nex object
                        Controllers[req.params.endpoint].createOne(req)
                        .then( apiResponse =>  res.redirect('/') )
                        .catch( apiError => renderErrorVue('index', `/${req.params.endpoint}`, 'POST', res, 'Request failed', apiError) )
                    }
                }
            })

            // TODO: create POST comment route


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