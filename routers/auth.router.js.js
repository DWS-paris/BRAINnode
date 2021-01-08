/*
Imports
*/
    // Node
    const express = require('express');
    const bcrypt = require('bcryptjs');

    // Inner
    const { checkFields } = require('../services/request.service');
    const Mandatory = require('../services/mandatory.service')

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
            this.router.post('/register', (req, res) => {
                return new Promise( async (resolve, reject) => {
                    // Check user request TODO: check verification
                    if( typeof req.body === 'undefined' || req.body === null ){ 
                        return reject( res.json( { msg: 'No data' } ) ) 
                    }
                    else{
                        // Check body data
                        const { ok, extra, miss } = checkFields( Mandatory.user, req.body );

                        // Error: bad fields provided
                        if( !ok ){ return reject( res.json({ msg: 'bad fields provided', extra, miss }) ) }
                        else{
                            // Encrypt yser password
                            req.body.password = await bcrypt.hash( req.body.password, 10 );

                            // Register new user
                            Models.user.create( req.body )
                            .then( data => resolve( res.json(data) ) )
                            .catch( err => reject( res.json(err) ) );
                        }
                    }
                })
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