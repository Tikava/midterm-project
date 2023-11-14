export class Message {
    constructor(id, conversationId, senderId, content, timestamp) {
        this.id = id;
        this.conversationId = conversationId;
        this.senderId = senderId;
        this.content = content;
        this.timestamp = timestamp || Date.now();
    }

    toJSON() {
        return {
            id: this.id,
            conversationId: this.conversationId,
            senderId: this.senderId,
            content: this.content,
            timestamp: this.timestamp,
        };
    }
}