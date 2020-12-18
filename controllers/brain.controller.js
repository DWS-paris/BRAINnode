/* 
Define Neural Network
*/
    const Brain = require('brain.js');
    const NeuralNetwork = new Brain.NeuralNetwork({
        activation: 'sigmoid',
        hiddenLayers: [2],
        iterations: 10000,
        learningRate: 0.2
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

            // Train Neural Network
            NeuralNetwork.train( trainCollection, {
                log: true,
                logPeriod: 100,
                errorThresh: 0.002
            });

            return true;
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