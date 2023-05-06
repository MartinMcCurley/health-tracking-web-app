class Goal {
    constructor(title, date, targetDate, body, status, category, user ) {
        this.title = title;
        this.date = date;
        this.targetDate = targetDate;
        this.body = body;
        this.status = status || "active";
        this.category = category;
        this.user = user;
        this.createdAt = new Date();
    }

    static isValidStatus(status) {
        return ["active", "complete"].includes(status);
    }

    static isValidCategory(category) {
        return ["Nutrition", "Health", "Fitness"].includes(category);
    }
}

module.exports = Goal;
