const { AnimalReportUseCase } = require('./animal-report.usecase');

exports.AnimalReport = async (req, res) => {
  try {
    inputDto = {
      file: req.file,
    };
    const output = await AnimalReportUseCase(inputDto);
    console.log('output: ', output);
    res.status(200).json(output);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'unhandled error' });
  }
};
