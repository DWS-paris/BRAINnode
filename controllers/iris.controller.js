/* 
Imports
*/
    const Models = require('../models/index')
//

/* 
Functions
*/
    // CRUD: create object
    const createObject = (req) => {
        // Return new Promise
        return new Promise( (resolve, reject) => {
            // Use the Mongoose model to create data
            Models.iris.create(req.body)
            .then( data => resolve(data) )
            .catch( err => reject(err) )
        })
    }
//

/* 
Export
*/
    module.exports = {
        createObject
    }
//