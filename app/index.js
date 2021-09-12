const express = require('express');
const imageUpload = require('./lib/image-upload');
const Controller = require('./animal-report.controller');
const cors = require('cors');

const app = express();

const PORT = 8080;
const corsOption = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    // const host = origin.split('://')[1]
    // const allowedHost = ['localhost:3000']
    // const allowed = allowedHost.includes(host)
    callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (request, response) => {
  return response.status(200).send('server healthy');
});
app.post('/image', imageUpload, (req, res) => {
  Controller.AnimalReport(req, res);
});

app.get('/', (request, response) => {
  return response.status(200).send('server healthy');
});
app.listen(PORT, () => {
  console.log(`app running in port: ${PORT}`);
});
