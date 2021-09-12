const UseCase = require('./animal-report.usecase');

exports.AnimalReport = async (req, res) => {
  try {
    console.log(req.body);
    inputDto = {
      file: req.file,
      lat: req.body.lat,
      lng: req.body.lng,
      date: req.body.date,
      comments: req.body.comments,
      numOfAnimals: req.body.numOfAnimals,
    };
    const output = await UseCase.AnimalReportUseCase(inputDto);
    console.log('output: ', output);
    res.status(200).json(output);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'unhandled error' });
  }
};
