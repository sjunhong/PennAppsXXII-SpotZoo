const tf = require('@tensorflow/tfjs'); // use suffix -gpu beside @tensorflow/tfjs if you want to use a CUDA supported GPU
const mobilenet = require('@tensorflow-models/mobilenet');
const jimp = require('jimp');
// npm install @tensorflow/tfjs@1.2.7 @tensorflow/tfjs-node@1.2.7 --save

const makePredictions = async (imageBuffer) => {
  try {
    const imageRead = await jimp.read(imageBuffer);
    const imageData = processData(imageRead);

    // pre-process image
    const numChannels = 3;
    const numPixels = imageData.width * imageData.height;
    const values = new Int32Array(numPixels * numChannels);
    const pixels = imageData.data;
    for (let i = 0; i < numPixels; i++) {
      for (let channel = 0; channel < numChannels; ++channel) {
        values[i * numChannels + channel] = pixels[i * 4 + channel];
      }
    }
    const outShape = [imageData.height, imageData.width, numChannels];
    const input = tf.tensor3d(values, outShape, 'int32');
    const output = await loadModel(input);
    console.log('predict output:', output);
    return output;
  } catch (error) {
    throw new Error(error);
  }
};

const loadModel = async (img) => {
  // load model
  console.log('Loading.......');
  const model = await mobilenet.load();

  // classify
  const output = await model.classify(img);
  console.log('loadModel return');
  return output;
};

const processData = (img) => {
  return {
    data: new Uint8ClampedArray(img.bitmap.data),
    height: img.bitmap.height,
    width: img.bitmap.width,
  };
};
module.exports = makePredictions;
