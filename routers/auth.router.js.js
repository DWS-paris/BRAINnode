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
            // CRUD: Create new entry
            this.router.post('/register', async (req, res) => {
                // Check body data
                if( typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0 ){ 
                    return sendBodyError('/auth/register', 'POST', res, 'No data provided in the reqest body')
                }
                else{
                    // Check body data
                    const { ok, extra, miss } = checkFields( Mandatory.user, req.body );

                    // Error: bad fields provided
                    if( !ok ){ return sendFieldsError('/auth/register', 'POST', res, 'Bad fields provided', miss, extra) }
                    else{
                        // Encrypt yser password
                        req.body.password = await bcrypt.hash( req.body.password, 10 );

                        // TODO: encrypt RGPD data

                        // Register new user
                        Models.user.create( req.body )
                        .then( data => sendApiSuccessResponse('/auth/register', 'POST', res, 'Request succeed', data) )
                        .catch( err => sendApiErrorResponse('/auth/register', 'POST', res, 'Request failed', err) );
                    }
                }
            })

            // CRUD: Read all entries
            this.router.get('/', (req, res) => {
                return new Promise( (resolve, reject) => {
                    Models.user.find( (err, data) => {
                        err
                        ? reject( res.json( err ) )
                        : resolve( res.json(data) );
                    })
                })
            })

            // CRUD: Read one entry
            this.router.get('/:_id', (req, res) => {
                return new Promise( (resolve, reject) => {
                    Models.user.findById( req.params._id, (err, data) => {
                        err
                        ? reject( res.json( err ) )
                        : resolve( res.json(data) );
                    })
                })
            })

            // CRUD: Update one entry
            this.router.put('/:_id', (req, res) => {
                return new Promise( (resolve, reject) => {
                    Models.user.updateOne( { _id: req.params._id }, req.body, (err, data) => {
                        err
                        ? reject( res.json( err ) )
                        : resolve( res.json(data) );
                    })
                })
            })

            // CRUD: Delete one entry
            this.router.delete('/:_id', (req, res) => {
                return new Promise( (resolve, reject) => {
                    Models.user.findByIdAndDelete( req.params._id, (err, data) => {
                        err
                        ? reject( res.json( err ) )
                        : resolve( res.json(data) );
                    })
                })
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
    module.exports = RouterClass;
//