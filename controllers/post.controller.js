/* 
Imports
*/
    const Models = require('../models/index');
//

/* 
CRUD methods
*/
    const createOne = req => {
        return new Promise( (resolve, reject) => {
            // Use Models to create new post
            Models.post.create( req.body )
            .then( data => resolve(data) )
            .catch( err => reject(err) )
        })
    }

    const readAll = req => {
        return new Promise( (resolve, reject) => {

        })
    }

    const readOne = req => {
        return new Promise( (resolve, reject) => {

        })
    }

    const updateOne = req => {
        return new Promise( (resolve, reject) => {

        })
    }

    const deleteOne = req => {
        return new Promise( (resolve, reject) => {

        })
    }
//

/* 
Export controller methods
*/
    module.exports = {
        readAll,
        readOne,
        createOne,
        updateOne,
        deleteOne
    }
//