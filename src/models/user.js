export class User {
    constructor(id, username, email, profilePictureUrl) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.profilePictureUrl = profilePictureUrl;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            profilePictureUrl: this.profilePictureUrl
        };
    }
}