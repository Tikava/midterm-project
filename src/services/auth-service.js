import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import UserService from './user-service.js';

const userService = new UserService();

const auth = getAuth(); 

class AuthService {
    async signUp(username, email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = {
                id: userCredential.user.uid,
                username: username,
                email: userCredential.user.email,
                profilePictureUrl: userCredential.user.photoURL
            };
            await userService.createUser(user);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async signIn(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            return { user: userCredential.user, idToken: idToken };
        } catch (error) {
            console.error('Error during signIn:', error);
            return { user: null, error: this.mapFirebaseErrorToMessage(error.code) };
        }
    }
    

    mapFirebaseErrorToMessage(errorCode) {
        const errorMessages = {
            'auth/user-not-found': 'No user found with this email.',
            'auth/wrong-password': 'Incorrect password.',
        };

        return errorMessages[errorCode] || 'Authentication failed. Please try again.';
    }

    async signOut() {
        try {
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    }

    async resetPassword(email) {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;
