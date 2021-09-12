const makePredictions = require('./model/predict');
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
    console.log('prediction output: ', predict);

    const hashCode = ipfsResult[0].hash;
    const animalName = predict[0].className.split(', ')[0];
    const score = predict[0].probability;
    console.log(`
    animalName: ${animalName},
    score: ${score},
    hashCode: ${hashCode},
    `);
    output = {
      animal_name: animalName,
      score: score,
      hash_code: hashCode,
    };
    console.log('usecase output: ', output);
    return output;
  } catch (error) {
    new Error(error);
  }
};
