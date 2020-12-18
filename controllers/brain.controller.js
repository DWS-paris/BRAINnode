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
Export
*/
    module.exports = {
        trainBrain
    }
//