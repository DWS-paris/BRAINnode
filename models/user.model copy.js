/*
Import
*/
    const mongoose = require('mongoose');
    const { Schema } = mongoose;
//

/*
Definition
*/
    const MySchema = new Schema({
        
    })
//

/* 
Export
*/
    module.exports = mongoose.model('comment', MySchema)
//