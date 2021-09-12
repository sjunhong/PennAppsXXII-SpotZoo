const makePredictions = require('./model/predict');
const firestoreUpload = require('./lib/firestore-upload');
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' });

exports.AnimalReportUseCase = async (inputDto) => {
  try {
    console.log(
      `formdata files: ${JSON.stringify(inputDto.file, (key, val) => {
        if (key === 'buffer') return 'image buffer data';
        else return val;
      })}`
    );

    const buffer = Buffer.from(inputDto.file.buffer);
    const ipfsResult = await ipfs.add(buffer);
    const predict = await makePredictions(inputDto.file.buffer);

    const imageHash = ipfsResult[0].hash;
    const animalName = predict[0].className.split(', ')[0];
    const score = predict[0].probability;
    console.log(`
    animalName: ${animalName},
    score: ${score},
    imageHash: ${imageHash},
    `);

    output = {
      animalName: animalName,
      imageHash: imageHash,
      score: score,
      lat: parseFloat(inputDto.lat),
      lng: parseFloat(inputDto.lng),
      numOfAnimals: parseInt(inputDto.numOfAnimals),
      comments: inputDto.comments,
      date: inputDto.date,
    };
    const result = await firestoreUpload(output);
    console.log('db output: ', result);
    console.log('usecase output: ', output);
    return output;
  } catch (error) {
    throw new Error(error);
  }
};
