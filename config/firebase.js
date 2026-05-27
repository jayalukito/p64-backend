const admin = require("firebase-admin");
const serviceAccount = require("../p64-surakshasms-firebase-adminsdk-fbsvc-b251ec8c62.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };