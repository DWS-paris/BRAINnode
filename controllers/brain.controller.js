// Imports
const fs = require('fs');

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

            // Train Neural Network
            NeuralNetwork.train( trainCollection, {
                log: true,
                logPeriod: 100,
                errorThresh: 0.002
            });

            // Save trained network
            fs.writeFileSync(
                'trained/trained-model-node.js',
                `export default ${ NeuralNetwork.toFunction().toString() };`
            )

            // Return to controller
            return resolve(true);
        })
    }
//

/* 
Create a function to test network
*/
    const testBrain = (req) => {
        // Import trained network
        const trainedNetwork = require('../trained/trained-model-node');

        // Define input data
        const input = [ +req.body.SepalLengthCm, +req.body.SepalWidthCm, +req.body.PetalLengthCm, +req.body.PetalWidthCm ];

        // Return prevision to router
        return trainedNetwork(input);
    }
//

/* 
Export
*/
    module.exports = {
        trainBrain,
        testBrain
    }
//