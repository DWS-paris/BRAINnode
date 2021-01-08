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
        // Schema.org
        '@context': { type: String, default: 'http://schema.org' },
        '@type': { type: String, default: 'Person' },

        givenName: String,
        familyName: String,
        password: String,

        // Définir une valeur de propriété unique
        email: { unique: true, type: String },

        // Définir une valeur par défaut
        creationDate: { type: Date, default: new Date() },
        banished: { type: Boolean, default: false }
    })
//

/* 
Export
*/
    module.exports = mongoose.model('user', MySchema)
//