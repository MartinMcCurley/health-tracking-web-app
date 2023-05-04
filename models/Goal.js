class Goal {
    constructor(title, body, status, user) {
        this.title = title;
        this.body = body;
        this.status = status || "public";
        this.user = user;
        this.createdAt = new Date();
    }

    static isValidStatus(status) {
        return ["public", "private"].includes(status);
    }
}

module.exports = Goal;
