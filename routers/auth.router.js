/*
Imports
*/
    // Node
    const express = require('express');
    const bcrypt = require('bcryptjs');

    // Inner
    const { checkFields } = require('../services/request.service');
    const Mandatory = require('../services/mandatory.service');
    const { sendBodyError,sendFieldsError,sendApiSuccessResponse,sendApiErrorResponse } = require('../services/response.service')

    // Import models
    const Models = require('../models/index');
//

/* 
Routes definition
*/
    class RouterClass {
        constructor(){
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
                        // Encrypt yser password
                        req.body.password = await bcrypt.hash( req.body.password, 10 );

                        // TODO: encrypt RGPD data

                        // Register new user
                        Models.user.create( req.body )
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
                        // Find user from email
                        Models.user.findOne( { email: req.body.email }, (err, data) => {
                            if( err || data === null ){ return sendApiErrorResponse('/auth/login', 'POST', res, 'Email not found', err) }
                            else{
                                // Check user password
                                const validatedPassword = bcrypt.compareSync( req.body.password, data.password );
                                if( !validatedPassword ){ return sendApiErrorResponse('/auth/login', 'POST', res, 'Invalid password', null) }
                                else{
                                    // Generate user JWT
                                    const userJwt = data.generateJwt(data);
                                    
                                    // Set response cookie
                                    res.cookie( process.env.COOKIE_NAME, userJwt, { maxAge: 700000, httpOnly: true } )

                                    // Send user data
                                    return sendApiSuccessResponse('/auth/login', 'POST', res, 'User logged', data);
                                };
                            }
                        })
                    }
                }
            })

            // TODO: create route to validate user email

            // TODO: create route to ger all user data

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