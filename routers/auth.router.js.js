/*
Imports
*/
    // Node
    const express = require('express');

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
            this.router.post('/', (req, res) => {
                
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
                
            })

            // CRUD: Delete one entry
            this.router.delete('/:_id', (req, res) => {
                return new Promise( (resolve, reject) => {
                    Models.user.findByIdAndDelete( req.params._id, (err, res) => {
                        err
                        ? reject( res.json( err ) )
                        : resolve( res.json(res) );
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