export class Conversation {
    constructor(id, title, members, lastMessage, lastUpdated) {
        this.id = id;
        this.title = title;
        this.members = members; // Array of user IDs
        this.lastMessage = lastMessage;
        this.lastUpdated = lastUpdated || Date.now();
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            members: this.members,
            lastMessage: this.lastMessage,
            lastUpdated: this.lastUpdated,
        };
    }
}