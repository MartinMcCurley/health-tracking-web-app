class Goal {
    constructor(title, targetDate, body, status, category, user ) {
        this.title = title;
        this.targetDate = targetDate;
        this.body = body;
        this.status = status || "public";
        this.category = category;
        this.user = user;
        this.createdAt = Date.now();
    }

    static isValidStatus(status) {
        return ["public", "private"].includes(status);
    }

    static isValidCategory(category) {
        return ["Nutrition", "Health", "Fitness"].includes(category);
    }
}

module.exports = Goal;
