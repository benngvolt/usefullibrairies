// const { initializeApp } = require("firebase/app");
// const { getAuth } = require("firebase/auth");

// const firebaseConfig = {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId
// }

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app)

// module.exports = {
//     auth
// }

const { Storage } = require('@google-cloud/storage');

const storage = new Storage ({

  projectId: process.env.GOOGLE_CLOUD_PROJECT,
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

module.exports = { storage, bucket };
