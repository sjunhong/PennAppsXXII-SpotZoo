const multer = require('multer');

const imageUpload = (req, res, next) => {
  const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
    'file'
  );
  upload(req, res, (err) => {
    if (err || req.file === undefined) {
      res.status(406).json({ message: 'uploading failed ' });
      return;
    }
    next();
  });
};

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('jpeg') ||
    file.mimetype.includes('png') ||
    file.mimetype.includes('jpg')
  ) {
    cb(null, true);
  } else {
    cb(new Error('We support images only'), false); // TODO : Add support for video
  }
};

const storage = multer.memoryStorage();

module.exports = imageUpload;
