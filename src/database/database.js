import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, update, remove, get, child } from 'firebase/database';
import { firebaseConfig } from '../config/firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const serializeData = (data) => {
    if (data && typeof data.toJSON === 'function') {
        return data.toJSON();
    }
    return data;
};

export const writeData = (path, data) => {
    const serializedData = serializeData(data);
    return set(ref(db, path), serializedData);
};

export const updateData = (path, data) => {
    const serializedData = serializeData(data);
    return update(ref(db, path), serializedData);
};

export const pushData = (path, data) => {
    const serializedData = serializeData(data);
    const listRef = ref(db, path);
    const newChildRef = push(listRef);
    return set(newChildRef, serializedData).then(() => newChildRef);
};


export const removeData = (path) => {
    return remove(ref(db, path));
};

export const readData = (path) => {
    const dbRef = ref(db);
    return get(child(dbRef, path));
};