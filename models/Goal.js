class Goal {
    constructor(title, date, targetDate, body, status, category, user ) {
        this.title = title;
        this.date = date;
        this.targetDate = targetDate;
        this.body = body;
        this.status = status || "public";
        this.category = category;
        this.user = user;
        this.createdAt = new Date();
    }

    static isValidStatus(status) {
        return ["public", "private"].includes(status);
    }

    static isValidCategory(category) {
        return ["Nutrition", "Health", "Fitness"].includes(category);
    }
}

module.exports = Goal;
