import admin from '../firebase-admin.js';

export class TokenService {
    async createCustomToken(uid) {
        return await admin.auth().createCustomToken(uid);
    }

    async verifyIdToken(idToken) {
        return await admin.auth().verifyIdToken(idToken);
    }
}

export default TokenService;
