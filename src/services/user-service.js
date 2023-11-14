import { writeData, readData, updateData, removeData } from '../database/database.js';

export class UserService {
    constructor() {
        this.basePath = 'users/';
    }

    createUser(user) {
        const path = `${this.basePath}${user.id}`;
        return writeData(path, user);
    }

    getUser(userId) {
        const path = `${this.basePath}${userId}`;
        return readData(path).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return null;
            }
        });
    }

    updateUser(userId, userData) {
        const path = `${this.basePath}${userId}`;
        return updateData(path, userData);
    }

    deleteUser(userId) {
        const path = `${this.basePath}${userId}`;
        return removeData(path);
    }
}

export default UserService;

