// authenticateToken.js
const admin = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://Car-eservation.firebaseio.com',
  });
  
async function decodeIDToken(request, res, next) {
  const header = request.headers?.authorization;
    console.log("header: ", header)
      if (header !== 'Bearer null' && request.headers?.authorization?.startsWith('Bearer ')) {const idToken = request.headers.authorization.split('Bearer ')[1];
      try {
          console.log("idtoken: ", idToken)
          const decodedToken = await admin.auth().verifyIdToken(idToken);
          request['currentUser'] = true;
        } catch (err) {
          console.log(err);
        }
      }
  next();
}
module.exports = decodeIDToken;