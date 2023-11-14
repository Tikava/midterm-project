import admin from 'firebase-admin';
import serviceAccount from './config/serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sdutalks-default-rtdb.firebaseio.com"
});

export default admin;