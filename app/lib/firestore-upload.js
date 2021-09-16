const fs = require('firebase-admin');
const serviceAccount = require('../config/spotzoo-firebase-adminsdk-tl6k3-99ea8cdc48.json');
fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});
const firestoreUpload = async ({
  animalName,
  imageHash,
  score,
  lat,
  lng,
  numOfAnimals,
  comments,
  date,
}) => {
  try {
    db = fs.firestore();

    const animalsDb = db.collection('Animals');
    const doc = animalsDb.doc(`${imageHash}`);

    const result = await doc.set({
      animal_name: animalName,
      image_hash: imageHash,
      score: score,
      lat: lat,
      lng: lng,
      num_of_animals: numOfAnimals,
      comments: comments,
      date: date,
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = firestoreUpload;
