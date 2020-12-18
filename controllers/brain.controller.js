/* 
Define Neural Network
*/
    const Brain = require('brain.js');
    const NeuralNetwork = new Brain.NeuralNetwork({
        activation: 'sigmoid',
        hiddenLayers: [2],
        iterations: 3000,
        learningRate: 0.5
    })
//

/* 
Create function to train Neural Network
*/
    const trainBrain = (data) => {
        return new Promise( (resolve, reject) => {
            // Convert data for training
            let trainCollection = [];
            for( let item of data ){
                trainCollection.push({
                    input: [ item.SepalLengthCm, item.SepalWidthCm, item.PetalLengthCm, item.PetalWidthCm ],
                    output: item.Species
                })
            }
        })
    }
//

/* 
Export
*/
    module.exports = {
        trainBrain
    }
//