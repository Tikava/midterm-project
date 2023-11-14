import { pushData, readData, updateData, removeData } from '../database/database.js';

export class ConversationService {
    constructor() {
        this.basePath = 'conversations/';
    }

    // Function to create a new conversation
    createConversation(conversationData) {
        const conversation = {
            title: conversationData.title,
            members: conversationData.members,
            lastMessage: conversationData.lastMessage,
            lastUpdated: Date.now() // Use the current timestamp for lastUpdated
        };
        const newConversationRef = pushData(this.basePath, conversation);
        return newConversationRef;
    }

    // Function to get a conversation by ID
    getConversation(conversationId) {
        const path = `${this.basePath}${conversationId}`;
        return readData(path).then((snapshot) => snapshot.val());
    }

    // Function to get all conversations
    getAllConversations() {
        const path =`${this.basePath}`;
        return readData(path).then((snapshot) => snapshot.val());
    }

    // Function to update a conversation's details
    updateConversation(conversationId, conversationData) {
        const path = `${this.basePath}${conversationId}`;
        return updateData(path, conversationData);
    }

    // Function to delete a conversation
    deleteConversation(conversationId) {
        const path = `${this.basePath}${conversationId}`;
        return removeData(path);
    }

    // Function to add a participant to a conversation
    addParticipant(conversationId, userId) {
        const participantsPath = `${this.basePath}${conversationId}/participants/${userId}`;
        return updateData(participantsPath, true); // Or a participant object
    }

    // Function to remove a participant from a conversation
    removeParticipant(conversationId, userId) {
        const participantsPath = `${this.basePath}${conversationId}/participants/${userId}`;
        return removeData(participantsPath);
    }
}
