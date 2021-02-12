/*
Imports
*/
    // Node
    const express = require('express');
    const bcrypt = require('bcryptjs');

    // Inner
    const Controllers = require('../controllers/index')
    const { checkFields } = require('../services/request.service');
    const Mandatory = require('../services/mandatory.service');
    const { sendBodyError,sendFieldsError,sendApiSuccessResponse,sendApiErrorResponse } = require('../services/response.service');
//

/*  
Routes definition
*/
    class RouterClass {
        constructor( { passport } ){
            this.passport = passport
            this.router = express.Router(); 
        }

        routes(){
            // TODO: create auth controller

            // AUTH: Register
            this.router.post('/register', async (req, res) => {
                // Check body data
                if( typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0 ){ 
                    return sendBodyError('/auth/register', 'POST', res, 'No data provided in the reqest body')
                }
                else{
                    // Check body data
                    const { ok, extra, miss } = checkFields( Mandatory.register, req.body );

                    // Error: bad fields provided
                    if( !ok ){ return sendFieldsError('/auth/register', 'POST', res, 'Bad fields provided', miss, extra) }
                    else{
                        Controllers.auth.register(req)
                        .then( data => {
                            // TODO: send validation email
                            return sendApiSuccessResponse('/auth/register', 'POST', res, 'Request succeed', data)
                        } )
                        .catch( err => sendApiErrorResponse('/auth/register', 'POST', res, 'Request failed', err) );
                    }
                }
            })

            // AUTH: Login
            this.router.post('/login', (req, res) => {
                // Check body data
                if( typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0 ){ 
                    return sendBodyError('/auth/login', 'POST', res, 'No data provided in the reqest body')
                }
                else{
                    // Check body data
                    const { ok, extra, miss } = checkFields( Mandatory.login, req.body );

                    // Error: bad fields provided
                    if( !ok ){ return sendFieldsError('/auth/login', 'POST', res, 'Bad fields provided', miss, extra) }
                    else{
                        Controllers.auth.login(res, req)
                        .then( apiResponse => sendApiSuccessResponse('/auth/login', 'POST', res, 'User logged', apiResponse) )
                        .catch( apiError => sendApiErrorResponse('/auth/login', 'POST', res, 'Request error', apiError) );
                    }
                }
            })

            // TODO: create route to validate user email

            // TODO: create route to ger all user data
            this.router.get('/me', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                sendApiSuccessResponse('/auth/login', 'POST', res, 'User logged', req.user)
            })

            // TODO: create route to reset password

            // TODO: create delete account and to get all user data (RGPD)
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
    module.exports = RouterClass;
//