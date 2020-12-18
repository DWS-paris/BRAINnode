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
        SepalLengthCm: Number,
        SepalWidthCm: Number,
        PetalLengthCm: Number,
        PetalWidthCm: Number,
        Species: Array,
        SpeciesName: String
    })
//

/* 
Export
*/
    module.exports = mongoose.model('iris', MySchema)
//