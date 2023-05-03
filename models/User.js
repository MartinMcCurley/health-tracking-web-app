class User {
    constructor(googleId, displayName, firstName, lastName, image) {
      this.googleId = googleId;
      this.displayName = displayName;
      this.firstName = firstName;
      this.lastName = lastName;
      this.image = image;
      this.createdAt = new Date();
    }
  }
  
  module.exports = User;