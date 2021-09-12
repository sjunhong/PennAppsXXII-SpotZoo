const fs = require('firebase-admin');

const serviceAccount = require('../../config/spotzoo-firebase-adminsdk-tl6k3-99ea8cdc48.json');

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});

db = fs.firestore();

exports.firestoreUpload = async (animal_name, image_hash, score) => {
  const animalsDb = db.collection('Animals');
  const doc = animalsDb.doc(`${image_hash}`);

  await doc.set({
    animal_name: animal_name,
    image_hash: image_hash,
    score: score,
  });
};
