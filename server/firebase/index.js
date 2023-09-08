var admin = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce-bdf98-default-rtdb.firebaseio.com"
  // databaseURL: "https://ecommerce-bdf98.firebaseio.com"

});

module.exports = admin;