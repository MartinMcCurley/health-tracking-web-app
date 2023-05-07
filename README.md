# Health Tracking Web App

## Project Checklist

### 1. Project setup

- [X] Initialize a Git repository
- [X] Set up a Node.js project with a package.json file
- [X] Create a README file with instructions on how to run the site and a list of implemented features
- [X] Define project structure and organize folders

### 2. Backend development

- [X] Set up Express server
- [X] Implement user registration and authentication using an appropriate middleware
- [X] Set up NeDB database to store user information, goals, and achievements
- [X] Design and implement CRUD operations for goals (add, edit, delete, progress update)
- [ ] Write unit tests for CRUD operations

### 3. Frontend development

- [X] Set up Handlebars templates
- [X] Create a layout template for a consistent look and feel across pages
- [ ] Design and implement the About Us page
- [ ] Design and implement user registration and login pages
- [ ] Design and implement pages for browsing information about nutrition, fitness, and healthy lifestyle
- [X] Design and implement the goals tracking section:
  - [X] Goals list page with add, edit, and delete options
  - [X] Add goal page with title, description, category, start and end dates, and progress input fields
  - [X] Edit goal page with title, description, category, start and end dates, and progress input fields
  - [ ] Delete goal confirmation dialog

### 4. Integration

- [X] Connect frontend with backend CRUD operations for goals
- [X] Test user registration and authentication flow
- [X] Test goals tracking functionality (add, edit, delete, and progress update)

### 5. Testing and debugging

- [ ] Perform end-to-end testing for various user scenarios
- [ ] Fix any bugs or issues discovered during testing
- [ ] Optimize the application for performance, if necessary
- [ ] Prepare a test report (refer to Appendix A for format)

### 6. Deployment

- [X] Set up a production environment
- [X] Deploy the application to a live server
- [X] Test the application in the production environment to ensure it works correctly
- [ ] Provide a link to the live version of the site or create a video screen capture demonstrating the website in use

### 7. Final submission

- [X] Update the README file with any necessary changes
- [ ] Package the website code and README file as a .zip or provide a link to the GitHub repository
- [ ] Submit the website code, README, test report, and link to the live site or video screen capture via CodeGrade on GCULearn and Planet eStream

## Features

- About Us page with information about the application
- User registration and authentication using Passport.js
- Access to information about nutrition, fitness, and healthy lifestyle
- Define, add, remove, and modify personal goals in each category (nutrition, fitness, healthy lifestyle)
- Record and review personal achievements

## Getting Started

Add your google secret and client id to the config.env file (Required only for editing/testing not production)

*Install dependencies*

npm install

*Run in development*

npm run dev

*Run in production*

npm start

## Prerequisites

Node.js (version X.X.X or later)
Express (version X.X.X or later)
NeDB
Mustache or alternative UI approach
Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## Versioning

We use SemVer for versioning.

## Authors

Martin McCurley - Initial work - MMcUni
See also the list of contributors who participated in this project if applicable.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

Will add throughout

## Justification of template engine

Handlebars extends Mustache by including additional functionality, including helper functions, block helpers, and built-in helpers such as "if", "each", and "with". While Mustache maintains a minimalistic approach, I plan on using these features for displaying user goals. For example, I can use the "each" helper to iterate through a list of goals and display them on the page. I can also use the "if" helper to display a message if the user has no goals. I can also use the "with" helper to display a message if the user has no goals in a specific category.
