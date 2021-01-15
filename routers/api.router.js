/*
Imports
*/
    // Node
    const express = require('express');

    // Inner
    const { checkFields } = require('../services/request.service');
    const Mandatory = require('../services/mandatory.service');
    const { sendBodyError,sendFieldsError,sendApiSuccessResponse,sendApiErrorResponse } = require('../services/response.service')

    // Import controllers
    const Controllers = require('../controllers/index')
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

            // CRUD: define route to create object
            this.router.post('/:endpoint', (req, res) => {
                // Check body data
                if( typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0 ){ 
                    return sendBodyError(`/api/${req.params.endpoint}`, 'POST', res, 'No data provided in the reqest body')
                }
                else{
                    // Check body data
                    const { ok, extra, miss } = checkFields( Mandatory[req.params.endpoint], req.body );

                    // Error: bad fields provided
                    if( !ok ){ return sendFieldsError(`/api/${req.params.endpoint}`, 'POST', res, 'Bad fields provided', miss, extra) }
                    else{
                        // Use the controller to create nex object
                        Controllers[req.params.endpoint].createOne(req)
                        .then( apiResponse => sendApiSuccessResponse(`/api/${req.params.endpoint}`, 'POST', res, 'Request succeed', apiResponse) )
                        .catch( apiError => sendApiapiErrororResponse(`/api/${req.params.endpoint}`, 'POST', res, 'Request failed', apiError) );
                    }
                }
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