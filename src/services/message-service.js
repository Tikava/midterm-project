import { readData, updateData, removeData, pushData } from '../database/database.js';

export class MessageService {
    constructor() {
        this.basePath = 'messages/';
    }

    sendMessage(conversationId, message) {
        const path = `${this.basePath}${conversationId}`;
        return pushData(path, message);
    }

    // Function to get a message by ID within a conversation
    getMessage(conversationId, messageId) {
        const path = `${this.basePath}${conversationId}/${messageId}`;
        return readData(path).then((snapshot) => snapshot.val());
    }

    updateMessage(conversationId, messageId, messageData) {
        const path = `${this.basePath}${conversationId}/${messageId}`;
        return updateData(path, messageData);
    }

    deleteMessage(conversationId, messageId) {
        const path = `${this.basePath}${conversationId}/${messageId}`;
        return removeData(path);
    }
}
